import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Validates the provided API key by checking if it exists in the database.
 *
 * If no API key is provided, the function immediately returns false. Otherwise, it queries the database
 * for a matching API key and returns true if found.
 *
 * @param apiKey - The API key to verify; if undefined, the API key is considered invalid.
 * @returns A promise that resolves to true if the API key exists, or false otherwise.
 */
async function verifyApiKey(apiKey: string | undefined): Promise<boolean> {
  if (!apiKey) return false;

  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { user: true },
  });

  return !!key;
}

/**
 * Registers recipe-related routes on the provided Fastify instance.
 *
 * This function sets up endpoints for retrieving, searching, creating, seeding, updating, and deleting recipes.
 * It applies a rate limiting plugin (limiting to 100 requests per minute) and a pre-handler hook that authenticates
 * clients by verifying an API key (from the "x-api-key" header) or a JWT token. Endpoints modifying data are restricted
 * to users with an ADMIN role.
 */
export async function recipeRoutes(fastify: FastifyInstance) {
  // Apply rate limiting to all recipe routes
  fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  });

  // Middleware to check either JWT token or API key
  fastify.addHook('preHandler', async (request, reply) => {
    const apiKey = request.headers['x-api-key'] as string;
    let isAuthenticated = false;

    // Check API key if present
    if (apiKey) {
      isAuthenticated = await verifyApiKey(apiKey);
    }

    // If no valid API key, check JWT token
    if (!isAuthenticated) {
      try {
        await request.jwtVerify();
        isAuthenticated = true;
      } catch (err) {
        // JWT verification failed
      }
    }

    if (!isAuthenticated) {
      reply.status(401).send({ error: 'Authentication required' });
    }
  });

  // Get all recipes (paginated) with filtering by cuisine and title
  fastify.get('/', async (request, reply) => {
    try {
      const {
        page: pageQuery,
        limit: limitQuery,
        cuisine,
        title,
      } = request.query as {
        page?: string;
        limit?: string;
        cuisine?: string;
        title?: string;
      };

      const page = parseInt(pageQuery ?? '1', 10);
      const limit = parseInt(limitQuery ?? '20', 10);


      const validPage = isNaN(page) || page < 1 ? 1 : page;
      const validLimit = isNaN(limit) || limit < 1 ? 20 : limit;
      const skip = (validPage - 1) * validLimit;
      const where: any = {};

      if (cuisine) {
        where.cuisine = cuisine;
      }

      if (title) {
        where.title = { contains: title, mode: 'insensitive' };
      }

      const [recipes, total] = await Promise.all([
        prisma.recipe.findMany({
          where,
          skip,
          take: validLimit,
          include: {
            createdBy: {
              select: {
                email: true,
              },
            },
          },
          orderBy: {
            id: 'asc',
          },
        }),
        prisma.recipe.count({ where }),
      ]);

      return reply.send({
        recipes,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get recipes by cuisine
  fastify.get('/cuisines', async (request, reply) => {
    try {
      const cuisines = await prisma.recipe.groupBy({
        by: ['cuisine'],
        _count: {
          cuisine: true,
        },
      });

      return reply.send(cuisines);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Search recipes
  fastify.get('/search', async (request, reply) => {
    try {
      const { q, page = 1, limit = 20 } = request.query as {
        q: string;
        page?: number;
        limit?: number;
      };

      const skip = (page - 1) * limit;

      const [recipes, total] = await Promise.all([
        prisma.recipe.findMany({
          where: {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { cuisine: { contains: q, mode: 'insensitive' } },
              { chefName: { contains: q, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          include: {
            createdBy: {
              select: {
                email: true,
              },
            },
          },
        }),
        prisma.recipe.count({
          where: {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { cuisine: { contains: q, mode: 'insensitive' } },
              { chefName: { contains: q, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      return reply.send({
        recipes,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get single recipe
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!recipe) {
        return reply.status(404).send({ error: 'Recipe not found' });
      }

      return reply.send(recipe);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Create recipe (Admin only)
  fastify.post('/', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const recipeData = request.body as {
        title: string;
        description: string;
        cuisine: string;
        image?: string;
        sourceUrl?: string;
        chefName: string;
        preparationTime: string;
        cookingTime: string;
        serves: string;
        ingredientsDesc: string[];
        ingredients: string[];
        method: string[];
      };

      const recipe = await prisma.recipe.create({
        data: {
          ...recipeData,
          userId: user.userId,
        },
      });

      return reply.status(201).send(recipe);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Seed recipes (Admin only)
  fastify.post('/seed', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const recipes = request.body as {
        recipes: Array<{
          title: string;
          description: string;
          cuisine: string;
          image?: string;
          sourceUrl?: string;
          chefName: string;
          preparationTime: string;
          cookingTime: string;
          serves: string;
          ingredientsDesc: string[];
          ingredients: string[];
          method: string[];
        }>;
      };

      // Clear existing recipes
      await prisma.recipe.deleteMany();

      // Insert new recipes in batches of 100
      const batchSize = 100;
      const results = [];

      for (let i = 0; i < recipes.recipes.length; i += batchSize) {
        const batch = recipes.recipes.slice(i, i + batchSize);
        const result = await prisma.recipe.createMany({
          data: batch.map(recipe => ({
            ...recipe,
            userId: user.userId,
          })),
          skipDuplicates: true,
        });
        results.push(result);
      }

      const totalCreated = results.reduce((acc, curr) => acc + curr.count, 0);

      return reply.status(201).send({
        message: 'Recipes seeded successfully',
        totalRecipes: totalCreated,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Update recipe (Admin only)
  fastify.put('/:id', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const { id } = request.params as { id: number };
      const recipeData = request.body as {
        title?: string;
        description?: string;
        cuisine?: string;
        image?: string;
        sourceUrl?: string;
        chefName?: string;
        preparationTime?: string;
        cookingTime?: string;
        serves?: string;
        ingredientsDesc?: string[];
        ingredients?: string[];
        method?: string[];
      };

      const recipe = await prisma.recipe.update({
        where: { id:id },
        data: recipeData,
      });

      return reply.send(recipe);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Delete recipe (Admin only)
  fastify.delete('/:id', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const { id } = request.params as { id: number };
      await prisma.recipe.delete({
        where: { id:id },
      });

      return reply.status(204).send();
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
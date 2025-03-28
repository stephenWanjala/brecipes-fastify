import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware to verify API key
async function verifyApiKey(apiKey: string | undefined): Promise<boolean> {
  if (!apiKey) return false;
  
  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { user: true }
  });
  
  return !!key;
}

export async function recipeRoutes(fastify: FastifyInstance) {
  // Apply rate limiting to all recipe routes
  fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
  });

  // Middleware to check API key
  fastify.addHook('preHandler', async (request, reply) => {
    const apiKey = request.headers['x-api-key'] as string;
    const isValid = await verifyApiKey(apiKey);
    
    if (!isValid) {
      reply.status(401).send({ error: 'Invalid API key' });
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
            userId: user.userId
          })),
          skipDuplicates: true
        });
        results.push(result);
      }

      const totalCreated = results.reduce((acc, curr) => acc + curr.count, 0);

      return reply.status(201).send({
        message: 'Recipes seeded successfully',
        totalRecipes: totalCreated
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get all recipes
  fastify.get('/', async (request, reply) => {
    try {
      const recipes = await prisma.recipe.findMany({
        include: {
          createdBy: {
            select: {
              email: true
            }
          }
        }
      });
      return reply.send(recipes);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get single recipe
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              email: true
            }
          }
        }
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
          userId: user.userId
        }
      });

      return reply.status(201).send(recipe);
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

      const { id } = request.params as { id: string };
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
        where: { id },
        data: recipeData
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

      const { id } = request.params as { id: string };
      await prisma.recipe.delete({
        where: { id }
      });

      return reply.status(204).send();
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
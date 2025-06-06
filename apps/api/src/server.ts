import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { userRoutes } from './routes/user.routes';
import { apiKeyRoutes } from './routes/apikey.routes';
import { recipeRoutes } from './routes/recipe.routes';
import seedRecipes from "./seed";

const fastify = Fastify({
  logger: true
});

// Register JWT plugin
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'SomeKey'
});

fastify.addHook('onRequest', async (request, reply) => {
  // @ts-ignore
  request.startTime = process.hrtime();
});

fastify.addHook('onResponse', async (request, reply) => {
  // @ts-ignore
  const diff = process.hrtime(request.startTime);
  const ms = diff[0] * 1000 + diff[1] / 1e6;
  console.log(`[${request.method}] ${request.url} - ${ms.toFixed(2)} ms`);
});

// Register routes
fastify.register(userRoutes, { prefix: '/api/users' });
fastify.register(apiKeyRoutes, { prefix: '/api/apikey' });
fastify.register(recipeRoutes, { prefix: '/api/recipes' });

// Health check route
fastify.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on port 3000');
    // await seedRecipes()
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { userRoutes } from './routes/user.routes';
import { apiKeyRoutes } from './routes/apikey.routes';
import { recipeRoutes } from './routes/recipe.routes';

const fastify = Fastify({
  logger: true
});

// Register JWT plugin
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'SomeKey'
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
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
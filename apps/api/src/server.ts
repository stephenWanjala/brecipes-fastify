import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { userRoutes } from './routes/user.routes';
import { apiKeyRoutes } from './routes/apikey.routes';
import { recipeRoutes } from './routes/recipe.routes';
import seedRecipes from "./seed";
import cors from "@fastify/cors"
import {usageRoutes} from "./routes/usage.routes";
import {registerUsageTracker} from "./routes/usage-tracker";

const fastify = Fastify({
  logger: true
});

// Register JWT plugin
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'SomeKey'
});
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
});

// fastify.addHook('onResponse', async (request, reply) => {
//   // @ts-ignore
//   const diff = process.hrtime(request.startTime);
//   const ms = diff[0] * 1000 + diff[1] / 1e6;
//   console.log(`[${request.method}] ${request.url} - ${ms.toFixed(2)} ms`);
// });

fastify.register(registerUsageTracker);
// Register routes
fastify.register(userRoutes, { prefix: '/api/users' });
fastify.register(apiKeyRoutes, { prefix: '/api/apikey' });
fastify.register(recipeRoutes, { prefix: '/api/recipes' });
fastify.register(usageRoutes, { prefix: '/api/usage' });

// Health check route
fastify.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  const port = parseInt(process.env.PORT || '3000');
  try {
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
    // await seedRecipes()
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
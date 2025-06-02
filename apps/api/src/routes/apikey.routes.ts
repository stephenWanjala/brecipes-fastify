import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function apiKeyRoutes(fastify: FastifyInstance) {
  // Authenticate requests using JWT
  fastify.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Regenerate API key
  fastify.post('/regenerate', async (request, reply) => {
    try {
      const userId = (request.user as { userId: string }).userId;
      
      // Generate new API key
      const newApiKey = await prisma.apiKey.update({
        where: {
          userId: userId
        },
        data: {
          key: uuidv4()
        }
      });

      return reply.send({
        apiKey: newApiKey.key
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get current API key
  fastify.get('/current', async (request, reply) => {
    try {
      const userId = (request.user as { userId: string }).userId;
      
      const apiKey = await prisma.apiKey.findUnique({
        where: {
          userId: userId
        }
      });

      return reply.send({
        apiKey: apiKey?.key
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // List all API keys (Admin only)
  fastify.get('/all', async (request, reply) => {
    try {
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const apiKeys = await prisma.apiKey.findMany({
        select: {
          id: true,
          key: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              email: true
            }
          }
        }
      });

      return reply.send({ apiKeys });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
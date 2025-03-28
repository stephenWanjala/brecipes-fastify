import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function userRoutes(fastify: FastifyInstance) {
  // Register new user
  fastify.post('/register', async (request, reply) => {
    try {
      const { email, password, role = 'USER' } = request.body as { 
        email: string; 
        password: string;
        role?: 'USER' | 'ADMIN';
      };

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return reply.status(400).send({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user and API key
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
          apiKey: {
            create: {
              key: uuidv4()
            }
          }
        },
        include: {
          apiKey: true
        }
      });

      // Generate JWT token
      const token = fastify.jwt.sign({ 
        userId: user.id,
        role: user.role
      });

      return reply.send({
        token,
        apiKey: user.apiKey?.key,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Login user
  fastify.post('/login', async (request, reply) => {
    try {
      const { email, password } = request.body as { email: string; password: string };

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          apiKey: true
        }
      });

      if (!user) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = fastify.jwt.sign({ 
        userId: user.id,
        role: user.role
      });

      return reply.send({
        token,
        apiKey: user.apiKey?.key,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get all users (Admin only)
  fastify.get('/all', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string; role: string };

      if (user.role !== 'ADMIN') {
        return reply.status(403).send({ error: 'Access denied' });
      }

      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return reply.send({ users });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
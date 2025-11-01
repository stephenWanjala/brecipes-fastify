import 'fastify';
import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    startTime: [number, number];
    apiKeyId?: string;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      userId: string;
      role: string;
    };
  }
}
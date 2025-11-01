import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { PrismaClient } from "@prisma/client"
import fp from 'fastify-plugin'

const prisma = new PrismaClient()


export const registerUsageTracker = fp(async (fastify: FastifyInstance) => {
    // Hook to capture start time for all requests
    fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        console.log(`[${request.method}] ${request.url}`);
        request.startTime = process.hrtime();
    });

    // Hook to track API usage and general response time after request completion
    fastify.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
        // Calculate response time for general logging
        const diff = process.hrtime(request.startTime);
        const ms = diff[0] * 1000 + diff[1] / 1e6;
        console.log(`[${request.method}] ${request.url} - ${ms.toFixed(2)} ms`);

        try {
            // Only track API routes we care about; avoid tracking usage endpoints themselves
            const url = request.url || '';
            const isRecipe = url.startsWith('/api/recipes');
            const isUser = url.startsWith('/api/users');
            const isApiKey = url.startsWith('/api/apikey');
            const isUsage = url.startsWith('/api/usage');
            if (!(isRecipe || isUser || isApiKey) || isUsage) {
                return;
            }

            // Try to resolve apiKeyId from request (set by route preHandler), header, or from authenticated user
            let apiKeyRecordId: string | null = null;

            // Prefer apiKeyId attached by route preHandler (e.g., recipes)
            if (request.apiKeyId) {
                apiKeyRecordId = request.apiKeyId;
            }

            // If not present, try header lookup
            if (!apiKeyRecordId) {
                const headerApiKey = request.headers['x-api-key'] as string | undefined;
                if (headerApiKey) {
                    const apiKeyRecord = await prisma.apiKey.findUnique({
                        where: { key: headerApiKey },
                        select: { id: true },
                    });
                    if (apiKeyRecord) {
                        apiKeyRecordId = apiKeyRecord.id;
                    } else {
                        console.warn(`API Key not found: ${headerApiKey}`);
                    }
                }
            }

            // If no apiKey from header, try JWT user -> user's apiKey
            if (!apiKeyRecordId) {
                const user = (request as any).user as { userId?: string } | undefined;
                const userId = user?.userId;
                if (userId) {
                    const userApiKey = await prisma.apiKey.findUnique({
                        where: { userId },
                        select: { id: true },
                    });
                    if (userApiKey) {
                        apiKeyRecordId = userApiKey.id;
                    }
                }
            }

            // If we still couldn't resolve an apiKeyId, do not log to avoid FK errors
            if (!apiKeyRecordId) {
                return;
            }

            // Log the API usage
            await prisma.apiUsage.create({
                data: {
                    apiKeyId: apiKeyRecordId,
                    endpoint: url,
                    method: request.method,
                    statusCode: reply.statusCode,
                    responseTime: Math.round(ms),
                    userAgent: (request.headers['user-agent'] as string) || null,
                    ipAddress: (request.ip as string) || null,
                },
            });
        } catch (error) {
            console.error("Error tracking API usage:", error);
        }
    });
})
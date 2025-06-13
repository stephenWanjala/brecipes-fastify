import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


declare module 'fastify' {
    interface FastifyRequest {
        startTime: [number, number];
    }
}

export async function registerUsageTracker(fastify: FastifyInstance) {
    // Hook to capture start time for all requests
    fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        request.startTime = process.hrtime();
    });

    // Hook to track API usage and general response time after request completion
    fastify.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
        // Calculate response time for general logging
        const diff = process.hrtime(request.startTime);
        const ms = diff[0] * 1000 + diff[1] / 1e6;
        console.log(`[${request.method}] ${request.url} - ${ms.toFixed(2)} ms`);

        try {
            if (!request.url.includes("/api/recipes") && !request.url.startsWith("/api/users") && !request.url.startsWith("/api/apikey") && !request.url.startsWith("/api/usage")) {
                return;
            }

            // Get API key from headers
            const apiKey = request.headers["x-api-key"] as string;
            if (!apiKey && request.url.startsWith("/api/recipes")) {
                return;
            }

            let apiKeyRecordId: string | null = null;
            if (apiKey) {
                // Find the API key in database
                const apiKeyRecord = await prisma.apiKey.findUnique({
                    where: { key: apiKey },
                    select: { id: true },
                });

                if (!apiKeyRecord) {
                    console.warn(`API Key not found: ${apiKey}`);
                } else {
                    apiKeyRecordId = apiKeyRecord.id;
                }
            }


            // Log the API usage
            await prisma.apiUsage.create({
                data: {
                    apiKeyId: apiKeyRecordId!!,
                    endpoint: request.url,
                    method: request.method,
                    statusCode: reply.statusCode,
                    responseTime: Math.round(ms),
                    userAgent: request.headers["user-agent"] || null,
                    ipAddress: request.ip || null,
                },
            });
        } catch (error) {
            console.error("Error tracking API usage:", error);
        }
    });
}
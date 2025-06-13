import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function registerUsageTracker(fastify: FastifyInstance) {
    // Hook to track API usage after request completion
    fastify.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // Only track API routes (not auth routes)
            if (!request.url.startsWith("/api/recipes")) {
                return
            }

            // Get API key from headers
            const apiKey = request.headers["x-api-key"] as string

            if (!apiKey) {
                return // Skip tracking if no API key
            }

            // Find the API key in database
            const apiKeyRecord = await prisma.apiKey.findUnique({
                where: { key: apiKey },
                select: { id: true },
            })

            if (!apiKeyRecord) {
                return // Skip if API key not found
            }

            // Calculate response time
            const responseTime = reply.elapsedTime

            // Get client info
            const userAgent = request.headers["user-agent"] || null
            const ipAddress = request.ip || null

            // Log the API usage
            await prisma.apiUsage.create({
                data: {
                    apiKeyId: apiKeyRecord.id,
                    endpoint: request.url,
                    method: request.method,
                    statusCode: reply.statusCode,
                    responseTime: Math.round(responseTime),
                    userAgent,
                    ipAddress,
                },
            })
        } catch (error) {
            // Log error but don't fail the request
            console.error("Error tracking API usage:", error)
        }
    })
}

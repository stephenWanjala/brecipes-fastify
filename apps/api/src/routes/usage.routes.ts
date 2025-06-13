import type {FastifyInstance} from "fastify"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function usageRoutes(fastify: FastifyInstance) {
    // Authenticate requests using JWT
    fastify.addHook("preHandler", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    // Get usage statistics for the authenticated user
    fastify.get("/stats", async (request, reply) => {
        try {
            const userId = (request.user as { userId: string }).userId

            // Get user's API key
            const apiKey = await prisma.apiKey.findUnique({
                where: {userId},
                select: {id: true},
            })

            if (!apiKey) {
                return reply.status(404).send({error: "API key not found"})
            }

            // Calculate date ranges
            const now = new Date()
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

            // Get usage statistics
            const [monthlyUsage, last30DaysUsage, todayUsage, recentRequests] = await Promise.all([
                // Monthly usage count
                prisma.apiUsage.count({
                    where: {
                        apiKeyId: apiKey.id,
                        createdAt: {
                            gte: startOfMonth,
                            lte: endOfMonth,
                        },
                    },
                }),

                // Last 30 days usage count
                prisma.apiUsage.count({
                    where: {
                        apiKeyId: apiKey.id,
                        createdAt: {
                            gte: last30Days,
                        },
                    },
                }),

                // Today's usage count
                prisma.apiUsage.count({
                    where: {
                        apiKeyId: apiKey.id,
                        createdAt: {
                            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                        },
                    },
                }),

                // Recent requests (last 10)
                prisma.apiUsage.findMany({
                    where: {
                        apiKeyId: apiKey.id,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 10,
                    select: {
                        id: true,
                        endpoint: true,
                        method: true,
                        statusCode: true,
                        responseTime: true,
                        createdAt: true,
                    },
                }),
            ])

            // Calculate usage by day for the last 30 days
            const dailyUsage = await prisma.apiUsage.groupBy({
                by: ["createdAt"], // Grouping by date part will require a raw query or more complex logic
                where: {
                    apiKeyId: apiKey.id,
                    createdAt: {
                        gte: last30Days,
                    },
                },
                _count: {
                    id: true,
                },
                orderBy: {
                    createdAt: "desc", // Order by the date part
                },
            })

            // Manually process dailyUsage to aggregate by date without time
            const aggregatedDailyUsage: { date: Date; requests: number }[] = dailyUsage.reduce(
                (acc: { date: Date; requests: number }[], item) => {
                    const dateOnly = new Date(item.createdAt.getFullYear(), item.createdAt.getMonth(), item.createdAt.getDate());
                    const existingEntry = acc.find(entry => entry.date.getTime() === dateOnly.getTime());

                    if (existingEntry) {
                        existingEntry.requests += item._count.id;
                    } else {
                        acc.push({ date: dateOnly, requests: item._count.id });
                    }
                    return acc;
                }, []).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort again to ensure descending order by date


            // Usage limits (these could be configurable per plan)
            const limits = {
                monthly: 10000,
                daily: 1000,
            }

            const monthlyPercentage = (monthlyUsage / limits.monthly) * 100
            const dailyPercentage = (todayUsage / limits.daily) * 100

            return reply.send({
                usage: {
                    monthly: {
                        used: monthlyUsage,
                        limit: limits.monthly,
                        percentage: Math.min(monthlyPercentage, 100),
                        remaining: Math.max(limits.monthly - monthlyUsage, 0),
                    },
                    daily: {
                        used: todayUsage,
                        limit: limits.daily,
                        percentage: Math.min(dailyPercentage, 100),
                        remaining: Math.max(limits.daily - todayUsage, 0),
                    },
                    last30Days: last30DaysUsage,
                },
                resetDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
                dailyUsage: aggregatedDailyUsage,
                recentRequests,
            })
        } catch (error) {
            console.error("Error fetching usage stats:", error)
            return reply.status(500).send({error: "Internal server error"})
        }
    })

    // Get detailed usage analytics (Admin only)
    fastify.get("/analytics", async (request, reply) => {
        try {
            const user = request.user as { userId: string; role: string }

            if (user.role !== "ADMIN") {
                return reply.status(403).send({error: "Access denied"})
            }

            const {startDate, endDate} = request.query as {
                startDate?: string
                endDate?: string
            }

            const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            const end = endDate ? new Date(endDate) : new Date()

            // Get comprehensive analytics
            const [
                totalRequests,
                uniqueUsers,
                averageResponseTime,
                statusCodeDistribution,
                topEndpoints,
                hourlyDistribution,
            ] = await Promise.all([
                // Total requests in period
                prisma.apiUsage.count({
                    where: {
                        createdAt: {gte: start, lte: end},
                    },
                }),

                // Unique users
                prisma.apiUsage.findMany({
                    where: {
                        createdAt: {gte: start, lte: end},
                    },
                    select: {
                        apiKeyId: true, // Select apiKeyId to count distinct users
                    },
                    distinct: ["apiKeyId"],
                }),

                // Average response time
                prisma.apiUsage.aggregate({
                    where: {
                        createdAt: {gte: start, lte: end},
                    },
                    _avg: {
                        responseTime: true,
                    },
                }),

                // Status code distribution
                prisma.apiUsage.groupBy({
                    by: ["statusCode"],
                    where: {
                        createdAt: {gte: start, lte: end},
                    },
                    _count: {
                        statusCode: true,
                    },
                }),

                // Top endpoints
                prisma.apiUsage.groupBy({
                    by: ["endpoint", "method"],
                    where: {
                        createdAt: {gte: start, lte: end},
                    },
                    _count: {
                        endpoint: true,
                    },
                    orderBy: {
                        _count: {
                            endpoint: "desc",
                        },
                    },
                    take: 10,
                }),

                // Hourly distribution
                prisma.$queryRaw`
                    SELECT EXTRACT(HOUR FROM "createdAt") as hour,
                           COUNT(*) as requests
                    FROM "ApiUsage"
                    WHERE "createdAt" >= ${start}
                      AND "createdAt" <= ${end}
                    GROUP BY EXTRACT (HOUR FROM "createdAt")
                    ORDER BY hour ASC
                ` as Promise<Array<{ hour: number; requests: bigint }>>,
            ])

            return reply.send({
                period: {start, end},
                summary: {
                    totalRequests,
                    uniqueUsers: uniqueUsers.length, // Count the distinct apiKeyIds
                    averageResponseTime: averageResponseTime._avg.responseTime || 0,
                },
                statusCodeDistribution,
                topEndpoints,
                hourlyDistribution: hourlyDistribution.map((h) => ({
                    hour: h.hour,
                    requests: Number(h.requests),
                })),
            })
        } catch (error) {
            console.error("Error fetching analytics:", error)
            return reply.status(500).send({error: "Internal server error"})
        }
    })
}
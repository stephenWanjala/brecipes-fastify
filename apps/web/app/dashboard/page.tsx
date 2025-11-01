"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Copy, RefreshCw, Eye, EyeOff, AlertTriangle, BarChart, TrendingUp, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface UsageStats {
  usage: {
    monthly: {
      used: number
      limit: number
      percentage: number
      remaining: number
    }
    daily: {
      used: number
      limit: number
      percentage: number
      remaining: number
    }
    last30Days: number
  }
  resetDate: string
  dailyUsage: Array<{
    date: string
    requests: number
  }>
  recentRequests: Array<{
    id: string
    endpoint: string
    method: string
    statusCode: number
    responseTime: number
    createdAt: string
  }>
}

/**
 * Renders the user dashboard with API key management, account information, and usage/request statistics.
 *
 * Displays the current user's API key with copy and regenerate actions, shows account details, and loads API usage statistics and recent requests. Performs an authentication redirect to the login page when no user is present, copies the API key to the clipboard, invokes API calls to fetch usage statistics, and shows success/error toasts for key regeneration and other operations.
 *
 * @returns The Dashboard page React element.
 */
export default function DashboardPage() {
  const { user, loading, regenerateApiKey, fetchUsageStats } = useAuth()
  const router = useRouter()
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Fetch usage statistics
  useEffect(() => {
    const loadUsageStats = async () => {
      if (!user) return

      try {
        const data = await fetchUsageStats()
        setUsageStats(data)
      } catch (error) {
        console.error("Error fetching usage stats:", error)
      } finally {
        setLoadingStats(false)
      }
    }

    loadUsageStats()
  }, [user, fetchUsageStats])

  const copyApiKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey)
      toast.message("API Key copied to clipboard!", {
        duration: 2000,
        description: "You can now paste it into your application.",
      })
    }
  }

  const handleRegenerateApiKey = async () => {
    try {
      setIsRegenerating(true)
      const newApiKey = await regenerateApiKey()
      console.log(newApiKey)
      toast.success("API key regenerated successfully!", {
        duration: 2000,
        description: "Your new API key is now visible.",
      })
      setIsApiKeyVisible(true)
    } catch (error) {
      toast.error("Failed to regenerate API key. Please try again later.", {
        duration: 3000,
        description: "If the problem persists, contact support.",
      })
      console.error("Error regenerating API key:", error)
    } finally {
      setIsRegenerating(false)
    }
  }

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-600"
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-600"
    if (statusCode >= 500) return "text-red-600"
    return "text-gray-600"
  }

  if (loading || !user) {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="animate-pulse text-center">
            <div className="h-8 w-32 bg-muted rounded mb-4 mx-auto"></div>
            <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
          </div>
        </div>
    )
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Your API Key</CardTitle>
              <CardDescription>Use this key to authenticate your API requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                      type={isApiKeyVisible ? "text" : "password"}
                      value={user.apiKey}
                      readOnly
                      className="pr-10 font-mono text-sm"
                  />
                  <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                  >
                    {isApiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" size="icon" onClick={copyApiKey}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                Never share your API key publicly
              </div>
              <Button variant="outline" onClick={handleRegenerateApiKey} disabled={isRegenerating}>
                {isRegenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Key
                    </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Info</CardTitle>
              <CardDescription>Your account details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Email</div>
                <div className="text-sm">{user.email}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Account Type</div>
                <Badge>{user.role}</Badge>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Plan</div>
                <Badge variant="outline">Free</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="usage">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="usage">API Usage</TabsTrigger>
              <TabsTrigger value="requests">Recent Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle>API Usage</CardTitle>
                      <CardDescription>Monitor your API request usage for the current billing period</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        setLoadingStats(true)
                        try {
                          const data = await fetchUsageStats()
                          setUsageStats(data)
                        } catch (e) {
                          console.error("Error refreshing usage stats:", e)
                        } finally {
                          setLoadingStats(false)
                        }
                      }}
                    >
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loadingStats ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-muted rounded animate-pulse"></div>
                        <div className="h-20 bg-muted rounded animate-pulse"></div>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
                          ))}
                        </div>
                      </div>
                  ) : usageStats ? (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Monthly Usage ({usageStats.usage.monthly.percentage.toFixed(1)}%)</span>
                              <span>
                            {usageStats.usage.monthly.used.toLocaleString()} /{" "}
                                {usageStats.usage.monthly.limit.toLocaleString()} requests
                          </span>
                            </div>
                            <Progress value={usageStats.usage.monthly.percentage} className="h-2" />
                            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                              <span>
                                Remaining: {usageStats.usage.monthly.remaining.toLocaleString()}
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  usageStats.usage.monthly.used >= usageStats.usage.monthly.limit
                                    ? "text-red-600 border-red-600"
                                    : usageStats.usage.monthly.percentage >= 80
                                    ? "text-amber-600 border-amber-600"
                                    : "text-green-600 border-green-600"
                                }
                              >
                                {usageStats.usage.monthly.used >= usageStats.usage.monthly.limit
                                  ? "Exceeded"
                                  : usageStats.usage.monthly.percentage >= 80
                                  ? "Near limit"
                                  : "OK"}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Daily Usage ({usageStats.usage.daily.percentage.toFixed(1)}%)</span>
                              <span>
                            {usageStats.usage.daily.used.toLocaleString()} /{" "}
                                {usageStats.usage.daily.limit.toLocaleString()} requests
                          </span>
                            </div>
                            <Progress value={usageStats.usage.daily.percentage} className="h-2" />
                            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                              <span>
                                Remaining: {usageStats.usage.daily.remaining.toLocaleString()}
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  usageStats.usage.daily.used >= usageStats.usage.daily.limit
                                    ? "text-red-600 border-red-600"
                                    : usageStats.usage.daily.percentage >= 80
                                    ? "text-amber-600 border-amber-600"
                                    : "text-green-600 border-green-600"
                                }
                              >
                                {usageStats.usage.daily.used >= usageStats.usage.daily.limit
                                  ? "Exceeded"
                                  : usageStats.usage.daily.percentage >= 80
                                  ? "Near limit"
                                  : "OK"}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4 flex items-center">
                              <BarChart className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="text-sm font-medium">Monthly Requests</div>
                                <div className="text-2xl font-bold">{usageStats.usage.monthly.used.toLocaleString()}</div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4 flex items-center">
                              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                              <div>
                                <div className="text-sm font-medium">Remaining</div>
                                <div className="text-2xl font-bold">
                                  {usageStats.usage.monthly.remaining.toLocaleString()}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4 flex items-center">
                              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <div className="text-sm font-medium">Reset Date</div>
                                <div className="text-lg font-medium">
                                  {new Date(usageStats.resetDate).toLocaleDateString()}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4 flex items-center">
                              <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                              <div>
                                <div className="text-sm font-medium">Last 30 Days</div>
                                <div className="text-2xl font-bold">{usageStats.usage.last30Days.toLocaleString()}</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {usageStats.dailyUsage.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-3">Last 7 Days Usage</h4>
                              <div className="space-y-2">
                                {usageStats.dailyUsage.slice(0, 7).map((day, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                      <span>{new Date(day.date).toLocaleDateString()}</span>
                                      <span className="font-medium">{day.requests} requests</span>
                                    </div>
                                ))}
                              </div>
                            </div>
                        )}
                      </>
                  ) : (
                      <div className="text-center text-muted-foreground">Failed to load usage statistics</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Your most recent API requests and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingStats ? (
                      <div className="space-y-2">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="p-4 border rounded-md animate-pulse">
                                  <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                                  <div className="h-3 bg-muted rounded w-3/4"></div>
                                </div>
                            ))}
                      </div>
                  ) : usageStats?.recentRequests.length ? (
                      <div className="space-y-2">
                        {usageStats.recentRequests.map((request) => (
                            <div key={request.id} className="p-4 border rounded-md">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {request.method}
                                  </Badge>
                                  <span className="text-sm font-medium">{request.endpoint}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span className={getStatusColor(request.statusCode)}>{request.statusCode}</span>
                                  <span>{request.responseTime}ms</span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(request.createdAt).toLocaleString()}
                              </div>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        No API requests found. Start using your API key to see request history here.
                      </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}
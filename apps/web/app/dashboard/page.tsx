"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Copy, RefreshCw, Eye, EyeOff, AlertTriangle, Clock, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { user, loading, regenerateApiKey } = useAuth();
  const router = useRouter();
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [usageData] = useState({
    limit: 10000,
    used: 1234,
    percentage: 12.34,
    remaining: 8766,
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const copyApiKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
     toast.message("API Key copied to clipboard!", {
        duration: 2000,
        description: "You can now paste it into your application.",
      });
    }
  };

  const handleRegenerateApiKey = async () => {
    try {
      setIsRegenerating(true);
      const newApiKey = await regenerateApiKey();
      console.log(newApiKey);
      toast.success("API key regenerated successfully!", {
        duration: 2000,
        description: "Your new API key is now visible.",
      }
      );
      setIsApiKeyVisible(true);
    } catch (error) {
      toast.error("Failed to regenerate API key. Please try again later.", {
        duration: 3000,
        description: "If the problem persists, contact support.",
      });
      console.error("Error regenerating API key:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-32 bg-muted rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Your API Key</CardTitle>
            <CardDescription>
              Use this key to authenticate your API requests
            </CardDescription>
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
            <Button 
              variant="outline" 
              onClick={handleRegenerateApiKey}
              disabled={isRegenerating}
            >
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
                <CardTitle>API Usage</CardTitle>
                <CardDescription>
                  Monitor your API request usage for the current billing period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Usage ({usageData.percentage.toFixed(1)}%)</span>
                    <span>{usageData.used} / {usageData.limit} requests</span>
                  </div>
                  <Progress value={usageData.percentage} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Total Requests</div>
                        <div className="text-2xl font-bold">{usageData.used.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      <div>
                        <div className="text-sm font-medium">Remaining</div>
                        <div className="text-2xl font-bold">{usageData.remaining.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Reset Date</div>
                        <div className="text-lg font-medium">
                          {usageData.resetDate.toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription>
                  Your most recent API requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground mb-4">
                    Request history will appear here once you start using the API.
                  </div>
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="p-4 border rounded-md animate-pulse">
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
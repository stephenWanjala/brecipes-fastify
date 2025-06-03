import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const endpoints = [
  { 
    method: 'GET', 
    path: '/api/recipes', 
    description: 'Get paginated recipes with optional filters for cuisine and title',
    auth: 'API Key or JWT',
    tags: ['Pagination', 'Filtering']
  },
  { 
    method: 'GET', 
    path: '/api/recipes/search', 
    description: 'Search recipes by query across multiple fields',
    auth: 'API Key or JWT',
    tags: ['Search', 'Pagination']
  },
  { 
    method: 'GET', 
    path: '/api/recipes/cuisines', 
    description: 'Get a list of available cuisines and recipe counts',
    auth: 'API Key or JWT',
    tags: ['Aggregation']
  },
  { 
    method: 'GET', 
    path: '/api/recipes/:id', 
    description: 'Get a single recipe by ID',
    auth: 'API Key or JWT',
    tags: ['Detail']
  },
  { 
    method: 'POST', 
    path: '/api/recipes', 
    description: 'Create a new recipe',
    auth: 'JWT (Admin)',
    tags: ['Admin', 'Create']
  },
  { 
    method: 'POST', 
    path: '/api/users/register', 
    description: 'Register a new user and get an API key',
    auth: 'None',
    tags: ['Authentication']
  },
  { 
    method: 'POST', 
    path: '/api/users/login', 
    description: 'Login and retrieve API key',
    auth: 'None',
    tags: ['Authentication']
  },
  { 
    method: 'POST', 
    path: '/api/apikey/regenerate', 
    description: 'Generate a new API key',
    auth: 'JWT',
    tags: ['API Key']
  }
];

const getMethodColor = (method: string) => {
  switch(method) {
    case 'GET': return 'bg-blue-500';
    case 'POST': return 'bg-green-500';
    case 'PUT': return 'bg-amber-500';
    case 'DELETE': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default function ApiOverview() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">API Overview</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Powerful endpoints at your fingertips
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Our RESTful API provides comprehensive endpoints for managing and retrieving recipe data.
          </p>
        </div>

        <Tabs defaultValue="endpoints" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="endpoints">Popular Endpoints</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
          </TabsList>
          
          <TabsContent value="endpoints">
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getMethodColor(endpoint.method)} text-white font-mono`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {endpoint.path}
                    </code>
                  </div>
                  <p className="mt-2 text-muted-foreground">{endpoint.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mr-1">
                        {endpoint.auth}
                      </Badge>
                      {endpoint.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="mr-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-8">
                <Link href="/docs">
                  <Button variant="outline" className="font-medium">
                    View all endpoints <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication">
            <div className="space-y-6 bg-card p-6 rounded-lg border">
              <div>
                <h3 className="text-lg font-medium">JWT Authentication</h3>
                <p className="mt-1 text-muted-foreground">
                  The API uses JWT (JSON Web Token) for authenticating users. Tokens are returned upon successful registration or login.
                </p>
                <code className="block bg-muted p-3 rounded-md mt-3 text-sm font-mono">
                  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </code>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">API Key Authentication</h3>
                <p className="mt-1 text-muted-foreground">
                  API keys can be used as an alternative authentication method. Pass the API key in the request header.
                </p>
                <code className="block bg-muted p-3 rounded-md mt-3 text-sm font-mono">
                  X-API-Key: your-api-key-here
                </code>
              </div>
              
              <div className="text-center mt-8">
                <Link href="/auth/register">
                  <Button className="font-medium">
                    Get Your API Key <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
"use client";

import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {Copy, CheckCheck, ChevronRight, Key, Users, Book, Search, AlertTriangle} from 'lucide-react';

export default function DocsPage() {
    const {toast} = useToast();
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

    const copyToClipboard = (text: string, endpointId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEndpoint(endpointId);
        setTimeout(() => setCopiedEndpoint(null), 2000);

        toast({
            title: "Copied to clipboard",
            description: "You can now paste this code into your project.",
        });
    };

    return (
        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="mx-auto mb-16 max-w-3xl text-center">
                <Badge className="mb-4" variant="outline">Documentation</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Recipe API Documentation</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Complete reference guide to integrate with our Recipe API. Access thousands of recipes with simple
                    REST endpoints.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="col-span-1 lg:col-span-3">
                    <div className="lg:sticky lg:top-24">
                        <nav className="space-y-1 mb-8">
                            <p className="font-medium mb-2 text-sm text-muted-foreground">ON THIS PAGE</p>
                            <div className="space-y-3">
                                <a href="#introduction" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    Introduction
                                </a>
                                <a href="#authentication" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    Authentication
                                </a>
                                <a href="#users" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    User Endpoints
                                </a>
                                <a href="#apikeys" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    API Key Endpoints
                                </a>
                                <a href="#recipes" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    Recipe Endpoints
                                </a>
                                <a href="#errors" className="flex items-center text-sm hover:text-primary">
                                    <ChevronRight className="h-3 w-3 mr-1"/>
                                    Error Handling
                                </a>
                            </div>
                        </nav>

                        <Card className="p-4 bg-primary/5 border">
                            <CardContent className="p-0">
                                <h3 className="font-medium mb-2">Need an API key?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Create an account to get started with your free API key
                                </p>
                                <Button asChild size="sm">
                                    <a href="/auth/register">
                                        Get API Key <Key className="ml-2 h-3 w-3"/>
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-9 space-y-12">
                    {/* Introduction */}
                    <section id="introduction" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Book className="h-7 w-7 text-primary"/>
                            Introduction
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                The Recipe API provides programmatic access to a database of delicious recipes from
                                around the world.
                                With this API, you can retrieve recipes with detailed ingredients and cooking
                                instructions,
                                search for recipes by cuisine or keyword, and more.
                            </p>
                            <h3>Base URL</h3>
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                https://api.example.com
                            </code>

                            <h3>Response Format</h3>
                            <p>
                                All API responses are returned in JSON format. Successful responses typically include
                                the requested data, while error responses include an error message.
                            </p>

                            <h3>Rate Limiting</h3>
                            <p>
                                The API implements rate limiting to ensure fair usage and service stability:
                            </p>
                            <ul>
                                <li>100 requests per minute per IP address</li>
                                <li>Applies to all recipe endpoints</li>
                                <li>When exceeded, the API returns a <code>429 Too Many Requests</code> response</li>
                            </ul>
                        </div>
                    </section>

                    {/* Authentication */}
                    <section id="authentication" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Key className="h-7 w-7 text-primary"/>
                            Authentication
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                            <p>
                                The Recipe API supports two authentication methods: API Keys and JWT tokens.
                                Most endpoints require authentication using either method.
                            </p>
                        </div>

                        <Tabs defaultValue="apikey" className="mb-8">
                            <TabsList>
                                <TabsTrigger value="apikey">API Key Authentication</TabsTrigger>
                                <TabsTrigger value="jwt">JWT Authentication</TabsTrigger>
                            </TabsList>
                            <TabsContent value="apikey" className="space-y-4">
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>
                                        API Key authentication is the simplest method for accessing the API.
                                        Include your API key in each request&apos;s header:
                                    </p>
                                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code className="text-sm font-mono">X-API-Key: your-api-key-here</code>
                  </pre>
                                    <p>
                                        You can obtain your API key by <a href="/auth/register">registering</a> for an
                                        account.
                                    </p>
                                </div>

                                <div className="bg-card border rounded-md p-4">
                                    <h4 className="font-medium mb-2">Example Request with API Key</h4>
                                    <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                    <code className="text-sm font-mono">
                      curl -X GET &apos;https://api.example.com/api/recipes&apos; \<br/>
                        &nbsp;&nbsp;-H &apos;X-API-Key: your-api-key-here&apos; \<br/>
                        &nbsp;&nbsp;-H &apos;Content-Type: application/json&apos;
                    </code>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                        onClick={() => copyToClipboard(
                            `curl -X GET 'https://api.example.com/api/recipes' \\
  -H 'X-API-Key: your-api-key-here' \\
  -H 'Content-Type: application/json'`,
                            'api-key-example'
                        )}
                    >
                      {copiedEndpoint === 'api-key-example' ? (
                          <CheckCheck className="h-4 w-4"/>
                      ) : (
                          <Copy className="h-4 w-4"/>
                      )}
                    </Button>
                  </pre>
                                </div>
                            </TabsContent>

                            <TabsContent value="jwt" className="space-y-4">
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>
                                        JWT (JSON Web Token) authentication is used for more secure operations,
                                        especially admin-related endpoints. JWT tokens are obtained when logging in
                                        or registering.
                                    </p>
                                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code className="text-sm font-mono">Authorization: Bearer your-jwt-token</code>
                  </pre>
                                </div>

                                <div className="bg-card border rounded-md p-4">
                                    <h4 className="font-medium mb-2">Example Request with JWT Token</h4>
                                    <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                    <code className="text-sm font-mono">
  curl -X POST &apos;https://api.example.com/api/recipes&apos; \<br/>
                        &nbsp;&nbsp;-H &apos;Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&apos; \<br/>
                        &nbsp;&nbsp;-H &apos;Content-Type: application/json&apos; \<br/>
                        &nbsp;&nbsp;-d &apos;&amp;lbrace;&quot;title&quot;: &quot;Pasta Carbonara&quot;, &quot;description&quot;: &quot;Classic Italian pasta dish&quot;...&amp;rbrace;&apos;
                        </code>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                        onClick={() => copyToClipboard(
                            `curl -X POST 'https://api.example.com/api/recipes' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'Content-Type: application/json' \\
  -d '{"title": "Pasta Carbonara", "description": "Classic Italian pasta dish"...}'`,
                            'jwt-example'
                        )}
                    >
                      {copiedEndpoint === 'jwt-example' ? (
                          <CheckCheck className="h-4 w-4"/>
                      ) : (
                          <Copy className="h-4 w-4"/>
                      )}
                    </Button>
                  </pre>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>

                    {/* User Endpoints */}
                    <section id="users" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Users className="h-7 w-7 text-primary"/>
                            User Endpoints
                        </h2>

                        <div className="space-y-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="register">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-500 text-white font-mono">POST</Badge>
                                            <code className="text-sm font-mono">/api/users/register</code>
                                            <Badge variant="outline">Public</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Register a new user and get an API key.
                                            </p>

                                            <h4>Request Body</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"  // Optional, defaults to "USER"
}`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X POST 'https://api.example.com/api/users/register' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X POST 'https://api.example.com/api/users/register' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
                                'register-example'
                            )}
                        >
                          {copiedEndpoint === 'register-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="login">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-500 text-white font-mono">POST</Badge>
                                            <code className="text-sm font-mono">/api/users/login</code>
                                            <Badge variant="outline">Public</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Login with email and password to retrieve JWT token and API key.
                                            </p>

                                            <h4>Request Body</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "email": "user@example.com",
  "password": "password123"
}`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X POST 'https://api.example.com/api/users/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X POST 'https://api.example.com/api/users/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
                                'login-example'
                            )}
                        >
                          {copiedEndpoint === 'login-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="users-all">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/users/all</code>
                                            <Badge variant="outline">Admin Only</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Get all registered users. This endpoint is restricted to admin users
                                                only.
                                            </p>

                                            <h4>Headers</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/users/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/users/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                                'users-all-example'
                            )}
                        >
                          {copiedEndpoint === 'users-all-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>

                    {/* API Key Endpoints */}
                    <section id="apikeys" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Key className="h-7 w-7 text-primary"/>
                            API Key Endpoints
                        </h2>

                        <div className="space-y-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="apikey-current">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/apikey/current</code>
                                            <Badge variant="outline">JWT Auth</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Retrieve the current user&apos;s API key.
                                            </p>

                                            <h4>Headers</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "apiKey": "api-key"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/apikey/current' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/apikey/current' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                                'apikey-current-example'
                            )}
                        >
                          {copiedEndpoint === 'apikey-current-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="apikey-regenerate">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-500 text-white font-mono">POST</Badge>
                                            <code className="text-sm font-mono">/api/apikey/regenerate</code>
                                            <Badge variant="outline">JWT Auth</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Generate a new API key for the current user.
                                                This will invalidate the existing API key.
                                            </p>

                                            <h4>Headers</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "apiKey": "new-api-key"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X POST 'https://api.example.com/api/apikey/regenerate' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X POST 'https://api.example.com/api/apikey/regenerate' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                                'apikey-regenerate-example'
                            )}
                        >
                          {copiedEndpoint === 'apikey-regenerate-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="apikey-all">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/apikey/all</code>
                                            <Badge variant="outline">Admin Only</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                List all API keys in the system. This endpoint is restricted to admin
                                                users only.
                                            </p>

                                            <h4>Headers</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "apiKeys": [
    {
      "id": "uuid",
      "key": "api-key",
      "userId": "user-id",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "user": {
        "email": "user@example.com"
      }
    }
  ]
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/apikey/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/apikey/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                                'apikey-all-example'
                            )}
                        >
                          {copiedEndpoint === 'apikey-all-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>

                    {/* Recipe Endpoints */}
                    <section id="recipes" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Search className="h-7 w-7 text-primary"/>
                            Recipe Endpoints
                        </h2>

                        <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                            <p>
                                All recipe endpoints require authentication using either an API key or a JWT token.
                            </p>
                            <ul>
                                <li>
                                    <strong>API Key:</strong> Include the <code>X-API-Key</code> header with your API
                                    key.
                                </li>
                                <li>
                                    <strong>JWT Token:</strong> Include the <code>Authorization</code> header with your
                                    JWT token.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="recipes-get">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/recipes</code>
                                            <Badge variant="secondary">Pagination</Badge>
                                            <Badge variant="secondary">Filtering</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Get paginated recipes with optional filters for cuisine and title.
                                            </p>

                                            <h4>Query Parameters</h4>
                                            <ul>
                                                <li><code>page</code> - Page number (default: 1)</li>
                                                <li><code>limit</code> - Results per page (default: 20)</li>
                                                <li><code>cuisine</code> - Filter recipes by cuisine</li>
                                                <li><code>title</code> - Filter recipes by title (case insensitive
                                                    partial match)
                                                </li>
                                            </ul>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "recipes": [
    {
      "id": 1,
      "title": "Spaghetti Carbonara",
      "description": "Classic Italian pasta dish",
      "cuisine": "italian",
      "image": "image-url",
      "sourceUrl": "source-url",
      "chefName": "Chef Name",
      "preparationTime": "15 mins",
      "cookingTime": "15 mins",
      "serves": "4",
      "ingredientsDesc": ["Pasta description", "Egg description"],
      "ingredients": ["200g spaghetti", "2 large eggs"],
      "method": ["Step 1", "Step 2", "Step 3"],
      "createdBy": {
        "email": "admin@example.com"
      },
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/recipes?cuisine=italian&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/recipes?cuisine=italian&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`,
                                'recipes-get-example'
                            )}
                        >
                          {copiedEndpoint === 'recipes-get-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="recipes-search">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/recipes/search</code>
                                            <Badge variant="secondary">Search</Badge>
                                            <Badge variant="secondary">Pagination</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Search recipes across multiple fields (title, description, cuisine, chef
                                                name).
                                            </p>

                                            <h4>Query Parameters</h4>
                                            <ul>
                                                <li><code>q</code> - Search query (required)</li>
                                                <li><code>page</code> - Page number (default: 1)</li>
                                                <li><code>limit</code> - Results per page (default: 20)</li>
                                            </ul>

                                            <h4>Response</h4>
                                            <p>Same format as the GET /api/recipes endpoint.</p>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/recipes/search?q=pasta&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/recipes/search?q=pasta&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`,
                                'recipes-search-example'
                            )}
                        >
                          {copiedEndpoint === 'recipes-search-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="recipes-cuisines">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/recipes/cuisines</code>
                                            <Badge variant="secondary">Aggregation</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Get a list of available cuisines and recipe counts for each cuisine.
                                            </p>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`[
  {
    "cuisine": "italian",
    "_count": {
      "cuisine": 42
    }
  },
  {
    "cuisine": "mexican",
    "_count": {
      "cuisine": 28
    }
  }
]`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/recipes/cuisines' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/recipes/cuisines' \\
  -H 'X-API-Key: your-api-key-here'`,
                                'recipes-cuisines-example'
                            )}
                        >
                          {copiedEndpoint === 'recipes-cuisines-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="recipes-id">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                                            <code className="text-sm font-mono">/api/recipes/:id</code>
                                            <Badge variant="secondary">Detail</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Get a single recipe by its ID.
                                            </p>

                                            <h4>Path Parameters</h4>
                                            <ul>
                                                <li><code>id</code> - Recipe ID</li>
                                            </ul>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "id": 1,
  "title": "Spaghetti Carbonara",
  "description": "Classic Italian pasta dish",
  "cuisine": "italian",
  "image": "image-url",
  "sourceUrl": "source-url",
  "chefName": "Chef Name",
  "preparationTime": "15 mins",
  "cookingTime": "15 mins",
  "serves": "4",
  "ingredientsDesc": ["Pasta description", "Egg description"],
  "ingredients": ["200g spaghetti", "2 large eggs"],
  "method": ["Step 1", "Step 2", "Step 3"],
  "createdBy": {
    "email": "admin@example.com"
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X GET 'https://api.example.com/api/recipes/1' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X GET 'https://api.example.com/api/recipes/1' \\
  -H 'X-API-Key: your-api-key-here'`,
                                'recipes-id-example'
                            )}
                        >
                          {copiedEndpoint === 'recipes-id-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="recipes-create">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-500 text-white font-mono">POST</Badge>
                                            <code className="text-sm font-mono">/api/recipes</code>
                                            <Badge variant="outline">Admin Only</Badge>
                                            <Badge variant="secondary">Create</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            <p>
                                                Create a new recipe. This endpoint is restricted to admin users only.
                                            </p>

                                            <h4>Headers</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                                            <h4>Request Body</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "title": "Recipe Title",
  "description": "Recipe Description",
  "cuisine": "italian",
  "image": "image-url",
  "sourceUrl": "source-url",
  "chefName": "Chef Name",
  "preparationTime": "30 mins",
  "cookingTime": "1 hour",
  "serves": "4",
  "ingredientsDesc": ["ingredient 1", "ingredient 2"],
  "ingredients": ["ingredient1", "ingredient2"],
  "method": ["step 1", "step 2"]
}`}
                        </code>
                      </pre>

                                            <h4>Response</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                        <code className="text-sm font-mono">
{`{
  "id": 1,
  "title": "Recipe Title",
  "description": "Recipe Description",
  "cuisine": "italian",
  "image": "image-url",
  "sourceUrl": "source-url",
  "chefName": "Chef Name",
  "preparationTime": "30 mins",
  "cookingTime": "1 hour",
  "serves": "4",
  "ingredientsDesc": ["ingredient 1", "ingredient 2"],
  "ingredients": ["ingredient1", "ingredient2"],
  "method": ["step 1", "step 2"],
  "userId": "user-id",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}`}
                        </code>
                      </pre>
                                        </div>

                                        <div className="bg-card border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Example Request</h4>
                                            <pre className="bg-muted p-4 rounded-md overflow-auto relative">
                        <code className="text-sm font-mono">
{`curl -X POST 'https://api.example.com/api/recipes' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish",
    "cuisine": "italian",
    "image": "https://example.com/images/carbonara.jpg",
    "sourceUrl": "https://example.com/recipes/carbonara",
    "chefName": "Chef Mario",
    "preparationTime": "15 mins",
    "cookingTime": "15 mins",
    "serves": "4",
    "ingredientsDesc": ["Pasta", "Eggs"],
    "ingredients": ["200g spaghetti", "2 large eggs"],
    "method": ["Boil the pasta", "Mix the eggs", "Combine and serve"]
  }'`}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                            onClick={() => copyToClipboard(
                                `curl -X POST 'https://api.example.com/api/recipes' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish",
    "cuisine": "italian",
    "image": "https://example.com/images/carbonara.jpg",
    "sourceUrl": "https://example.com/recipes/carbonara",
    "chefName": "Chef Mario",
    "preparationTime": "15 mins",
    "cookingTime": "15 mins",
    "serves": "4",
    "ingredientsDesc": ["Pasta", "Eggs"],
    "ingredients": ["200g spaghetti", "2 large eggs"],
    "method": ["Boil the pasta", "Mix the eggs", "Combine and serve"]
  }'`,
                                'recipes-create-example'
                            )}
                        >
                          {copiedEndpoint === 'recipes-create-example' ? (
                              <CheckCheck className="h-4 w-4"/>
                          ) : (
                              <Copy className="h-4 w-4"/>
                          )}
                        </Button>
                      </pre>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Trigger to show more */}
                        <Button variant="outline" className="mt-6" asChild>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                                Show more endpoints
                            </a>
                        </Button>
                    </section>

                    {/* Error Handling */}
                    <section id="errors" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <AlertTriangle className="h-7 w-7 text-primary"/>
                            Error Handling
                        </h2>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                The API uses standard HTTP status codes to indicate the success or failure of a request.
                            </p>

                            <h3>Status Codes</h3>
                            <ul>
                                <li><code>200 OK</code> - The request was successful</li>
                                <li><code>201 Created</code> - A new resource was created successfully</li>
                                <li><code>204 No Content</code> - The request was successful but no content was returned
                                </li>
                                <li><code>400 Bad Request</code> - The request was invalid or malformed</li>
                                <li><code>401 Unauthorized</code> - Authentication failed or was not provided</li>
                                <li><code>403 Forbidden</code> - The authenticated user does not have permission to
                                    access the resource
                                </li>
                                <li><code>404 Not Found</code> - The requested resource was not found</li>
                                <li><code>429 Too Many Requests</code> - Rate limit exceeded</li>
                                <li><code>500 Internal Server Error</code> - An unexpected error occurred on the server
                                </li>
                            </ul>

                            <h3>Error Response Format</h3>
                            <p>
                                Error responses have a consistent format:
                            </p>
                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code className="text-sm font-mono">
{`{
  "error": "Error message describing the problem"
}`}
                </code>
              </pre>

                            <h3>Example Error Responses</h3>

                            <h4>401 Unauthorized</h4>
                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code className="text-sm font-mono">
{`{
  "error": "Authentication required"
}`}
                </code>
              </pre>

                            <h4>403 Forbidden</h4>
                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code className="text-sm font-mono">
{`{
  "error": "Access denied"
}`}
                </code>
              </pre>

                            <h4>404 Not Found</h4>
                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code className="text-sm font-mono">
{`{
  "error": "Recipe not found"
}`}
                </code>
              </pre>

                            <h4>429 Too Many Requests</h4>
                            <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code className="text-sm font-mono">
{`{
  "error": "Rate limit exceeded. Try again in X seconds"
}`}
                </code>
              </pre>
                        </div>
                    </section>
                </div>
            </div>

            <div className="container mx-auto mt-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to start building?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Get your API key now and start integrating delicious recipes into your application.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild>
                        <a href="/auth/register">Get Your API Key</a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/dashboard">Go to Dashboard</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
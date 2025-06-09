"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Copy,
  CheckCheck,
  ChevronRight,
  Key,
  Users,
  Book,
  Search,
  AlertTriangle,
} from "lucide-react";

export default function DocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpointId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpointId);
    setTimeout(() => setCopiedEndpoint(null), 2000);

    toast.success("Copied to clipboard! You can now paste this code into your project.", {
      icon: <CheckCheck className="h-4 w-4" />,
      duration: 2000,
      style: {
        backgroundColor: "#f0f4f8",
        color: "#333",
        borderRadius: "8px",
        padding: "12px",
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-screen-xl">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <Badge className="mb-4 text-sm px-3 py-1" variant="outline">
          Documentation
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-slate-50">
          Recipe API Documentation
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Complete reference guide to integrate with our Recipe API. Access thousands of recipes
          with simple REST endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar */}
        <div className="col-span-1 lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-8">
            <nav className="space-y-2">
              <p className="font-semibold mb-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ON THIS PAGE
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#introduction"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    Introduction
                  </a>
                </li>
                <li>
                  <a
                    href="#authentication"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    Authentication
                  </a>
                </li>
                <li>
                  <a
                    href="#users"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    User Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="#apikeys"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    API Key Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="#recipes"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    Recipe Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="#errors"
                    className="flex items-center text-sm text-slate-700 hover:text-primary transition-colors duration-200"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                    Error Handling
                  </a>
                </li>
              </ul>
            </nav>

            <Card className="p-5 bg-card border shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-50">
                  Need an API key?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Create an account to get started with your free API key
                </p>
                <Button asChild size="sm">
                  <a href="/dashboard" className="flex items-center">
                    Get API Key <Key className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-9 space-y-16">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <Book className="h-7 w-7 text-primary" />
              Introduction
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                The Recipe API provides programmatic access to a database of delicious recipes from
                around the world. With this API, you can retrieve recipes with detailed ingredients
                and cooking instructions, search for recipes by cuisine or keyword, and more.
              </p>
              <h3 className="text-xl font-semibold mt-8 mb-3">Base URL</h3>
              <code className="relative rounded bg-slate-100 dark:bg-slate-800 px-3 py-2 font-mono text-sm text-slate-700 dark:text-slate-300 block overflow-auto">
                https://github.com/stephenWanjala/brecipes-fastify.git
              </code>

              <h3 className="text-xl font-semibold mt-8 mb-3">Response Format</h3>
              <p>
                All API responses are returned in JSON format. Successful responses typically
                include the requested data, while error responses include an error message.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-3">Rate Limiting</h3>
              <p>
                The API implements rate limiting to ensure fair usage and service stability:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>100 requests per minute per IP address</li>
                <li>Applies to all recipe endpoints</li>
                <li>
                  When exceeded, the API returns a <code>429 Too Many Requests</code> response
                </li>
              </ul>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <Key className="h-7 w-7 text-primary" />
              Authentication
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                The Recipe API supports two authentication methods: API Keys and JWT tokens. Most
                endpoints require authentication using either method.
              </p>
            </div>

            <Tabs defaultValue="apikey" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <TabsTrigger
                  value="apikey"
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 dark:text-slate-300"
                >
                  API Key Authentication
                </TabsTrigger>
                <TabsTrigger
                  value="jwt"
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 dark:text-slate-300"
                >
                  JWT Authentication
                </TabsTrigger>
              </TabsList>
              <TabsContent value="apikey" className="mt-6 space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    API Key authentication is the simplest method for accessing the API. Include
                    your API key in each request&apos;s header:
                  </p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      X-API-Key: your-api-key-here
                    </code>
                  </pre>
                  <p>
                    You can obtain your API key by{" "}
                    <a href="/dashboard" className="text-primary hover:underline">
                      registering
                    </a>{" "}
                    for an account.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                    Example Request with API Key
                  </h4>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      curl -X GET &apos;https://brecipes-fastify.onrender.com/api/recipes&apos; \<br />
                      &nbsp;&nbsp;-H &apos;X-API-Key: your-api-key-here&apos; \<br />
                      &nbsp;&nbsp;-H &apos;Content-Type: application/json&apos;
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      onClick={() =>
                        copyToClipboard(
                          `curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes' \\
  -H 'X-API-Key: your-api-key-here' \\
  -H 'Content-Type: application/json'`,
                          "api-key-example",
                        )
                      }
                    >
                      {copiedEndpoint === "api-key-example" ? (
                        <CheckCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="jwt" className="mt-6 space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    JWT (JSON Web Token) authentication is used for more secure operations,
                    especially admin-related endpoints. JWT tokens are obtained when logging in or
                    registering.
                  </p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      Authorization: Bearer your-jwt-token
                    </code>
                  </pre>
                </div>

                <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                    Example Request with JWT Token
                  </h4>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      curl -X POST &apos;https://brecipes-fastify.onrender.com/api/recipes&apos; \
                      <br />
                      &nbsp;&nbsp;-H &apos;Authorization: Bearer
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&apos; \<br />
                      &nbsp;&nbsp;-H &apos;Content-Type: application/json&apos; \<br />
                      &nbsp;&nbsp;-d &apos;&amp;lbrace;&quot;title&quot;: &quot;Pasta Carbonara&quot;,
                      &quot;description&quot;: &quot;Classic Italian pasta
                      dish&quot;...&amp;rbrace;&apos;
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      onClick={() =>
                        copyToClipboard(
                          `curl -X POST 'https://brecipes-fastify.onrender.com/api/recipes' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'Content-Type: application/json' \\
  -d '{"title": "Pasta Carbonara", "description": "Classic Italian pasta dish"...}'`,
                          "jwt-example",
                        )
                      }
                    >
                      {copiedEndpoint === "jwt-example" ? (
                        <CheckCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* User Endpoints */}
          <section id="users" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <Users className="h-7 w-7 text-primary" />
              User Endpoints
            </h2>

            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="register" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        POST
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/users/register
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        Public
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Register a new user and get an API key.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Request Body</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"  // Optional, defaults to "USER"
}`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}`}
                        </code>
                      </pre>
                    </div>

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X POST 'https://brecipes-fastify.onrender.com/api/users/register' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X POST 'https://brecipes-fastify.onrender.com/api/users/register' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
                              "register-example",
                            )
                          }
                        >
                          {copiedEndpoint === "register-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="login" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        POST
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/users/login
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        Public
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Login with email and password to retrieve JWT token and API key.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Request Body</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "email": "user@example.com",
  "password": "password123"
}`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}`}
                        </code>
                      </pre>
                    </div>

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X POST 'https://brecipes-fastify.onrender.com/api/users/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X POST 'https://brecipes-fastify.onrender.com/api/users/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
                              "login-example",
                            )
                          }
                        >
                          {copiedEndpoint === "login-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="users-all" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/users/all
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        Admin Only
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        Get all registered users. This endpoint is restricted to admin users only.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Headers</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/users/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/users/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                              "users-all-example",
                            )
                          }
                        >
                          {copiedEndpoint === "users-all-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
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
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <Key className="h-7 w-7 text-primary" />
              API Key Endpoints
            </h2>

            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="apikey-current" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/apikey/current
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        JWT Auth
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Retrieve the current user&apos;s API key.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Headers</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "apiKey": "api-key"
}`}
                        </code>
                      </pre>
                    </div>

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/apikey/current' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/apikey/current' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                              "apikey-current-example",
                            )
                          }
                        >
                          {copiedEndpoint === "apikey-current-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="apikey-regenerate"
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        POST
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/apikey/regenerate
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        JWT Auth
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        Generate a new API key for the current user. This will invalidate the
                        existing API key.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Headers</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`{
  "apiKey": "new-api-key"
}`}
                        </code>
                      </pre>
                    </div>

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X POST 'https://brecipes-fastify.onrender.com/api/apikey/regenerate' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X POST 'https://brecipes-fastify.onrender.com/api/apikey/regenerate' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                              "apikey-regenerate-example",
                            )
                          }
                        >
                          {copiedEndpoint === "apikey-regenerate-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="apikey-all" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/apikey/all
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        Admin Only
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        List all API keys in the system. This endpoint is restricted to admin users
                        only.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Headers</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/apikey/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/apikey/all' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
                              "apikey-all-example",
                            )
                          }
                        >
                          {copiedEndpoint === "apikey-all-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
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
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <Search className="h-7 w-7 text-primary" />
              Recipe Endpoints
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                All recipe endpoints require authentication using either an API key or a JWT token.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>API Key:</strong> Include the <code>X-API-Key</code> header with your API
                  key.
                </li>
                <li>
                  <strong>JWT Token:</strong> Include the <code>Authorization</code> header with
                  your JWT token.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="recipes-get" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/recipes
                      </code>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Pagination
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Filtering
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Get paginated recipes with optional filters for cuisine and title.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Query Parameters</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <code>page</code> - Page number (default: 1)
                        </li>
                        <li>
                          <code>limit</code> - Results per page (default: 20)
                        </li>
                        <li>
                          <code>cuisine</code> - Filter recipes by cuisine
                        </li>
                        <li>
                          <code>title</code> - Filter recipes by title (case insensitive partial
                          match)
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes?cuisine=italian&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes?cuisine=italian&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`,
                              "recipes-get-example",
                            )
                          }
                        >
                          {copiedEndpoint === "recipes-get-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recipes-search" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/recipes/search
                      </code>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Search
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Pagination
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        Search recipes across multiple fields (title, description, cuisine, chef
                        name).
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Query Parameters</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <code>q</code> - Search query (required)
                        </li>
                        <li>
                          <code>page</code> - Page number (default: 1)
                        </li>
                        <li>
                          <code>limit</code> - Results per page (default: 20)
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <p>Same format as the GET /api/recipes endpoint.</p>
                    </div>

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/search?q=pasta&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/search?q=pasta&page=1&limit=10' \\
  -H 'X-API-Key: your-api-key-here'`,
                              "recipes-search-example",
                            )
                          }
                        >
                          {copiedEndpoint === "recipes-search-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="recipes-cuisines"
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/recipes/cuisines
                      </code>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Aggregation
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Get a list of available cuisines and recipe counts for each cuisine.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/cuisines' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/cuisines' \\
  -H 'X-API-Key: your-api-key-here'`,
                              "recipes-cuisines-example",
                            )
                          }
                        >
                          {copiedEndpoint === "recipes-cuisines-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recipes-id" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        GET
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/recipes/:id
                      </code>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Detail
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>Get a single recipe by its ID.</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Path Parameters</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <code>id</code> - Recipe ID
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/1' \\
  -H 'X-API-Key: your-api-key-here'`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X GET 'https://brecipes-fastify.onrender.com/api/recipes/1' \\
  -H 'X-API-Key: your-api-key-here'`,
                              "recipes-id-example",
                            )
                          }
                        >
                          {copiedEndpoint === "recipes-id-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recipes-create" className="border-b border-slate-200 dark:border-slate-700">
                  <AccordionTrigger className="hover:no-underline p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-600 text-white font-mono text-xs px-2 py-1 rounded-sm">
                        POST
                      </Badge>
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        /api/recipes
                      </code>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        Admin Only
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        Create
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        Create a new recipe. This endpoint is restricted to admin users only.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Headers</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`Authorization: Bearer <jwt-token>`}
                        </code>
                      </pre>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Request Body</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                      <h4 className="text-lg font-semibold mt-6 mb-3">Response</h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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

                    <div className="bg-card border rounded-lg p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="font-semibold text-base mb-3 text-slate-900 dark:text-slate-50">
                        Example Request
                      </h4>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto relative border border-slate-200 dark:border-slate-700">
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                          {`curl -X POST 'https://brecipes-fastify.onrender.com/api/recipes' \\
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
                          className="absolute top-2 right-2 h-8 w-8 rounded-md opacity-70 hover:opacity-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          onClick={() =>
                            copyToClipboard(
                              `curl -X POST 'https://brecipes-fastify.onrender.com/api/recipes' \\
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
                              "recipes-create-example",
                            )
                          }
                        >
                          {copiedEndpoint === "recipes-create-example" ? (
                            <CheckCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Trigger to show more (optional) */}
            {/* You could conditionally render more accordions here or link to another page for more endpoints */}
            <Button variant="outline" className="mt-8 px-6 py-3 text-sm" asChild>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Show more endpoints
              </a>
            </Button>
          </section>

          {/* Error Handling */}
          <section id="errors" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-50">
              <AlertTriangle className="h-7 w-7 text-primary" />
              Error Handling
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                The API uses standard HTTP status codes to indicate the success or failure of a
                request.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-3">Status Codes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <code>200 OK</code> - The request was successful
                </li>
                <li>
                  <code>201 Created</code> - A new resource was created successfully
                </li>
                <li>
                  <code>204 No Content</code> - The request was successful but no content was
                  returned
                </li>
                <li>
                  <code>400 Bad Request</code> - The request was invalid or malformed
                </li>
                <li>
                  <code>401 Unauthorized</code> - Authentication failed or was not provided
                </li>
                <li>
                  <code>403 Forbidden</code> - The authenticated user does not have permission to
                  access the resource
                </li>
                <li>
                  <code>404 Not Found</code> - The requested resource was not found
                </li>
                <li>
                  <code>429 Too Many Requests</code> - Rate limit exceeded
                </li>
                <li>
                  <code>500 Internal Server Error</code> - An unexpected error occurred on the
                  server
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-3">Error Response Format</h3>
              <p>Error responses have a consistent format:</p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {`{
  "error": "Error message describing the problem"
}`}
                </code>
              </pre>

              <h3 className="text-xl font-semibold mt-8 mb-3">Example Error Responses</h3>

              <h4 className="text-lg font-semibold mt-6 mb-3">401 Unauthorized</h4>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {`{
  "error": "Authentication required"
}`}
                </code>
              </pre>

              <h4 className="text-lg font-semibold mt-6 mb-3">403 Forbidden</h4>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {`{
  "error": "Access denied"
}`}
                </code>
              </pre>

              <h4 className="text-lg font-semibold mt-6 mb-3">404 Not Found</h4>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {`{
  "error": "Recipe not found"
}`}
                </code>
              </pre>

              <h4 className="text-lg font-semibold mt-6 mb-3">429 Too Many Requests</h4>
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto shadow-inner">
                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
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
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-50">
          Ready to start building?
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
          Get your API key now and start integrating delicious recipes into your application.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="px-8 py-4 text-base font-semibold">
            <a href="/auth/register">Get Your API Key</a>
          </Button>
          <Button variant="outline" asChild size="lg" className="px-8 py-4 text-base font-semibold">
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
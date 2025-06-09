"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"

const examples = {
  javascript: `// Using fetch API
const apiKey = 'YOUR_API_KEY';
const url = 'https://api.example.com/api/recipes?cuisine=italian&page=1&limit=10';

fetch(url, {
  method: 'GET',
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Recipes:', data.recipes);
  console.log('Pagination:', data.pagination);
})
.catch(error => console.error('Error:', error));`,

  python: `# Using requests library
import requests

api_key = 'YOUR_API_KEY'
url = 'https://api.example.com/api/recipes'
params = {'cuisine': 'italian', 'page': 1, 'limit': 10}

headers = {
    'X-API-Key': api_key,
    'Content-Type': 'application/json'
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print('Recipes:', data['recipes'])
print('Pagination:', data['pagination'])`,

  curl: `# Using curl
curl -X GET 'https://api.example.com/api/recipes?cuisine=italian&page=1&limit=10' \\
  -H 'X-API-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`,

  nodejs: `// Using Node.js with axios
const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const url = 'https://api.example.com/api/recipes';

axios.get(url, {
  params: {
    cuisine: 'italian',
    page: 1,
    limit: 10
  },
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Recipes:', response.data.recipes);
  console.log('Pagination:', response.data.pagination);
})
.catch(error => console.error('Error:', error));`
};

export default function CodeExample() {
  const [language, setLanguage] = useState('javascript');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(examples[language as keyof typeof examples]);
  
    toast.success("Example code has been copied to clipboard.");
  };

  return (
    <div className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Code Examples</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Start integrating in minutes
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
            Simple, straightforward code examples to help you get started with our API.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <Tabs 
              value={language} 
              onValueChange={setLanguage}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="nodejs">Node.js</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={copyToClipboard}
              className="ml-4"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          
          <div className="p-4 bg-muted overflow-auto">
            <pre className="font-mono text-sm text-foreground">
              <code>{examples[language as keyof typeof examples]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
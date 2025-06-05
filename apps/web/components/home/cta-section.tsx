import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FileText, Key } from 'lucide-react';

export default function CTA() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Create an account to get your API key and start integrating delicious recipes into your application today.
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 max-w-2xl mx-auto">
          <Link href="/auth/register">
            <Button 
              className="w-full flex items-center justify-center gap-2 py-6 text-lg" 
              size="lg"
            >
              <Key className="h-5 w-5" />
              Get API Key
            </Button>
          </Link>
          <Link href="/docs">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 py-6 text-lg"
              size="lg"
            >
              <FileText className="h-5 w-5" />
              Browse Documentation
            </Button>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link href="/explore" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            Explore Recipe API
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
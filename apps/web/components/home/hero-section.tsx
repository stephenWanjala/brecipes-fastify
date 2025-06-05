"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative bg-background">
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 z-0"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 
          className={`text-4xl md:text-6xl font-extrabold text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Recipe API
          <span className="block text-primary">Documentation & Portal</span>
        </h1>
        
        <p 
          className={`mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-3xl transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Access thousands of recipes with our powerful API. Explore endpoints, manage your API keys, and integrate delicious recipes into your applications.
        </p>
        
        <div 
          className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link href="/docs">
            <Button size="lg" className="font-medium px-8">
              Explore API
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <Link href="/auth/register">
            <Button variant="outline" size="lg" className="font-medium px-8">
              Get API Key
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
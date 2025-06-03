import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
              Explore API
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
          <div className="px-5 py-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RecipeAPI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
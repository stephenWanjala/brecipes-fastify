import { 
  Key, 
  Code, 
  Search, 
  Shield, 
  BookOpen, 
  Zap, 
  Clock, 
  BarChart 
} from 'lucide-react';

const features = [
  {
    name: 'API Key Authentication',
    description: 'Secure your requests with personalized API keys that are easy to generate and manage.',
    icon: Key,
  },
  {
    name: 'Interactive Docs',
    description: 'Explore API endpoints with interactive documentation and live examples.',
    icon: Code,
  },
  {
    name: 'Advanced Recipe Search',
    description: 'Find recipes by title, description, cuisine, chef name and more.',
    icon: Search,
  },
  {
    name: 'Role-Based Access',
    description: 'Different permission levels for users and admins with appropriate access controls.',
    icon: Shield,
  },
  {
    name: 'Comprehensive Documentation',
    description: 'Detailed guides, tutorials and examples to get you started quickly.',
    icon: BookOpen,
  },
  {
    name: 'Rate Limiting',
    description: 'Fair usage policies with transparent rate limits to ensure API availability.',
    icon: Zap,
  },
  {
    name: 'Real-Time Metrics',
    description: 'Monitor your API usage and performance in real-time with detailed analytics.',
    icon: BarChart,
  },
  {
    name: 'Fast Response Times',
    description: 'Optimized API performance with minimal latency for a smooth experience.',
    icon: Clock,
  },
];

export default function FeatureSection() {
  return (
    <div className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Everything you need to integrate recipes
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
            Our API provides powerful tools for accessing and managing recipe data with enterprise-grade security and performance.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="group relative bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border">
                <div>
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  
                  <div className="relative flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">{feature.name}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import HeroButton from "@/components/home/HeroButton";

export default function HeroSection() {
    return (
        <div className="relative bg-background overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 z-0"
                aria-hidden="true"
            />
            <div className="relative max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
                <h1
                    className="text-4xl text-center font-extrabold md:text-6xl opacity-0 fade-in-up delay-1"
                >
                    Recipe API
                    <span className="block text-primary">Documentation & Portal</span>
                </h1>

                <p
                    className="mt-6 max-w-3xl text-center text-lg text-muted-foreground md:text-xl opacity-0 fade-in-up delay-2"
                >
                    Access thousands of recipes with our powerful API. Explore endpoints,
                    manage your API keys, and integrate delicious recipes into your
                    applications.
                </p>

                <div
                    className="mt-10 flex flex-col gap-4 sm:flex-row opacity-0 fade-in-up delay-3"
                >
                    <Link href="/docs" aria-label="Explore API documentation">
                        <Button size="lg" className="px-8 font-medium">
                            Explore API
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>

                    <HeroButton text="Get API Key" route="/auth/register" />
                </div>
            </div>
        </div>
    );
}

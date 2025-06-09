"use client";

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useTheme} from 'next-themes';
import {Menu, Moon, Sun} from 'lucide-react';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {useAuth} from '@/context/auth-context';

const navigation = [
    {name: 'Home', href: '/'},
    {name: 'Documentation', href: '/docs'},
    {name: 'Explore API', href: '/explore'},
];

export default function Navbar() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const {user, logout} = useAuth();

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full transition-all duration-200",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 font-bold text-xl">
                            Recipe<span className="text-primary">API</span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle theme"
                            className="h-9 w-9 rounded-md"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-4 w-4"/>
                            ) : (
                                <Moon className="h-4 w-4"/>
                            )}
                        </Button>

                        {user ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                                <Button onClick={logout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button>Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <Link href="/" className="font-bold text-xl">
                                            Recipe<span className="text-primary">API</span>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        >
                                            {theme === 'dark' ? (
                                                <Sun className="h-4 w-4"/>
                                            ) : (
                                                <Moon className="h-4 w-4"/>
                                            )}
                                        </Button>
                                    </div>
                                    <div className="flex flex-col space-y-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                                    pathname === item.href
                                                        ? "text-primary bg-primary/5"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}

                                        <div className="pt-4 border-t space-y-4">
                                            {user ? (
                                                <>
                                                    <Link href="/dashboard" className="w-full">
                                                        <Button variant="outline" className="w-full">Dashboard</Button>
                                                    </Link>
                                                    <Button onClick={logout} className="w-full">Logout</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link href="/auth/login" className="w-full">
                                                        <Button variant="outline" className="w-full">Login</Button>
                                                    </Link>
                                                    <Link href="/auth/register" className="w-full">
                                                        <Button className="w-full">Sign up</Button>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sparkles, LayoutGrid, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Create', href: '/', icon: <Sparkles className="w-4 h-4 mr-2" /> },
        { name: 'Gallery', href: '/gallery', icon: <LayoutGrid className="w-4 h-4 mr-2" /> },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white fill-white/20" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                            Lumina AI
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                                    size="sm"
                                    className={cn(pathname === item.href && "bg-white/10 text-white")}
                                >
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        GPU Active
                    </div>
                    <Link href="/admin">
                        <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

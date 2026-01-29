'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Settings,
    Activity,
    Server,
    Sparkles,
    LogOut
} from 'lucide-react';

export function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'API Settings', href: '/admin/api-settings', icon: Settings },
        { name: 'Usage Stats', href: '/admin/usage-stats', icon: Activity },
        { name: 'System Health', href: '/admin/system-health', icon: Server },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold">Lumina Admin</span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/5">
                <Link href="/">
                    <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Exit to App
                    </button>
                </Link>
            </div>
        </aside>
    );
}

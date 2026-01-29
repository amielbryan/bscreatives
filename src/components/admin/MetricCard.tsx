import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    subValue?: string;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'primary' | 'secondary' | 'accent' | 'success';
}

export function MetricCard({ title, value, subValue, icon: Icon, trend, color = 'primary' }: MetricCardProps) {
    const colorMap = {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-emerald-500",
    };

    const bgMap = {
        primary: "bg-primary/10",
        secondary: "bg-secondary/10",
        accent: "bg-accent/10",
        success: "bg-emerald-500/10",
    };

    return (
        <Card className="glass border-white/5 hover:border-white/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", bgMap[color])}>
                    <Icon className={cn("h-4 w-4", colorMap[color])} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {subValue && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {subValue}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

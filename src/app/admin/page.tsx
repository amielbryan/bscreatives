import { MetricCard } from '@/components/admin/MetricCard';
import { ImageIcon, Zap, Clock, DollarSign } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your generation infrastructure.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-400 font-medium">System Operational</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Generated"
                    value="12,345"
                    subValue="+12% from last month"
                    icon={ImageIcon}
                    color="primary"
                />
                <MetricCard
                    title="GPU Time"
                    value="45h 12m"
                    subValue="Avg 8.2s per gen"
                    icon={Clock}
                    color="secondary"
                />
                <MetricCard
                    title="Active Requests"
                    value="24"
                    subValue="Current queue load"
                    icon={Zap}
                    color="accent"
                />
                <MetricCard
                    title="Est. Cost"
                    value="$432.12"
                    subValue="$0.004 per image"
                    icon={DollarSign}
                    color="success"
                />
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-white/5 bg-white/5 glass p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Allocations</h2>
                {/* Real data would map here, for now empty state */}
                <div className="text-muted-foreground text-sm">No recent activity</div>
            </div>

        </div>
    );
}

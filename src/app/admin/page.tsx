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

            {/* Recent Activity Mock */}
            <div className="rounded-xl border border-white/5 bg-white/5 glass p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Allocations</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">Generation Task #{1000 + i}</div>
                                    <div className="text-xs text-muted-foreground">Completed in 4.2s • Flux Model</div>
                                </div>
                            </div>
                            <div className="text-sm font-mono text-emerald-400">$0.002</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

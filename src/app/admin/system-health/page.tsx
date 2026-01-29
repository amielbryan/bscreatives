import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Server, Wifi, Database, Cpu } from 'lucide-react';

export default function SystemHealthPage() {
    const services = [
        { name: 'API Gateway', status: 'operational', icon: Wifi, uptime: '99.9%' },
        { name: 'GPU Cluster (East)', status: 'operational', icon: Cpu, uptime: '99.5%' },
        { name: 'GPU Cluster (West)', status: 'degraded', icon: Cpu, uptime: '89.2%' },
        { name: 'Image Database', status: 'operational', icon: Database, uptime: '100%' },
        { name: 'Auth Service', status: 'operational', icon: Server, uptime: '99.99%' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">System Health</h1>
                <p className="text-muted-foreground">Real-time infrastructure monitoring.</p>
            </div>

            <div className="grid gap-4">
                {services.map((service) => (
                    <Card key={service.name} className="glass">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-lg">{service.name}</div>
                                    <div className="text-sm text-muted-foreground">Uptime: {service.uptime}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {service.status === 'operational' ? (
                                    <Badge variant="success" className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Operational</Badge>
                                ) : (
                                    <Badge variant="destructive" className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20">Degraded</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

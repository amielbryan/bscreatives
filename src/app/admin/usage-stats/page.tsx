import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function UsageStatsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Usage Statistics</h1>
                <p className="text-muted-foreground">Analyze generation costs and performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Daily Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-end gap-2 pt-4">
                            {[40, 60, 45, 80, 55, 90, 65].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/50 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 px-2 py-1 rounded text-xs text-white">
                                        {h * 12} reqs
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader>
                        <CardTitle>GPU Load (Avg)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-end gap-2 pt-4">
                            {[30, 40, 35, 50, 45, 60, 55].map((h, i) => (
                                <div key={i} className="flex-1 bg-secondary/20 hover:bg-secondary/50 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

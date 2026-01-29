'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Shield } from 'lucide-react';

export default function ApiSettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">API Configuration</h1>
                <p className="text-muted-foreground">Manage your GPU providers and Model endpoints.</p>
            </div>

            <Card className="glass">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Provider Settings
                    </CardTitle>
                    <CardDescription>Configure the connection to your inference engine (e.g. RunPod, Replicate).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">API Endpoint</label>
                        <Input defaultValue="https://api.runpod.io/v2/sdxl-lightning/run" placeholder="https://api.provider.com/..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <Input type="password" defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx" />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-sm font-medium text-emerald-400">Connection Verified</span>
                        </div>
                        <Badge variant="success">Active</Badge>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="ghost">Reset</Button>
                        <Button>
                            <Check className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    const configs = await prisma.systemConfig.findMany();
    // Convert array to object
    const settings = configs.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settings);
}

export async function POST(request: Request) {
    const body = await request.json();
    const promises = Object.entries(body).map(([key, value]) => {
        return prisma.systemConfig.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) }
        });
    });

    await Promise.all(promises);
    return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const totalGenerated = await prisma.generation.count();
        const completed = await prisma.generation.count({ where: { status: 'COMPLETED' } });

        const aggregations = await prisma.generation.aggregate({
            _sum: {
                duration: true,
                cost: true,
            },
        });

        // Mock graph data for now, real aggregation by date would require raw query or more complex logic
        const graphData = [
            { name: 'Mon', value: 40 },
            { name: 'Tue', value: 60 },
            { name: 'Wed', value: 45 },
            { name: 'Thu', value: 80 },
            { name: 'Fri', value: 55 },
        ];

        return NextResponse.json({
            totalGenerated,
            successRate: totalGenerated > 0 ? (completed / totalGenerated) * 100 : 0,
            totalDuration: aggregations._sum.duration || 0,
            totalCost: aggregations._sum.cost || 0,
            graphData
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

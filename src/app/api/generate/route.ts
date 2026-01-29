import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { RunPodService } from '@/services/runpod';
import { StorageService } from '@/services/storage';
import { CostService } from '@/services/cost';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, style, model = 'flux' } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // 1. Create Pending Record
        const generation = await prisma.generation.create({
            data: {
                prompt,
                style,
                model,
                status: 'PENDING',
            },
        });

        try {
            // 2. Call RunPod (Mock or Real)
            const result = await RunPodService.generate({
                prompt,
                style,
                model,
            });

            // 3. Calculate Cost
            const cost = CostService.calculate(result.duration, model);

            // 4. Update Record (Success)
            const updated = await prisma.generation.update({
                where: { id: generation.id },
                data: {
                    status: 'COMPLETED',
                    imageUrl: result.imageUrl,
                    duration: result.duration,
                    cost,
                },
            });

            return NextResponse.json(updated);

        } catch (error: any) {
            console.error("Generation Error:", error);

            // Update Record (Failed)
            await prisma.generation.update({
                where: { id: generation.id },
                data: {
                    status: 'FAILED',
                    error: error.message || 'Unknown error',
                },
            });

            return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

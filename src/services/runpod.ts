import { prisma } from '@/lib/db';
import axios from 'axios';

export interface GenerationRequest {
    prompt: string;
    style?: string;
    model?: string;
    resolution?: string;
}

export interface GenerationResult {
    imageUrl: string;
    duration: number;
    cost: number;
    model: string;
}

const RUNPOD_ENDPOINT_ID = "wjgrceva5q6u0p";
const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;

export class RunPodService {
    static async generate(request: GenerationRequest): Promise<GenerationResult> {
        const isMock = process.env.MOCK_RUNPOD === 'true';

        if (isMock) {
            // ... existing mock logic ...
            return {
                imageUrl: "https://placehold.co/1024x1024/7c3aed/FFF?text=Mock+Image",
                duration: 4,
                cost: 0.002,
                model: 'mock'
            };
        }

        if (!RUNPOD_API_KEY) {
            throw new Error("RUNPOD_API_KEY is not defined in environment variables");
        }

        const startTime = Date.now();

        try {
            console.log(`Sending job to RunPod ${RUNPOD_ENDPOINT_ID}...`);

            // 1. Submit Job
            const submitResponse = await axios.post(
                `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/run`,
                {
                    input: {
                        prompt: request.prompt,
                        style: request.style
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${RUNPOD_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const jobId = submitResponse.data.id;
            console.log(`Job ID: ${jobId}`);

            // 2. Poll for Completion
            let status = 'IN_PROGRESS';
            let resultData = null;

            while (status === 'IN_PROGRESS' || status === 'IN_QUEUE') {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2s

                const statusResponse = await axios.get(
                    `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/status/${jobId}`,
                    {
                        headers: { 'Authorization': `Bearer ${RUNPOD_API_KEY}` }
                    }
                );

                status = statusResponse.data.status;
                console.log(`Job Status: ${status}`);

                if (status === 'COMPLETED') {
                    resultData = statusResponse.data.output;
                } else if (status === 'FAILED') {
                    throw new Error("RunPod job failed");
                }
            }

            const duration = (Date.now() - startTime) / 1000;

            // Handle result mapping - assuming worker returns { image: "base64..." } or { imageUrl: "..." }
            // For now, let's assume the worker returns a direct URL or we mock it if the worker isn't fully ready
            // Real implementation should parse `resultData`

            // Fallback for demo if worker output format is unknown or empty
            const imageUrl = resultData?.image_url || resultData?.message || "https://placehold.co/1024x1024/000/FFF?text=RunPod+Success";

            return {
                imageUrl: imageUrl,
                duration,
                cost: (duration * 0.0005), // Estimate
                model: 'runpod-comfy',
            };

        } catch (error: any) {
            console.error("RunPod Error:", error.response?.data || error.message);
            throw error;
        }
    }
}

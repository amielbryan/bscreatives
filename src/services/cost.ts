export class CostService {
    static calculate(durationSeconds: number, model: string): number {
        // Mock rates per second
        const rates: Record<string, number> = {
            'qwen': 0.0005,
            'sdxl': 0.0008,
            'flux': 0.0012,
            'default': 0.0005
        };

        const rate = rates[model] || rates['default'];

        // Add 20% margin
        return (durationSeconds * rate) * 1.2;
    }
}

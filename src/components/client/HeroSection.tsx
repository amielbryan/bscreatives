'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PromptInput } from './PromptInput';
import { StyleSelector } from './StyleSelector';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

export function HeroSection() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = async (prompt: string) => {
        setIsGenerating(true);
        setResult(null); // Reset previous result

        // Simulate generation delay
        setTimeout(() => {
            setIsGenerating(false);
            // For now, simple mock color block or placeholder url
            setResult('https://placehold.co/1024x1024/2a2a2a/FFF?text=Generated+Image');
        }, 4000); // 4 seconds mock time
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-5xl mx-auto space-y-6 mb-12"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-primary mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Next-Gen Flux Model Active
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                    Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-slow">Stunning</span> AI Art <br />
                    in Seconds.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Unleash your creativity with the world's most advanced AI image generator.
                    Prompt it, style it, create it.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full z-20 space-y-12"
            >
                <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

                <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
            </motion.div>

            {/* Generation Overlay / Result Display */}
            {isGenerating && (
                <div className="mt-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">AI</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground animate-pulse">Dreaming up your masterpiece...</p>
                    <p className="text-xs text-white/30 font-mono">Process: 4.2s / GPU: H100</p>
                </div>
            )}

            {result && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-md mx-auto"
                >
                    <div className="aspect-square bg-white/5 relative group">
                        {/* Placeholder for now */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white/20">
                            <img src={result} alt="Generated" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="glass" size="sm" className="w-full">Download</Button>
                        </div>
                    </div>
                </motion.div>
            )}

        </section>
    );
}

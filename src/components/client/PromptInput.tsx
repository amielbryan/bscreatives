'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptInputProps {
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
}

export function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
    const [prompt, setPrompt] = React.useState('');
    const maxLength = 250;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto relative group">
            {/* Gradient Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-70 blur group-hover:opacity-100 transition duration-500 group-focus-within:opacity-100 group-focus-within:blur-md" />

            <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-full p-2 border border-white/10 shadow-2xl transition-all"
            >
                <div className="pl-4 text-primary animate-pulse">
                    <Sparkles className="w-5 h-5" />
                </div>

                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value.slice(0, maxLength))}
                    placeholder="Describe your imagination... (e.g. A futuristic city on Mars)"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-400 px-4 py-3 text-lg font-medium"
                    disabled={isGenerating}
                />

                <div className="flex items-center gap-3 pr-2">
                    <span className="text-xs text-muted-foreground hidden sm:block font-mono">
                        {prompt.length}/{maxLength}
                    </span>

                    <Button
                        type="submit"
                        disabled={!prompt.trim() || isGenerating}
                        variant="primary"
                        className="rounded-full px-6 py-2 h-10 shadow-[0_0_15px_var(--primary-glow)]"
                    >
                        {isGenerating ? (
                            <span className="flex items-center">Generating...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Generate <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

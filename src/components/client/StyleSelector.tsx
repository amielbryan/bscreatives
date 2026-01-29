'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Palette, Zap, Image as ImageIcon, Box, Film, Smile } from 'lucide-react';

interface StyleOption {
    id: string;
    name: string;
    description: string;
    icon: any;
    gradient: string;
}

const styles: StyleOption[] = [
    { id: 'cinematic', name: 'Cinematic', description: 'High contrast, dramatic lighting', icon: Film, gradient: 'from-amber-500 to-red-600' },
    { id: 'cyberpunk', name: 'Cyberpunk', description: 'Neon lights, futuristic tech', icon: Zap, gradient: 'from-cyan-500 to-blue-600' },
    { id: 'anime', name: 'Anime', description: 'Japanese animation style', icon: Smile, gradient: 'from-pink-500 to-rose-500' },
    { id: '3d-render', name: '3D Render', description: 'Octane render, unreal engine', icon: Box, gradient: 'from-violet-500 to-purple-600' },
    { id: 'realistic', name: 'Realistic', description: 'Photo-realistic photography', icon: ImageIcon, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'oil-painting', name: 'Oil Painting', description: 'Classic artistic texture', icon: Palette, gradient: 'from-orange-400 to-yellow-500' },
];

interface StyleSelectorProps {
    selectedStyle: string;
    onSelect: (id: string) => void;
}

export function StyleSelector({ selectedStyle, onSelect }: StyleSelectorProps) {
    return (
        <div className="w-full max-w-5xl mx-auto py-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground uppercase tracking-widest text-xs">Choose a Style</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {styles.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    const Icon = style.icon;

                    return (
                        <motion.div
                            key={style.id}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(style.id)}
                            className={cn(
                                "cursor-pointer relative overflow-hidden rounded-xl p-4 aspect-[4/5] flex flex-col justify-end transition-all border",
                                isSelected
                                    ? "border-primary shadow-[0_0_20px_rgba(124,58,237,0.3)] bg-black/60"
                                    : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-b opacity-20",
                                style.gradient
                            )} />

                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center mb-auto text-white",
                                !isSelected && "opacity-70",
                                isSelected ? "bg-primary" : "bg-white/10"
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>

                            <div className="relative z-10">
                                <div className="font-bold text-sm text-white">{style.name}</div>
                                <div className="text-[10px] text-gray-400 leading-tight mt-1">{style.description}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

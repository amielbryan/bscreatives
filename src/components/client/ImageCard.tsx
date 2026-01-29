'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GeneratedImage } from '@/lib/mock-data';

export function ImageCard({ image }: { image: GeneratedImage }) {
    return (
        <div className="group relative break-inside-avoid mb-6 rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-300">
            <div className="relative aspect-square w-full">
                <Image
                    src={image.url}
                    alt={image.prompt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium line-clamp-2 mb-2">{image.prompt}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button size="icon" variant="glass" className="h-8 w-8 rounded-full">
                            <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="glass" className="h-8 w-8 rounded-full">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                    <span className="text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded-md border border-white/10">
                        {image.style}
                    </span>
                </div>
            </div>
        </div>
    );
}

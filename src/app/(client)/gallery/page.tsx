import { MOCK_IMAGES } from '@/lib/mock-data';
import { ImageCard } from '@/components/client/ImageCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function GalleryPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Community Gallery</h1>
                    <p className="text-muted-foreground">Explore stunning creations from the community.</p>
                </div>

                <div className="w-full md:w-auto relative max-w-md">
                    <Input
                        placeholder="Search prompts..."
                        className="w-full md:w-80 pl-10 bg-white/5 border-white/10"
                        icon={<Search className="w-4 h-4" />}
                    />
                </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {MOCK_IMAGES.map((image) => (
                    <ImageCard key={image.id} image={image} />
                ))}
                {MOCK_IMAGES.map((image) => (
                    <ImageCard key={`${image.id}-copy`} image={{ ...image, id: `${image.id}-copy` }} />
                ))}
            </div>
        </div>
    );
}

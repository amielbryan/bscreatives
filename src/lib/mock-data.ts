export interface GeneratedImage {
    id: string;
    prompt: string;
    style: string;
    url: string;
    createdAt: string;
    width: number;
    height: number;
    likes: number;
    author: string;
}

export const MOCK_IMAGES: GeneratedImage[] = [
    {
        id: '1',
        prompt: 'A futuristic city on Mars at sunset, neon lights, dust storm',
        style: 'Cyberpunk',
        url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
        createdAt: '2023-10-27T10:00:00Z',
        width: 1024,
        height: 1024,
        likes: 124,
        author: 'Admin',
    },
    {
        id: '2',
        prompt: 'Portrait of a cyborg geisha, intricate details, 8k render',
        style: 'Anime',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        createdAt: '2023-10-26T15:30:00Z',
        width: 1024,
        height: 1024,
        likes: 89,
        author: 'User123',
    },
    {
        id: '3',
        prompt: 'Abstract geometric shapes floating in void, iridescent',
        style: '3D Render',
        url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
        createdAt: '2023-10-25T09:12:00Z',
        width: 1920,
        height: 1080,
        likes: 245,
        author: 'ArtistX',
    },
    {
        id: '4',
        prompt: 'Retro wave synthwave sunset, ferrari testarossa',
        style: 'Retro',
        url: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=800&q=80',
        createdAt: '2023-10-24T18:20:00Z',
        width: 1024,
        height: 1024,
        likes: 56,
        author: 'NeonRider',
    },
    {
        id: '5',
        prompt: 'Oil painting of a cottage in the woods, cozy atmosphere',
        style: 'Oil Painting',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?w=800&q=80',
        createdAt: '2023-10-24T12:00:00Z',
        width: 1024,
        height: 1024,
        likes: 312,
        author: 'NatureLover',
    },
    {
        id: '6',
        prompt: 'Astronaut riding a horse in heavy metal style',
        style: 'Cinematic',
        url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
        createdAt: '2023-10-23T11:11:00Z',
        width: 1024,
        height: 1024,
        likes: 420,
        author: 'SpaceCowboy',
    },
];

export async function generateImageFake(prompt: string, style: string): Promise<GeneratedImage> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Math.random().toString(36).substring(7),
                prompt,
                style,
                url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80', // Placeholder result
                createdAt: new Date().toISOString(),
                width: 1024,
                height: 1024,
                likes: 0,
                author: 'You',
            });
        }, 3000);
    });
}

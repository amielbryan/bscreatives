import { Header } from '@/components/layout/Header';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-16">
                {children}
            </main>
        </div>
    );
}

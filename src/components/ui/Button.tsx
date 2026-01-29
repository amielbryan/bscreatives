import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Since we didn't install class-variance-authority yet, I'll install it or just write standard props.
// Let's use standard props for now to save a step if I missed that package, but actually CVA is standard.
// I will just write it without CVA for now to strictly follow "no unapproved packages" rule 
// OR I can quickly install it. The user didn't forbid it.
// Actually, I'll write it with manual variants to be fast and dependency-free for this small app.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:shadow-[0_0_20px_var(--primary)] hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            glass: "glass text-foreground hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] border-white/5",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-6 py-2",
            lg: "h-12 px-8 text-lg",
            icon: "h-10 w-10 p-0",
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };

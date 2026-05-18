import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-vanta-blue text-white hover:bg-vanta-blue/90 shadow-[0_0_20px_rgba(59,130,246,0.2)]',
      secondary: 'bg-vanta-bg-tertiary text-vanta-text-primary hover:bg-vanta-bg-tertiary/80 border border-vanta-border',
      outline: 'bg-transparent border border-vanta-border text-vanta-text-primary hover:bg-vanta-bg-secondary',
      danger: 'bg-vanta-crimson text-white hover:bg-vanta-crimson/90 shadow-[0_0_20px_rgba(220,38,38,0.2)]',
      ghost: 'bg-transparent text-vanta-text-secondary hover:text-vanta-text-primary hover:bg-vanta-bg-secondary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5',
      lg: 'px-8 py-4 text-lg font-bold',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-vanta-bg-secondary border border-vanta-border rounded-xl overflow-hidden shadow-2xl transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'danger' | 'warning' | 'success' | 'blue', children: React.ReactNode }) {
  const variants = {
    default: 'bg-vanta-bg-tertiary text-vanta-text-secondary',
    danger: 'bg-vanta-crimson/20 text-vanta-crimson border border-vanta-crimson/30',
    warning: 'bg-vanta-amber/20 text-vanta-amber border border-vanta-amber/30',
    success: 'bg-vanta-green/20 text-vanta-green border border-vanta-green/30',
    blue: 'bg-vanta-blue/20 text-vanta-blue border border-vanta-blue/30',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
}

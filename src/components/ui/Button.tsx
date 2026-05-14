import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const variants = {
    primary: 'bg-gold text-charcoal hover:bg-white transition-colors duration-500',
    outline: 'border border-gold/30 text-gold hover:border-gold transition-colors duration-500',
    ghost: 'text-white/60 hover:text-white transition-colors duration-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] tracking-widest',
    md: 'px-8 py-3 text-[11px] tracking-[0.2em]',
    lg: 'px-12 py-4 text-[12px] tracking-[0.3em]',
  };

  return (
    <button
      className={cn(
        'uppercase font-sans font-medium inline-flex items-center justify-center',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

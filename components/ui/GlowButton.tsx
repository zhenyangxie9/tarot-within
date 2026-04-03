'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'arcane' | 'oracle' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
}

const variantStyles = {
  arcane:
    'bg-arcane/20 border-arcane/50 text-arcane-light hover:bg-arcane/30 hover:border-arcane shadow-glow-arcane',
  oracle:
    'bg-oracle/20 border-oracle/50 text-oracle-light hover:bg-oracle/30 hover:border-oracle shadow-glow-oracle',
  ghost:
    'bg-transparent border-white/20 text-white/60 hover:bg-white/5 hover:border-white/40 hover:text-white/80',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-4 text-lg tracking-widest',
};

export default function GlowButton({
  children,
  onClick,
  disabled = false,
  variant = 'arcane',
  size = 'md',
  className,
  type = 'button',
}: GlowButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        'relative border rounded-sm font-sans font-light tracking-wider',
        'transition-all duration-300 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

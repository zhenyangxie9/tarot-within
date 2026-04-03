'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryPill({ label, isSelected, onClick }: CategoryPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'px-4 py-2 text-sm font-sans font-light tracking-wider border rounded-sm',
        'transition-all duration-300 cursor-pointer',
        isSelected
          ? 'bg-arcane/25 border-arcane/70 text-arcane-light shadow-glow-arcane'
          : 'bg-void-700/50 border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
      )}
    >
      {label}
    </motion.button>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import { SPREAD_CONFIGS } from '@/lib/tarot/spreads';
import GlowButton from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils/cn';
import type { SpreadType } from '@/types';

const SPREADS: SpreadType[] = ['single', 'three'];

function SpreadCard({
  type,
  isSelected,
  onSelect,
}: {
  type: SpreadType;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const config = SPREAD_CONFIGS[type];

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative p-6 border rounded-sm cursor-pointer',
        'transition-all duration-300 flex flex-col gap-4',
        isSelected
          ? 'bg-arcane/15 border-arcane/60 shadow-glow-arcane'
          : 'bg-void-800/50 border-white/10 hover:border-white/25'
      )}
    >
      {/* Card illustration */}
      <div className="flex justify-center gap-2 py-2">
        {Array.from({ length: config.cardCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-sm border',
              isSelected ? 'border-arcane/50 bg-arcane/10' : 'border-white/20 bg-void-700/60'
            )}
            style={{
              width: '32px',
              height: '56px',
              boxShadow: isSelected ? '0 0 12px rgba(124,111,224,0.3)' : undefined,
            }}
          />
        ))}
      </div>

      <div className="space-y-1 text-center">
        <h3 className={cn(
          'font-serif text-xl font-light tracking-wide',
          isSelected ? 'text-arcane-light' : 'text-white/80'
        )}>
          {config.labelCN}
        </h3>
        {config.positions && (
          <p className="text-white/30 font-sans text-xs tracking-widest">
            {config.positions.map(p => p.label).join(' · ')}
          </p>
        )}
        <p className="text-white/40 font-sans font-light text-sm leading-relaxed pt-1">
          {config.description}
        </p>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-arcane"
        />
      )}
    </motion.div>
  );
}

export default function SpreadSelector() {
  const { spreadType, setSpread, goNextStep } = useReadingStore();

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-10 px-4">
      <div className="text-center space-y-3">
        <h2 className="font-serif text-3xl md:text-4xl text-white/90 font-light tracking-wide">
          选择一种牌阵
        </h2>
        <p className="text-white/35 font-sans font-light text-sm tracking-wider">
          牌阵决定了解读的维度与深度
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SPREADS.map((type) => (
          <SpreadCard
            key={type}
            type={type}
            isSelected={spreadType === type}
            onSelect={() => setSpread(type)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <GlowButton
          onClick={goNextStep}
          disabled={!spreadType}
          size="lg"
        >
          继续
        </GlowButton>
      </div>
    </div>
  );
}

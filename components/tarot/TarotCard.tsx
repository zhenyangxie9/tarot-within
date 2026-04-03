'use client';

import { motion } from 'framer-motion';
import type { TarotCardProps } from '@/types';
import CardSymbol from './CardSymbol';
import { cn } from '@/lib/utils/cn';

function CardBack() {
  return (
    <div className="card-back-pattern w-full h-full rounded-[3px] flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-3/4 h-3/4 opacity-40"
        style={{ filter: 'drop-shadow(0 0 6px rgba(168,154,240,0.5))' }}
      >
        <circle cx="50" cy="50" r="44" stroke="rgba(168,154,240,0.6)" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="32" stroke="rgba(168,154,240,0.4)" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="18" stroke="rgba(168,154,240,0.5)" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="2" fill="rgba(168,154,240,0.7)" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line key={i}
              x1={50 + 18 * Math.cos(angle)} y1={50 + 18 * Math.sin(angle)}
              x2={50 + 44 * Math.cos(angle)} y2={50 + 44 * Math.sin(angle)}
              stroke="rgba(168,154,240,0.25)" strokeWidth="0.5"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return (
            <circle key={i}
              cx={50 + 32 * Math.cos(angle)} cy={50 + 32 * Math.sin(angle)}
              r="1.5" fill="rgba(168,154,240,0.5)"
            />
          );
        })}
      </svg>
    </div>
  );
}

const sizeMap = {
  sm: { width: '80px', height: '140px' },
  md: { width: '110px', height: '192px' },
  lg: { width: '150px', height: '262px' },
};

export default function TarotCard({
  cardData,
  isReversed = false,
  isFlipped = false,
  isSelected = false,
  isHoverable = false,
  onClick,
  size = 'md',
}: TarotCardProps) {
  const { width, height } = sizeMap[size];
  const accentGlow = `var(--card-glow-${cardData.accentColor})`;

  return (
    <div className="card-perspective" style={{ width, height }}>
      <motion.div
        onClick={onClick}
        whileHover={
          isHoverable && !isSelected
            ? { y: -10, boxShadow: `0 0 36px 10px ${accentGlow}`, transition: { duration: 0.2 } }
            : {}
        }
        animate={{
          boxShadow: isSelected
            ? '0 0 0 1.5px rgba(168,154,240,0.8), 0 0 28px 8px rgba(168,154,240,0.4)'
            : 'none',
        }}
        className={cn('relative w-full h-full no-select', onClick && 'cursor-pointer')}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* ── Back face: rotates away when flipped ── */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 75, damping: 15 }}
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '4px', overflow: 'hidden',
          }}
        >
          <CardBack />
        </motion.div>

        {/* ── Front face: rotates in when flipped ── */}
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ type: 'spring', stiffness: 75, damping: 15 }}
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '4px', overflow: 'hidden',
            background: 'linear-gradient(160deg, #1a1228 0%, #12121a 60%, #1a1228 100%)',
            border: '1px solid rgba(124,111,224,0.2)',
          }}
        >
          {/*
            Inner wrapper rotates 180° for reversed cards.
            Kept separate from the Framer Motion rotateY on the outer div
            so the two transforms don't conflict.
          */}
          <div
            style={{
              width: '100%', height: '100%',
              transform: isReversed ? 'rotate(180deg)' : 'none',
            }}
          >
            <CardSymbol
              cardId={cardData.id}
              symbol={cardData.symbol}
              romanNumeral={cardData.romanNumeral}
              nameCN={cardData.nameCN}
              keywords={cardData.keywords}
              size={size}
            />
          </div>
          {isReversed && (
            <div className="absolute top-1 left-1 text-white/25 text-[8px] font-sans tracking-wider">
              逆
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

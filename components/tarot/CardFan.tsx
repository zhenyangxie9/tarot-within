'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TarotCardData } from '@/types';

interface CardFanProps {
  cards: TarotCardData[];
  selectedIds: Set<number>;
  onCardClick: (card: TarotCardData) => void;
  disabled?: boolean;
  isShuffling?: boolean;
}

// Card back SVG inline
function MiniCardBack({ glowing }: { glowing?: boolean }) {
  return (
    <svg viewBox="0 0 60 105" className="w-full h-full" style={{ display: 'block' }}>
      {/* Card border */}
      <rect
        x="1" y="1" width="58" height="103" rx="3"
        fill="url(#cardGrad)"
        stroke={glowing ? 'rgba(168,154,240,0.8)' : 'rgba(124,111,224,0.3)'}
        strokeWidth={glowing ? '1.5' : '0.8'}
      />
      {/* Background gradient */}
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1228" />
          <stop offset="50%" stopColor="#12121a" />
          <stop offset="100%" stopColor="#1a1228" />
        </linearGradient>
        {glowing && (
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      {/* Outer mandala circle */}
      <circle cx="30" cy="52" r="25" stroke="rgba(168,154,240,0.25)" strokeWidth="0.5" fill="none" />
      <circle cx="30" cy="52" r="17" stroke="rgba(168,154,240,0.2)" strokeWidth="0.5" fill="none" />
      <circle cx="30" cy="52" r="8" stroke="rgba(168,154,240,0.3)" strokeWidth="0.5" fill="none" />
      <circle cx="30" cy="52" r="2" fill={glowing ? 'rgba(168,154,240,0.9)' : 'rgba(168,154,240,0.5)'} />
      {/* Radial lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={30 + 8 * Math.cos(a)} y1={52 + 8 * Math.sin(a)}
            x2={30 + 25 * Math.cos(a)} y2={52 + 25 * Math.sin(a)}
            stroke="rgba(168,154,240,0.12)"
            strokeWidth="0.4"
          />
        );
      })}
      {/* 8 accent dots on middle circle */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={30 + 17 * Math.cos(a)} cy={52 + 17 * Math.sin(a)}
            r="1" fill={glowing ? 'rgba(168,154,240,0.7)' : 'rgba(168,154,240,0.3)'}
          />
        );
      })}
      {/* Top roman numeral style ornament */}
      <text x="30" y="14" textAnchor="middle" fontSize="7" fill="rgba(168,154,240,0.3)" fontFamily="Georgia,serif">✦</text>
      <text x="30" y="96" textAnchor="middle" fontSize="7" fill="rgba(168,154,240,0.3)" fontFamily="Georgia,serif">✦</text>
    </svg>
  );
}

export default function CardFan({
  cards,
  selectedIds,
  onCardClick,
  disabled,
  isShuffling,
}: CardFanProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const total = cards.length;

  return (
    <div
      className="relative flex items-end justify-center no-select"
      style={{ height: '220px', width: '100%', maxWidth: '900px', margin: '0 auto' }}
    >
      {cards.map((card, index) => {
        const isSelected = selectedIds.has(card.id);
        const isHovered = hoveredId === card.id;

        // Fan geometry
        const fanSpan = Math.min(total * 2.2, 170);
        const startAngle = -fanSpan / 2;
        const angleStep = total > 1 ? fanSpan / (total - 1) : 0;
        const angle = startAngle + index * angleStep;

        // Arc radius
        const radius = 420;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.sin(rad);
        const y = -radius * (1 - Math.cos(rad));

        // Hover lift: center cards lift more
        const centerBias = 1 - Math.abs(angle / (fanSpan / 2));
        const hoverLift = isHovered && !disabled && !isSelected ? -(22 + centerBias * 10) : 0;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{
              opacity: isSelected ? 0.25 : 1,
              x,
              y: isSelected ? y - 6 : y + hoverLift,
              rotate: isSelected ? angle * 0.5 : angle,
              scale: isSelected ? 0.88 : isHovered ? 1.08 : 1,
              filter: isHovered && !disabled && !isSelected
                ? 'drop-shadow(0 0 18px rgba(168,154,240,0.9)) drop-shadow(0 0 6px rgba(168,154,240,1))'
                : 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
            }}
            transition={
              isShuffling
                ? { type: 'spring', stiffness: 120, damping: 18, delay: index * 0.008 }
                : {
                    type: 'spring',
                    stiffness: 55,
                    damping: 12,
                    delay: index * 0.01,
                    opacity: { duration: 0.4, delay: index * 0.012 },
                  }
            }
            onHoverStart={() => !disabled && !isSelected && setHoveredId(card.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => {
              if (!disabled && !isSelected) {
                setHoveredId(null);
                onCardClick(card);
              }
            }}
            className="absolute bottom-0"
            style={{
              cursor: disabled || isSelected ? 'default' : 'pointer',
              zIndex: isHovered ? 100 : isSelected ? 0 : index,
              transformOrigin: '50% 100%',
              width: '52px',
              height: '91px',
            }}
          >
            <MiniCardBack glowing={isHovered && !disabled && !isSelected} />
          </motion.div>
        );
      })}
    </div>
  );
}

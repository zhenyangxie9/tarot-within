'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import CardFan from '@/components/tarot/CardFan';
import TarotCard from '@/components/tarot/TarotCard';
import type { TarotCardData, DrawnCard } from '@/types';
import { SPREAD_CONFIGS } from '@/lib/tarot/spreads';

const POSITION_LABELS = { past: '过去', present: '现在', future: '未来' } as const;

// ── Ritual circle ─────────────────────────────────────────────────────────────
function RitualCircle({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.25 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.svg
        viewBox="0 0 600 600" className="w-full h-full absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,111,224,0.07)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="275" stroke="rgba(124,111,224,0.09)" strokeWidth="0.8" fill="url(#rg)" />
        <circle cx="300" cy="300" r="235" stroke="rgba(124,111,224,0.06)" strokeWidth="0.5" fill="none" />
        <circle cx="300" cy="300" r="195" stroke="rgba(124,111,224,0.11)" strokeWidth="0.5" fill="none" strokeDasharray="5 9" />
        <circle cx="300" cy="300" r="155" stroke="rgba(124,111,224,0.07)" strokeWidth="0.5" fill="none" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <g key={i}>
              <line x1={300 + 155 * Math.cos(a)} y1={300 + 155 * Math.sin(a)}
                x2={300 + 275 * Math.cos(a)} y2={300 + 275 * Math.sin(a)}
                stroke="rgba(124,111,224,0.05)" strokeWidth="0.6" />
              <circle cx={300 + 275 * Math.cos(a)} cy={300 + 275 * Math.sin(a)}
                r="3.5" fill="rgba(124,111,224,0.14)" />
            </g>
          );
        })}
        {Array.from({ length: 6 }, (_, i) => {
          const a1 = (i * 60 * Math.PI) / 180;
          const a2 = ((i + 2) * 60 * Math.PI) / 180;
          return (
            <line key={i}
              x1={300 + 155 * Math.cos(a1)} y1={300 + 155 * Math.sin(a1)}
              x2={300 + 155 * Math.cos(a2)} y2={300 + 155 * Math.sin(a2)}
              stroke="rgba(124,111,224,0.06)" strokeWidth="0.5" />
          );
        })}
      </motion.svg>

      <motion.svg
        viewBox="0 0 600 600" className="w-full h-full absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="300" cy="300" r="115" stroke="rgba(212,175,122,0.06)" strokeWidth="0.5" fill="none" strokeDasharray="3 7" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return <circle key={i} cx={300 + 115 * Math.cos(a)} cy={300 + 115 * Math.sin(a)} r="2.5" fill="rgba(212,175,122,0.14)" />;
        })}
      </motion.svg>
    </motion.div>
  );
}

// ── Floating particles ────────────────────────────────────────────────────────
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 40 + Math.random() * 60,
      size: Math.random() * 2.2 + 0.8,
      dur: Math.random() * 9 + 7,
      delay: Math.random() * 6,
      drift: (Math.random() - 0.5) * 70,
    }))
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.current.map((p) => (
        <motion.div key={p.id}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.id % 4 === 0 ? 'rgba(212,175,122,0.75)' : 'rgba(168,154,240,0.75)',
          }}
          animate={{ y: [0, -50, -100], x: [0, p.drift * 0.5, p.drift], opacity: [0, 0.9, 0], scale: [0.4, 1, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ── Select ripple ─────────────────────────────────────────────────────────────
function SelectRipple({ trigger }: { trigger: number }) {
  return (
    <AnimatePresence>
      {trigger > 0 && (
        <motion.div key={trigger}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div key={i}
              className="absolute rounded-full border border-arcane/50"
              initial={{ width: 16, height: 16, opacity: 1 }}
              animate={{ width: 220 + i * 90, height: 220 + i * 90, opacity: 0 }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Shuffle overlay ───────────────────────────────────────────────────────────
function ShuffleOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 0] }}
      transition={{ duration: 1.9, times: [0, 0.2, 0.7, 1] }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center z-30"
    >
      <motion.span
        animate={{ rotate: [0, 180, 360], scale: [0.7, 1.3, 0.7] }}
        transition={{ duration: 1.9, ease: 'easeInOut' }}
        className="text-6xl"
        style={{
          fontFamily: 'var(--font-cormorant)',
          color: 'rgba(168,154,240,0.8)',
          filter: 'drop-shadow(0 0 24px rgba(124,111,224,0.9))',
        }}
      >
        ✦
      </motion.span>
    </motion.div>
  );
}

// ── Shuffle button ────────────────────────────────────────────────────────────
function ShuffleButton({ onShuffle, disabled }: { onShuffle: () => void; disabled: boolean }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 800);
    onShuffle();
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm
                 text-white/30 font-sans font-light text-xs tracking-[0.2em] uppercase
                 hover:border-arcane/40 hover:text-arcane-light/60
                 disabled:opacity-20 disabled:cursor-not-allowed
                 transition-colors duration-300"
    >
      <motion.span
        animate={{ rotate: spinning ? 360 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ display: 'inline-block', fontSize: '14px' }}
      >
        ↺
      </motion.span>
      重新洗牌
    </motion.button>
  );
}

// ── Selected cards preview area ───────────────────────────────────────────────
function SelectedCardsPreview({
  drawnCards,
  flippedIds,
}: {
  drawnCards: DrawnCard[];
  flippedIds: Set<number>;
}) {
  if (drawnCards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex gap-5 md:gap-8 justify-center items-end flex-wrap"
    >
      {drawnCards.map((drawn, i) => (
        <motion.div
          key={drawn.cardData.id}
          initial={{ opacity: 0, y: -20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 14, delay: i * 0.08 }}
          className="flex flex-col items-center gap-2"
        >
          {drawn.position && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="text-white/30 font-sans font-light text-[10px] tracking-[0.3em] uppercase"
            >
              {POSITION_LABELS[drawn.position]}
            </motion.span>
          )}

          {/* Card with flip reveal */}
          <motion.div
            animate={
              flippedIds.has(drawn.cardData.id)
                ? {
                    filter: `drop-shadow(0 0 16px var(--card-glow-${drawn.cardData.accentColor}))`,
                  }
                : { filter: 'none' }
            }
            transition={{ duration: 0.6 }}
          >
            <TarotCard
              cardData={drawn.cardData}
              isReversed={drawn.isReversed}
              isFlipped={flippedIds.has(drawn.cardData.id)}
              size="sm"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: flippedIds.has(drawn.cardData.id) ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-serif text-sm text-white/60 font-light tracking-wide"
          >
            {drawn.cardData.nameCN}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main DrawArea ─────────────────────────────────────────────────────────────
export default function DrawArea() {
  const {
    deck, drawnCards, spreadType, isShuffling,
    drawCard, initializeDeck, reshuffleDeck,
  } = useReadingStore();

  const required = spreadType ? SPREAD_CONFIGS[spreadType].cardCount : 1;
  const selectedIds = new Set(drawnCards.map((c) => c.cardData.id));
  const remaining = required - drawnCards.length;
  const isDone = remaining === 0;

  const [rippleTrigger, setRippleTrigger] = useState(0);
  const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (deck.length === 0) initializeDeck();
  }, [deck.length, initializeDeck]);

  // Flip each newly drawn card after a short delay
  useEffect(() => {
    drawnCards.forEach((card) => {
      if (!flippedIds.has(card.cardData.id)) {
        setTimeout(() => {
          setFlippedIds((prev) => new Set(Array.from(prev).concat(card.cardData.id)));
        }, 480);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawnCards.length]);

  // Reset flipped IDs when reshuffled
  useEffect(() => {
    if (drawnCards.length === 0) setFlippedIds(new Set());
  }, [drawnCards.length]);

  const handleCardClick = (card: TarotCardData) => {
    if (drawnCards.length < required) {
      drawCard(card);
      setRippleTrigger((n) => n + 1);
    }
  };

  return (
    <div
      className="relative w-full flex flex-col items-center gap-5"
      style={{ minHeight: '560px' }}
    >
      {/* Ritual circle backdrop */}
      <div
        className="pointer-events-none absolute flex items-center justify-center"
        style={{ inset: 0, top: '80px' }}
      >
        <div style={{ width: '600px', height: '600px', position: 'relative' }}>
          <RitualCircle active={!isShuffling && !isDone} />
        </div>
      </div>

      <FloatingParticles />
      <SelectRipple trigger={rippleTrigger} />
      <AnimatePresence>{isShuffling && <ShuffleOverlay />}</AnimatePresence>

      {/* Status header */}
      <div className="relative z-10 text-center pt-2" style={{ minHeight: '68px' }}>
        <AnimatePresence mode="wait">
          {isShuffling ? (
            <motion.div key="shuffling"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-white/55 font-light tracking-[0.12em]">
                宇宙正在洗牌…
              </h2>
              <p className="text-white/22 font-sans text-xs tracking-[0.22em] uppercase">
                深呼吸，调整你的意念
              </p>
            </motion.div>
          ) : isDone ? (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <h2
                className="font-serif text-2xl md:text-3xl font-light tracking-[0.12em] text-glow-arcane"
                style={{ color: 'rgba(168,154,240,0.95)' }}
              >
                命运已显现
              </h2>
              <p className="text-white/28 font-sans text-xs tracking-[0.22em] uppercase">
                正在解读星象与牌义…
              </p>
            </motion.div>
          ) : (
            <motion.div key={`step-${drawnCards.length}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-white/78 font-light tracking-[0.12em]">
                {remaining === required ? '感受内心的共鸣，选择你的牌' : `还需选择 ${remaining} 张`}
              </h2>
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: required }, (_, i) => (
                  <motion.div key={i}
                    animate={{
                      backgroundColor: i < drawnCards.length ? 'rgba(168,154,240,1)' : 'rgba(74,64,128,0.4)',
                      scale: i === drawnCards.length ? [1, 1.4, 1] : 1,
                    }}
                    transition={{
                      scale: { duration: 0.7, repeat: i === drawnCards.length ? Infinity : 0, ease: 'easeInOut' },
                    }}
                    className="w-1.5 h-1.5 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected cards preview with flip reveal */}
      <SelectedCardsPreview drawnCards={drawnCards} flippedIds={flippedIds} />

      {/* Card fan */}
      <div className="relative z-10 w-full">
        {deck.length > 0 && (
          <CardFan
            cards={deck}
            selectedIds={selectedIds}
            onCardClick={handleCardClick}
            disabled={isShuffling || isDone}
            isShuffling={isShuffling}
          />
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex flex-col items-center gap-3 mt-1">
        {!isDone && (
          <ShuffleButton
            onShuffle={reshuffleDeck}
            disabled={isShuffling}
          />
        )}
        {!isShuffling && !isDone && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.32 }} transition={{ delay: 2, duration: 1 }}
            className="text-white/35 font-sans font-light text-xs tracking-[0.25em] uppercase"
          >
            悬停感受 · 点击选择
          </motion.p>
        )}
      </div>
    </div>
  );
}

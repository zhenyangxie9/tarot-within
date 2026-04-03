'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import TarotCard from '@/components/tarot/TarotCard';
import GlowButton from '@/components/ui/GlowButton';
import { useRouter } from 'next/navigation';

const POSITION_LABELS = { past: '过去', present: '现在', future: '未来' };

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="text-4xl text-arcane/60"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        ✦
      </motion.div>
      <p className="text-white/40 font-sans font-light text-sm tracking-widest">
        正在解读星象与牌义…
      </p>
    </div>
  );
}

export default function ReadingResult() {
  const { drawnCards, readingOutput, isGenerating, resetSession } = useReadingStore();
  const router = useRouter();
  const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set());

  // Stagger flip the drawn cards on mount
  useEffect(() => {
    drawnCards.forEach((card, i) => {
      setTimeout(() => {
        setFlippedIds((prev) => new Set(Array.from(prev).concat(card.cardData.id)));
      }, i * 400 + 300);
    });
  }, [drawnCards]);

  const handleReset = () => {
    resetSession();
    router.push('/');
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-12 px-4 py-8">
      {/* Drawn cards */}
      <div className="flex flex-col items-center gap-6">
        <div className={`flex gap-6 justify-center ${drawnCards.length === 3 ? 'flex-row' : ''}`}>
          {drawnCards.map((drawn) => (
            <div key={drawn.cardData.id} className="flex flex-col items-center gap-3">
              {drawn.position && (
                <span className="text-white/30 font-sans font-light text-xs tracking-widest uppercase">
                  {POSITION_LABELS[drawn.position]}
                </span>
              )}
              <TarotCard
                cardData={drawn.cardData}
                isReversed={drawn.isReversed}
                isFlipped={flippedIds.has(drawn.cardData.id)}
                size={drawnCards.length === 3 ? 'md' : 'lg'}
              />
              <div className="text-center space-y-1">
                <p className="font-serif text-base text-white/70 font-light tracking-wide">
                  {drawn.cardData.nameCN}
                </p>
                <p className="text-white/25 font-sans text-xs">
                  {drawn.isReversed ? '逆位' : '正位'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-arcane/30" />
        <span className="text-arcane/50 text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-arcane/30" />
      </div>

      {/* Reading output */}
      {isGenerating ? (
        <LoadingState />
      ) : readingOutput ? (
        <div className="flex flex-col gap-10">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-white/25 font-sans font-light text-xs tracking-widest uppercase">
              牌面总述
            </p>
            <p className="font-serif text-xl text-white/85 font-light leading-relaxed tracking-wide">
              {readingOutput.summary}
            </p>
          </motion.div>

          {/* Contextual interpretation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-white/25 font-sans font-light text-xs tracking-widest uppercase">
              情境解读
            </p>
            <p className="font-sans font-light text-base text-white/65 leading-relaxed">
              {readingOutput.contextualInterpretation}
            </p>
          </motion.div>

          {/* Advice */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-white/25 font-sans font-light text-xs tracking-widest uppercase">
              建议
            </p>
            <div className="border-l border-arcane/40 pl-5">
              <p className="font-serif text-lg text-arcane-light font-light leading-relaxed tracking-wide">
                {readingOutput.advice}
              </p>
            </div>
          </motion.div>

          {/* Daily message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="py-8 text-center space-y-3"
          >
            <p className="text-oracle/50 font-sans font-light text-xs tracking-widest uppercase">
              今日讯息
            </p>
            <p
              className="font-serif text-2xl md:text-3xl text-oracle-light font-light italic leading-relaxed text-glow-oracle"
              style={{ lineHeight: 1.5 }}
            >
              {readingOutput.dailyMessage}
            </p>
          </motion.div>
        </div>
      ) : null}

      {/* Actions */}
      {!isGenerating && readingOutput && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pt-4"
        >
          <GlowButton onClick={handleReset} variant="ghost" size="md">
            再来一次
          </GlowButton>
        </motion.div>
      )}
    </div>
  );
}

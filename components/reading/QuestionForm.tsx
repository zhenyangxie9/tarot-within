'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import GlowButton from '@/components/ui/GlowButton';
import CategoryPill from '@/components/ui/CategoryPill';
import type { QuestionCategory } from '@/types';
import { CATEGORY_LABELS } from '@/types';

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [QuestionCategory, string][];

export default function QuestionForm() {
  const { setQuestion, goNextStep } = useReadingStore();
  const [question, setLocalQuestion] = useState('');
  const [category, setCategory] = useState<QuestionCategory | null>(null);
  const [shakeInput, setShakeInput] = useState(false);

  const canContinue = question.trim().length >= 5 && category !== null;

  const handleContinue = () => {
    if (!canContinue) {
      if (question.trim().length < 5) {
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 500);
      }
      return;
    }
    setQuestion(question.trim(), category!);
    goNextStep();
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-10 px-4">
      <div className="text-center space-y-3">
        <h2 className="font-serif text-3xl md:text-4xl text-white/90 font-light tracking-wide">
          此刻，你心中的问题是什么？
        </h2>
        <p className="text-white/35 font-sans font-light text-sm tracking-wider">
          将你真实的困惑或渴望写下来，塔罗将为此给出回应
        </p>
      </div>

      {/* Question input */}
      <motion.div
        animate={shakeInput ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setLocalQuestion(e.target.value)}
            placeholder="例如：我与这段关系的方向是什么？"
            rows={3}
            maxLength={200}
            className="
              w-full bg-void-800/60 border border-white/10 rounded-sm
              text-white/80 placeholder-white/20
              font-sans font-light text-base
              px-5 py-4 resize-none
              focus:outline-none focus:border-arcane/50
              transition-colors duration-300
              leading-relaxed tracking-wide
            "
            style={{
              boxShadow: shakeInput ? '0 0 0 1px rgba(248,113,113,0.6), 0 0 16px rgba(248,113,113,0.2)' : undefined,
            }}
          />
          <span className="absolute bottom-3 right-4 text-white/20 text-xs font-sans">
            {question.length}/200
          </span>
        </div>
      </motion.div>

      {/* Category selection */}
      <div className="space-y-4">
        <p className="text-white/35 font-sans font-light text-xs tracking-widest uppercase">
          选择问题类别
        </p>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map(([key, label]) => (
            <CategoryPill
              key={key}
              label={label}
              isSelected={category === key}
              onClick={() => setCategory(key)}
            />
          ))}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center pt-2">
        <GlowButton
          onClick={handleContinue}
          disabled={!canContinue}
          size="lg"
        >
          继续
        </GlowButton>
      </div>
    </div>
  );
}

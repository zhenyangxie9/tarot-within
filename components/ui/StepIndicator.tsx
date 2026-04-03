'use client';

import { motion } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import type { ReadingStep } from '@/types';

const STEPS: Array<{ key: ReadingStep; label: string }> = [
  { key: 'question', label: '问题' },
  { key: 'spread', label: '牌阵' },
  { key: 'draw', label: '抽牌' },
  { key: 'result', label: '解读' },
];

export default function StepIndicator() {
  const currentStep = useReadingStore((s) => s.currentStep);
  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-2 justify-center">
      {STEPS.map((step, idx) => {
        const isActive = idx === currentIdx;
        const isPast = idx < currentIdx;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive
                    ? 'rgba(168, 154, 240, 1)'
                    : isPast
                    ? 'rgba(124, 111, 224, 0.6)'
                    : 'rgba(74, 64, 128, 0.4)',
                }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 rounded-full"
              />
              <span
                className={`text-xs font-sans tracking-wider transition-colors duration-300 ${
                  isActive
                    ? 'text-arcane-light'
                    : isPast
                    ? 'text-arcane/60'
                    : 'text-white/20'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-8 h-px mb-4 transition-all duration-500 ${
                  isPast ? 'bg-arcane/40' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

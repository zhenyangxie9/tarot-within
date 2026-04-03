'use client';

import { AnimatePresence } from 'framer-motion';
import { useReadingStore } from '@/store/readingStore';
import SectionTransition from '@/components/ui/SectionTransition';
import StepIndicator from '@/components/ui/StepIndicator';
import QuestionForm from '@/components/reading/QuestionForm';
import SpreadSelector from '@/components/reading/SpreadSelector';
import DrawArea from '@/components/reading/DrawArea';
import ReadingResult from '@/components/reading/ReadingResult';
import PageShell from '@/components/layout/PageShell';
import type { ReadingStep } from '@/types';

const STEP_COMPONENTS: Record<ReadingStep, React.ComponentType> = {
  question: QuestionForm,
  spread: SpreadSelector,
  draw: DrawArea,
  result: ReadingResult,
};

export default function ReadingPage() {
  const currentStep = useReadingStore((s) => s.currentStep);
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <PageShell centered={false}>
      {/* Static star dots */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 127 + 13) % 100}%`,
              top: `${(i * 83 + 7) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              background: 'rgba(200, 190, 255, 0.4)',
              opacity: ((i * 37) % 40 + 5) / 100,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-8 py-6">
          <a
            href="/"
            className="font-serif text-lg text-white/30 hover:text-white/60 transition-colors tracking-widest"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Tarot Within
          </a>
          <div className="hidden md:block">
            <StepIndicator />
          </div>
          <div className="w-28" />
        </header>

        <div className="md:hidden px-8 pb-4">
          <StepIndicator />
        </div>

        <main className="flex-1 flex items-center justify-center py-8 px-4">
          <AnimatePresence mode="wait">
            <SectionTransition key={currentStep}>
              <StepComponent />
            </SectionTransition>
          </AnimatePresence>
        </main>

        <footer className="py-6 text-center">
          <p className="text-white/12 font-sans font-light text-xs tracking-widest">
            TAROT WITHIN · 塔罗之内
          </p>
        </footer>
      </div>
    </PageShell>
  );
}

'use client';

import { create } from 'zustand';
import type {
  ReadingStep, QuestionCategory, SpreadType,
  DrawnCard, ReadingOutput, TarotCardData,
} from '@/types';
import { createShuffledDeck } from '@/lib/tarot/spreads';
import { generateReading } from '@/lib/reading/generateReading';
import { randomIsReversed } from '@/lib/utils/shuffle';

const STEP_ORDER: ReadingStep[] = ['question', 'spread', 'draw', 'result'];

interface ReadingState {
  currentStep: ReadingStep;
  userQuestion: string;
  selectedCategory: QuestionCategory | null;
  spreadType: SpreadType | null;
  deck: TarotCardData[];
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  readingOutput: ReadingOutput | null;
  isGenerating: boolean;

  setQuestion: (question: string, category: QuestionCategory) => void;
  setSpread: (spread: SpreadType) => void;
  initializeDeck: () => void;
  reshuffleDeck: () => void;
  drawCard: (cardData: TarotCardData) => void;
  triggerGenerateReading: () => Promise<void>;
  goToStep: (step: ReadingStep) => void;
  goNextStep: () => void;
  resetSession: () => void;
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  currentStep: 'question',
  userQuestion: '',
  selectedCategory: null,
  spreadType: null,
  deck: [],
  drawnCards: [],
  isShuffling: false,
  readingOutput: null,
  isGenerating: false,

  setQuestion: (question, category) => set({ userQuestion: question, selectedCategory: category }),
  setSpread: (spread) => set({ spreadType: spread }),

  initializeDeck: () => {
    set({ deck: createShuffledDeck(), isShuffling: true });
    setTimeout(() => set({ isShuffling: false }), 1800);
  },

  reshuffleDeck: () => {
    set({ drawnCards: [], readingOutput: null });
    get().initializeDeck();
  },

  drawCard: (cardData) => {
    const { drawnCards, spreadType } = get();
    const required = spreadType === 'three' ? 3 : 1;
    if (drawnCards.length >= required) return;
    if (drawnCards.some((c) => c.cardData.id === cardData.id)) return;

    const positions = ['past', 'present', 'future'] as const;
    const newCard: DrawnCard = {
      cardData,
      isReversed: randomIsReversed(),
      position: spreadType === 'three' ? positions[drawnCards.length] : undefined,
    };
    const updated = [...drawnCards, newCard];
    set({ drawnCards: updated });

    if (updated.length === required) {
      setTimeout(() => get().triggerGenerateReading(), 1200);
    }
  },

  triggerGenerateReading: async () => {
    const { userQuestion, spreadType, drawnCards, selectedCategory } = get();
    if (!spreadType) return;
    set({ isGenerating: true, currentStep: 'result' });
    try {
      const output = await generateReading({
        userQuestion,
        category: selectedCategory,
        spreadType,
        selectedStyle: 'mystical',
        drawnCards,
      });
      set({ readingOutput: output, isGenerating: false });
    } catch {
      set({ isGenerating: false });
    }
  },

  goToStep: (step) => set({ currentStep: step }),

  goNextStep: () => {
    const { currentStep } = get();
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) {
      const next = STEP_ORDER[idx + 1];
      set({ currentStep: next });
      if (next === 'draw') get().initializeDeck();
    }
  },

  resetSession: () => set({
    currentStep: 'question',
    userQuestion: '',
    selectedCategory: null,
    spreadType: null,
    deck: [],
    drawnCards: [],
    isShuffling: false,
    readingOutput: null,
    isGenerating: false,
  }),
}));

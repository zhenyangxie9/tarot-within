import type { SpreadConfig, SpreadType } from '@/types';
import { ALL_CARDS } from './cards';
import { shuffle } from '@/lib/utils/shuffle';

export const SPREAD_CONFIGS: Record<SpreadType, SpreadConfig> = {
  single: {
    type: 'single',
    label: 'Single Card',
    labelCN: '单张牌',
    cardCount: 1,
    description: '聚焦当下最核心的能量，获得清晰而直接的指引。',
  },
  three: {
    type: 'three',
    label: 'Three Cards',
    labelCN: '三张牌',
    cardCount: 3,
    description: '探索过去、现在与未来的脉络，理解事件的来龙去脉。',
    positions: [
      { key: 'past', label: '过去' },
      { key: 'present', label: '现在' },
      { key: 'future', label: '未来' },
    ],
  },
};

/**
 * Returns a freshly shuffled deck copy.
 */
export function createShuffledDeck() {
  return shuffle(ALL_CARDS);
}

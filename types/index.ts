// ── Tarot Data ─────────────────────────────────────────────────────────────

export type ArcanaType = 'major' | 'minor';
export type Suit = 'wands' | 'cups' | 'pentacles' | 'swords';

export type ThemeTag =
  | 'beginnings' | 'power' | 'intuition' | 'stability' | 'authority'
  | 'choice' | 'triumph' | 'introspection' | 'fate' | 'patience'
  | 'balance' | 'transformation' | 'moderation' | 'materialism' | 'upheaval'
  | 'hope' | 'illusion' | 'clarity' | 'completion' | 'renewal' | 'awakening'
  | 'integration' | 'action' | 'emotion' | 'material' | 'intellect'
  | 'communication' | 'conflict' | 'celebration' | 'challenge' | 'abundance'
  | 'change' | 'loss' | 'new-beginning';

export interface TarotCardData {
  id: number;
  name: string;
  nameCN: string;
  arcanaType: ArcanaType;
  suit?: Suit;
  cardNumber?: number;
  romanNumeral: string;
  symbol: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  advice: string;
  themeTag: ThemeTag;
  accentColor: string;
}

// ── Reading Session ─────────────────────────────────────────────────────────

export type QuestionCategory =
  | 'relationship' | 'work' | 'study' | 'self-growth';

export type SpreadType = 'single' | 'three';

export type ReadingStyle = 'mystical';

export type ReadingStep = 'question' | 'spread' | 'draw' | 'result';

export interface DrawnCard {
  cardData: TarotCardData;
  isReversed: boolean;
  position?: 'past' | 'present' | 'future';
}

export interface ReadingInput {
  userQuestion: string;
  category: QuestionCategory | null;
  spreadType: SpreadType;
  selectedStyle: ReadingStyle;
  drawnCards: DrawnCard[];
}

export interface ReadingOutput {
  summary: string;
  contextualInterpretation: string;
  advice: string;
  dailyMessage: string;
}

// ── Component Props ─────────────────────────────────────────────────────────

export interface TarotCardProps {
  cardData: TarotCardData;
  isReversed?: boolean;
  isFlipped?: boolean;
  isSelected?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export interface SpreadConfig {
  type: SpreadType;
  label: string;
  labelCN: string;
  cardCount: number;
  description: string;
  positions?: Array<{ key: string; label: string }>;
}

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  relationship: '感情',
  work: '工作',
  study: '学业',
  'self-growth': '自我成长',
};

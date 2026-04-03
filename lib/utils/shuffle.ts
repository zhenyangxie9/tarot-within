/**
 * Fisher-Yates shuffle — returns a new shuffled array without mutating the input.
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Randomly decide if a card is reversed (~30% chance).
 */
export function randomIsReversed(): boolean {
  return Math.random() < 0.3;
}

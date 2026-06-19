/**
 * Return a new array shuffled with the Fisher–Yates algorithm.
 *
 * Replaces the legacy `array.sort(() => Math.random() - 0.5)` approach, which
 * produces a biased, non-uniform ordering (and, with a constant comparator,
 * no shuffle at all).
 */
export function shuffle<T>(input: readonly T[]): T[] {
  const result = input.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

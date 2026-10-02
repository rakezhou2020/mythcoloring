/** A deterministic weekly ordering that is safe to calculate after hydration. */
export function weeklyStableOrder<T extends { slug: string }>(items: T[], week = Math.floor(Date.now() / 604800000)): T[] {
  const hash = (value: string) => {
    let result = week | 0;
    for (let index = 0; index < value.length; index += 1) result = Math.imul(result ^ value.charCodeAt(index), 16777619);
    return result >>> 0;
  };
  return [...items].sort((left, right) => hash(left.slug) - hash(right.slug));
}

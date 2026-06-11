export const durations = {
  instant: 0.12,
  fast: 0.24,
  base: 0.48,
  slow: 0.8,
  cinematic: 1.4,
} as const;

export type DurationName = keyof typeof durations;

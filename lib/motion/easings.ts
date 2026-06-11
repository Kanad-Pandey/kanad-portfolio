export const easings = {
  expoOut: [0.22, 1, 0.36, 1],
  softInOut: [0.45, 0, 0.55, 1],
  snap: [0.68, -0.55, 0.27, 1.55],
  silk: [0.25, 0.46, 0.45, 0.94],
} as const;

export type EasingName = keyof typeof easings;

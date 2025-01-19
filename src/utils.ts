export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export function inverseInterpolate(from: number, to: number, value: number) {
  return (value - from) / (to - from);
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type T = IntRange<0, 12>;

export const monthGradients: Record<T, string> = {
  // Winter Months
  0: 'linear-gradient(to right, #66a6ff, #89f7fe)',
  1: 'linear-gradient(to right, #89f7fe, #a8e063)',

  // Transition from Winter to Spring
  2: 'linear-gradient(to right, #a8e063, #56ab2f)',

  // Spring Months
  3: 'linear-gradient(to right, #56ab2f, #f6d365)',
  4: 'linear-gradient(to right, #f6d365, #ff9a9e)',

  // Transition from Spring to Summer
  5: 'linear-gradient(to right, #ff9a9e, #56ab2f)',

  // Summer Months
  6: 'linear-gradient(to right, #56ab2f, #f6d365)',
  7: 'linear-gradient(to right, #f6d365, #ff9a9e)',

  // Transition from Summer to Fall
  8: 'linear-gradient(to right, #ff9a9e, #f6d365)',

  // Fall Months
  9: 'linear-gradient(to right, #f6d365, #66a6ff)',
  10: 'linear-gradient(to right, #66a6ff, #89f7fe)',

  // Transition from Fall back to Winter
  11: 'linear-gradient(to right, #89f7fe, #66a6ff)', // December
};

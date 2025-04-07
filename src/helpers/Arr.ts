export type ArrayInput = any;

export function chunk<T = any>(input: ArrayInput, size: number) {
  const arr = clone<T>(input);
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}

export function clone<T = any>(input: ArrayInput): T[] {
  return [...from(input)];
}

export function compact<T = any>(input: ArrayInput) {
  return clone<T>(input).filter(Boolean);
}

export function contains<T = any>(input: ArrayInput, valueOrHandler: ((item: T, index: number) => boolean) | T) {
  const arr = from<T>(input);

  if (typeof valueOrHandler === 'function') {
    // @ts-expect-error
    return arr.some(valueOrHandler);
  }

  return arr.includes(valueOrHandler);
}

export function first<T = any>(input: ArrayInput) {
  return from<T>(input).at(0);
}

export function from<T = any>(input: ArrayInput): T[] {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input;
  }

  if (typeof input === 'object' && input?.[Symbol.iterator]) {
    return Array.from<T>(input);
  }

  return [input];
}

export function isArray(input: ArrayInput) {
  return Array.isArray(input);
}

export function isList<T = any>(input: ArrayInput) {
  return from<T>(input).every((item, index) => item === index);
}

export function last<T = any>(input: ArrayInput) {
  return from<T>(input).at(-1);
}

export function merge<T = any>(...inputs: ArrayInput[]) {
  return inputs.flatMap(clone<T>);
}

export function mergeCompact<T = any>(...inputs: ArrayInput[]) {
  return compact<T>(inputs.flatMap(clone<T>));
}

export function random<T = any>(input: ArrayInput) {
  const arr = from<T>(input);
  return arr.at(Math.floor(Math.random() * arr.length));
}

export function range(start: number, end: number, step = 1) {
  const result: number[] = [];

  if (step === 0) return result;

  const ascending = start < end;

  for (let i = start; ascending ? i <= end : i >= end; i += ascending ? step : -step) {
    result.push(i);
  }

  return result;
}

export function shuffle<T = any>(input: ArrayInput) {
  const arr = clone<T>(input);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-expect-error
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
  }

  return arr;
}

export function sort<T = any>(input: ArrayInput, direction: 'asc' | 'desc' = 'asc') {
  return clone<T>(input).sort((a, b) => {
    if (a === b) return 0;
    return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
  });
}

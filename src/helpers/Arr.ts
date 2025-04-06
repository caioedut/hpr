export type ArrayInput = any;

export function add<T = any>(input: ArrayInput, value: any): T[] {
  const arr = from(input);
  arr.push(value);
  return arr;
}

export function chunk<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size));
}

export function collapse<T = any>(input: ArrayInput): T[] {
  return from(input).flat();
}

export function compact<T = any>(input: ArrayInput): T[] {
  return from(input).filter(Boolean);
}

export function exists<T = any>(input: ArrayInput, value: T) {
  return from(input).includes(value);
}

export function first<T = any>(input: ArrayInput): T | undefined {
  return from(input).at(0);
}

export function flatten<T = any>(input: ArrayInput): T[] {
  return from(input).flat();
}

export function from<T = any>(input: ArrayInput): T[] {
  if (!input) {
    return [];
  }

  if (typeof input === 'object' && input?.[Symbol.iterator]) {
    return Array.from(input);
  }

  return [input];
}

export function get(input: ArrayInput, index: number) {
  return from(input).at(index);
}

export function isArray(input: ArrayInput) {
  return Array.isArray(input);
}

export function isList(input: ArrayInput) {
  return from(input).every((item, index) => item === index);
}

export function join(input: ArrayInput, separator: string) {
  return from(input).join(separator);
}

export function last<T = any>(input: ArrayInput): T | undefined {
  return from(input).at(-1);
}

export function merge<T = any>(...inputs: ArrayInput[]): T[] {
  return inputs.flatMap(from);
}

export function mergeCompact<T = any>(...inputs: ArrayInput[]): T[] {
  return compact(inputs.flatMap(from));
}

export function middle<T = any>(input: ArrayInput): T | undefined {
  const items = from(input);
  if (items.length === 0) return undefined;
  const index = Math.floor(items.length / 2);
  return items[index];
}

export function prepend<T = any>(input: ArrayInput, value: any): T[] {
  const arr = from(input);
  arr.unshift(value);
  return arr;
}

export function random<T = any>(input: ArrayInput): T | undefined {
  const arr = from(input);
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

export function shuffle<T = any>(input: ArrayInput): T[] {
  const arr = from(input);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
  }

  return arr;
}

export function sort<T = any>(input: ArrayInput): T[] {
  return from(input).sort();
}

export function sortDesc<T = any>(input: ArrayInput): T[] {
  return from(input).sort((a, b) => (a < b ? 1 : -1));
}

export function take<T = any>(input: ArrayInput, count: number): T[] {
  return from(input).slice(0, count);
}

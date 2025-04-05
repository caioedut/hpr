export type ArrayInput = any

export function isArray(input: ArrayInput) {
    return Array.isArray(input);
}

export function from<T = any>(input: ArrayInput): T[] {
    if (Array.isArray(input)) {
        return input;
    }

    if (input === null || input === undefined) {
        return [];
    }

    return [input];
}

export function accessible(input: ArrayInput): boolean {
  const arr = from(input);
  return Array.isArray(arr) && arr.length > 0;
}

export function add<T = any>(input: ArrayInput, value: any): T[] {
  const arr = from(input);
  arr.push(value);
  return arr;
}

export function collapse<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.flat();
}

export function crossJoin<T = any>(input: ArrayInput, ...arrays: any[]): T[][] {
  const arr = from(input);
  return arr.reduce(
    (acc, val) => acc.flatMap((x: T[]) => arrays.map((y) => [x, ...y])),
    [[...arr]]
  );
}

export function divide<T = any>(input: ArrayInput, size: number): T[][] {
  const arr = from(input);
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function dot(input: ArrayInput, key: string): any {
  const arr = from(input);
  return arr.reduce((acc, cur) => acc && acc[cur] ? acc[cur] : undefined, key.split('.'));
}

export function except<T = any>(input: ArrayInput, keys: string[]): T[] {
  const arr = from(input);
  return arr.filter((item) => !keys.includes(item));
}

export function exists<T = any>(input: ArrayInput, value: T): boolean {
  const arr = from(input);
  return arr.includes(value);
}

export function first<T = any>(input: ArrayInput): T | undefined {
  const arr = from(input);
  return arr[0];
}

export function flatten<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.flat();
}

export function forget(input: ArrayInput, key: number): any[] {
  const arr = from(input);
  arr.splice(key, 1);
  return arr;
}

export function get<T = any>(input: ArrayInput, key: number): T | undefined {
  const arr = from(input);
  return arr[key];
}

export function has(input: ArrayInput, key: number): boolean {
  const arr = from(input);
  return arr[key] !== undefined;
}

export function hasAny(input: ArrayInput, keys: string[]): boolean {
  const arr = from(input);

  return keys.some((key) => {
    const index = Number(key); // Converte a chave para número
    return !isNaN(index) && arr[index] !== undefined;
  });
}

export function isAssoc(input: ArrayInput): boolean {
  const arr = from(input);
  return arr.some((item, index) => item !== index);
}

export function isList(input: ArrayInput): boolean {
  const arr = from(input);
  return arr.every((item, index) => item === index);
}

export function join(input: ArrayInput, separator: string): string {
  const arr = from(input);
  return arr.join(separator);
}

export function keyBy<T = any>(input: ArrayInput, key: string): Record<string, T> {
  const arr = from(input);
  return arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

export function last<T = any>(input: ArrayInput): T | undefined {
  const arr = from(input);
  return arr[arr.length - 1];
}

export function map<T = any, R = any>(input: ArrayInput, callback: (value: T, index: number) => R): R[] {
  const arr = from(input);
  return arr.map(callback);
}

export function mapSpread<T = any, R = any>(input: ArrayInput, callback: (...args: T[]) => R): R[] {
  const arr = from(input);
  return arr.map((item, index, array) => callback(...array));
}

export function mapWithKeys<T = any, K extends string | number | symbol = string>(
  input: ArrayInput,
  callback: (value: T, index: number) => { key: K; value: any }
): Record<K, any> {
  const arr = from(input);
  return arr.reduce((acc, item, index) => {
    const { key, value } = callback(item, index);
    acc[key] = value;
    return acc;
  }, {} as Record<K, any>);
}

export function only<T = any>(input: ArrayInput, keys: string[]): T[] {
  const arr = from(input);
  return arr.filter(item => keys.includes(item));
}

export function partition<T = any>(input: ArrayInput, callback: (value: T) => boolean): [T[], T[]] {
  const arr = from(input);
  return arr.reduce(
    (acc, val) => {
      if (callback(val)) {
        acc[0].push(val);
      } else {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
}

export function pluck<T = any>(input: ArrayInput, key: string): T[] {
  const arr = from(input);
  return arr.map(item => item[key]);
}

export function prepend<T = any>(input: ArrayInput, value: any): T[] {
  const arr = from(input);
  arr.unshift(value);
  return arr;
}

export function pull<T = any>(input: ArrayInput, value: any): T[] {
  const arr = from(input);
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function query(input: ArrayInput): string {
  const arr = from(input);
  return arr.map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(item)}`).join('&');
}

export function random<T = any>(input: ArrayInput): T | undefined {
  const arr = from(input);
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function reject<T = any>(input: ArrayInput, callback: (value: T) => boolean): T[] {
  const arr = from(input);
  return arr.filter((value) => !callback(value));
}

export function select<T = any>(input: ArrayInput, callback: (value: T) => boolean): T[] {
  const arr = from(input);
  return arr.filter(callback);
}

export function set<T = any>(input: ArrayInput, index: number, value: any): T[] {
  const arr = from(input);
  arr[index] = value;
  return arr;
}

export function shuffle<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
  }
  return arr;
}

export function sole<T = any>(input: ArrayInput): T | undefined {
  const arr = from(input);
  if (arr.length === 1) {
    return arr[0];
  }
  return undefined;
}

export function sort<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.sort();
}

export function sortDesc<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.sort((a, b) => (a < b ? 1 : -1));
}

export function sortRecursive<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.sort((a, b) => (a.length < b.length ? 1 : -1));
}

export function take<T = any>(input: ArrayInput, count: number): T[] {
  const arr = from(input);
  return arr.slice(0, count);
}

export function toCssClasses(input: ArrayInput): string {
  const arr = from(input);
  return arr.join(' ');
}

export function toCssStyles(input: ArrayInput): string {
  const arr = from(input);
  return arr.map(style => `${style}: ${style}`).join('; ');
}

export function undot(input: ArrayInput): Record<string, boolean> {
  const arr = from(input);
  return arr.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
}

export function where<T = any>(input: ArrayInput, callback: (value: T) => boolean): T[] {
  const arr = from(input);
  return arr.filter(callback);
}

export function whereNotNull<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return arr.filter(item => item !== null && item !== undefined);
}

export function wrap<T = any>(input: ArrayInput): T[] {
  const arr = from(input);
  return Array.isArray(arr) ? arr : [arr];
}

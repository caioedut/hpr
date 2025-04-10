import * as Str from './Str';

export function coalesce<T>(...values: unknown[]) {
  for (const value of values) {
    if (!isEmpty(value)) {
      return value as T;
    }
  }
  return undefined;
}

/**
 * Checks if a value is considered "empty".
 *
 * A value is considered empty if it is:
 * - null
 * - undefined
 * - an empty string ('')
 * - an empty array ([])
 * - an empty object ({})
 *
 * Note: Values like `0` and `false` are NOT considered empty.
 */
export function isEmpty(value: any) {
  if (value === null || value === undefined || value === '') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Caches the result of a function based on its arguments.
 * Useful for expensive computations.
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely executes a function and returns a tuple [result, error].
 * Useful for avoiding try/catch blocks.
 */
export function tryCatch<T>(fn: () => T): [null, Error] | [T, null] {
  try {
    return [fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(Str.from(error))];
  }
}

/**
 * Safely executes a function and returns Promise with a tuple [result, error].
 * Useful for avoiding try/catch blocks.
 */
export async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<[null, Error] | [T, null]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

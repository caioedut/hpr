import * as Str from './Str';

/**
 * Returns the first non-empty value from the provided list of values.
 * A value is considered non-empty based on a custom `isEmpty` check.
 *
 * @example
 * Util.coalesce(user.firstName, user.nickname, 'Guest');
 *
 * @example
 * Returns 0
 * Util.coalesce(null, 0, undefined, 'hello');
 *
 * @example Returns undefined
 * Util.coalesce(null, undefined, '', []); // undefined
 */
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
 * ⚠️ Note: Values like `0` (zero) and `false` are **NOT** considered empty.
 *
 * @example
 * // Returns true
 * Util.isEmpty(null);
 *
 * @example
 * // Returns true
 * Util.isEmpty('');
 *
 * @example
 * // Returns true
 * Util.isEmpty([]);
 *
 * @example
 * // Returns true
 * Util.isEmpty({});
 *
 * @example
 * // Returns false
 * Util.isEmpty(0);
 *
 * @example
 * // Returns false
 * Util.isEmpty(false);
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
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * @example
 * // Returns true
 * Util.isEqual(1, 1);
 *
 * @example
 * // Returns true
 * Util.isEqual({ a: 1 }, { a: 1 });
 *
 * @example
 * // Returns true
 * Util.isEqual(new Date('2023-01-01'), new Date('2023-01-01'));
 *
 * @example
 * // Returns true
 * Util.isEqual([1, 2], [1, 2]);
 *
 * @example
 * // Returns false (array with same values in different order)
 * Util.isEqual([2, 1], [1, 2]);
 *
 * @example
 * // Returns false
 * Util.isEqual({ a: 1 }, { a: 2 });
 */
export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Caches the result of a function based on its arguments.
 * Useful for expensive computations.
 *
 * @example
 * const memoizedFn = Util.memoize((a, b) => a + b);
 * memoizedFn(1, 2); // Function runs, result is cached
 * memoizedFn(1, 2); // Result returned from cache (much faster)
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

/**
 * Returns a promise that resolves after a specified number of milliseconds.
 * Useful for pausing execution in `async` functions.
 *
 * @example
 * // Pauses for 1 second
 * await Util.sleep(1000);
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely executes a function and returns a tuple `[result, error]`.
 * This is an alternative to traditional try/catch blocks.
 *
 * - If successful, returns `[result, null]`.
 * - If an error occurs, returns `[null, Error]`.
 *
 * @example
 * // `data` will be `{}` and `error` will be null
 * const [data, error] = Util.tryCatch(() => JSON.parse('{}'));
 *
 * @example
 * // `data` will be null and `error` will be an instance of `Error`
 * const [data, error] = Util.tryCatch(() => JSON.parse('invalid'));
 */
export function tryCatch<T>(fn: () => T): [null, Error] | [T, null] {
  try {
    return [fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(Str.from(error))];
  }
}

/**
 * Safely executes a function and returns Promise with a tuple `[result, error]`.
 * This is an alternative to traditional try/catch blocks.
 *
 * - If successful, returns `[result, null]`.
 * - If an error occurs, returns `[null, Error]`.
 *
 * @example
 * // `data` will be filled and `error` will be null
 * const [data, error] = await Util.tryCatchAsync(() => fetch('/success'));
 *
 * // `data` will be null and `error` will be an instance of `Error`
 * const [data, error] = await Util.tryCatchAsync(() => fetch('/fail'));
 */
export async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<[null, Error] | [T, null]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

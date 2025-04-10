/**
 * Safely gets a value from an object with fallback to default
 * @param obj The source object
 * @param key Key to search for
 * @returns The value if found, otherwise the 'default' value (if exists), or undefined
 */
export function match<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K,
): T[K] | (T extends { default: any } ? T['default'] : undefined) {
  return key in obj ? obj[key] : obj.default;
}

/**
 * Omits specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

/**
 * Picks specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Safely gets a value from an object with fallback to default
 * @param obj The source object
 * @param key Key to search for
 * @returns The value if found, otherwise the 'default' value (if exists), or undefined
 */

// When T has default and the key exists
export function match<T extends { default: any }, K extends keyof T>(obj: T, key: K): T[K];
// When T has default and the key can be anything
export function match<T extends { default: any }>(obj: T, key: any): T['default'];
// When T does not have default and the key exists
export function match<T, K extends keyof T>(obj: T, key: K): T[K];
// When T does not have default and the key does not exist
export function match<T>(obj: T, key: any): undefined;
// implementation
export function match(obj: any, key: any) {
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

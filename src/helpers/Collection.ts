import * as Arr from './Arr';
import * as Num from './Num';
import * as Str from './Str';

type CollectionItem = Record<string, any>;

export class Collection<T extends CollectionItem = CollectionItem> {
  /**
   * Returns the number of items in the collection.
   */
  get length() {
    return this.items.length;
  }

  /**
   * Internal array holding the collection items.
   */
  private readonly items: T[];

  /**
   * Creates a new Collection instance.
   */
  constructor(input: T | T[] = []) {
    this.items = Array.isArray(input) ? [...input] : [input];
  }

  /**
   * Creates a new Collection from an array or single item.
   */
  static from<T extends CollectionItem>(input: T | T[]) {
    return new Collection<T>(input);
  }

  /**
   * Returns the item at the given index.
   */
  at(index: number) {
    return this.items.at(index);
  }

  /**
   * Returns the average value of a given property in the collection.
   */
  avgBy(key: keyof T) {
    const values = this.items.map((item) => Num.from(item[key]));
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  /**
   * Divides the collection into multiple smaller collections (chunks) of the specified size
   */
  chunk(size: number) {
    const result: T[][] = [];

    for (let i = 0; i < this.items.length; i += size) {
      result.push(this.items.slice(i, i + size));
    }

    return new Collection(result);
  }

  /**
   * Returns a deep clone that preserves instances, prototypes, Maps, Sets, Dates, etc.
   */
  clone() {
    const deepClone = <T>(value: T, seen = new WeakMap()) => {
      if (value === null || typeof value !== 'object') return value;
      if (seen.has(value)) return seen.get(value);

      if (value instanceof Date) return new Date(value.getTime()) as any;
      if (value instanceof RegExp) return new RegExp(value.source, value.flags) as any;

      if (value instanceof Map) {
        const result = new Map();
        seen.set(value, result);
        for (const [key, val] of value) {
          result.set(deepClone(key, seen), deepClone(val, seen));
        }
        return result as any;
      }

      if (value instanceof Set) {
        const result = new Set();
        seen.set(value, result);
        for (const item of value) {
          result.add(deepClone(item, seen));
        }
        return result as any;
      }

      if (Array.isArray(value)) {
        const result: any[] = [];
        seen.set(value, result);
        value.forEach((item, i) => {
          result[i] = deepClone(item, seen);
        });
        return result as any;
      }

      const result = Object.create(Object.getPrototypeOf(value));
      seen.set(value, result);
      for (const key of Object.keys(value)) {
        result[key] = deepClone((value as any)[key], seen);
      }

      return result;
    };

    return new Collection<T>(deepClone(this.items));
  }

  /**
   *  @alias some
   * Checks if at least one item satisfies the condition (function or key-value pairs).
   */
  contains(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    return this.some(condition, strict);
  }

  /**
   * Counts the occurrences of items grouped by a key.
   */
  countBy<K extends keyof T>(key: K) {
    return this.items.reduce(
      (acc, item) => {
        const k = item[key];
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      },
      {} as { [P in Extract<T[K], string>]: number },
    );
  }

  /**
   * Iterates over each item in the collection.
   */
  each(callback: (item: T, index: number, collection: this) => void) {
    for (let i = 0; i < this.items.length; i++) {
      callback(this.items[i]!, i, this);
    }

    return this;
  }

  /**
   * Asynchronously iterates over each item in the collection.
   */
  async eachAwait(callback: (item: T, index: number, collection: Collection<T>) => Promise<void>) {
    for (let i = 0; i < this.items.length; i++) {
      await callback(this.items[i]!, i, this);
    }

    return this;
  }

  /**
   * Iterates over each item in reverse order.
   */
  eachReverse(callback: (item: T, index: number, collection: this) => void) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      callback(this.items[i]!, i, this);
    }

    return this;
  }

  /**
   * Asynchronously iterates over each item in reverse order.
   */
  async eachReverseAwait(callback: (item: T, index: number, collection: Collection<T>) => Promise<void>) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      await callback(this.items[i]!, i, this);
    }

    return this;
  }

  /**
   * Checks if all items satisfies the condition (function or key-value pairs).
   */
  every(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    return this.where(condition, strict).length == this.items.length;
  }

  /**
   * Returns the index of the first item that satisfies the callback.
   */
  findIndex(callback: (item: T, index: number, collection: Collection<T>) => boolean) {
    return this.items.findIndex((item, index) => callback(item, index, this));
  }

  /**
   * Returns the last item that satisfies the callback.
   */
  findLast(callback: (item: T, index: number, collection: Collection<T>) => boolean) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (callback(this.items[i]!, i, this)) {
        return this.items[i];
      }
    }

    return undefined;
  }

  /**
   * Returns the index of the last item that satisfies the callback.
   */
  findLastIndex(callback: (item: T, index: number, collection: Collection<T>) => boolean) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (callback(this.items[i]!, i, this)) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Returns the first item in the collection.
   */
  first() {
    return this.items[0];
  }

  /**
   * Finds the first item using a callback or key-value pairs.
   */
  firstWhere(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    if (typeof condition === 'function') {
      return this.items.find((item, index) => condition(item, index, this));
    }

    const keys = Object.keys(condition);

    return this.items.find((item) => {
      return keys.every((key) => (strict ? item[key] === condition[key] : item[key] == condition[key]));
    });
  }

  /**
   * Flattens the collection by one level
   */
  flat() {
    return new Collection(Arr.from<T>(this.items).flat());
  }

  /**
   * Maps each item using the callback and flattens the result.
   */
  flatMap<U>(callback: (item: T, index: number, collection: Collection<T>) => U[]) {
    return this.items.flatMap((item, index) => callback(item, index, this));
  }

  /**
   * Groups items by a property key
   */
  groupBy<K extends keyof T>(key: K) {
    return this.items.reduce(
      (groups, item) => {
        const groupKey = String(item[key]) as Extract<T[K], string>;
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey]!.push(item);
        return groups;
      },
      {} as Record<Extract<T[K], string>, T[]>,
    );
  }

  /**
   * Checks if the collection is empty.
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Checks if the given collection is equal to the current one (by value, not by reference).
   *
   * Two collections are considered equal if they have the same length and each item
   * in the same position is deeply equal.
   */
  isEqual(other: Collection) {
    if (this.length !== other.length) {
      return false;
    }

    return this.items.every((item, index) => {
      // TODO: replace JSON.stringify with deep check
      return JSON.stringify(item) === JSON.stringify(other.at(index));
    });
  }

  /**
   * Checks if the collection is'nt empty.
   */
  isNotEmpty() {
    return this.items.length > 0;
  }

  /**
   * Joins all elements of the collection into a string
   */
  join(separator: string = ',', transform?: (item: T) => string) {
    return this.items.map((item) => (transform ? transform(item) : Str.from(item))).join(separator);
  }

  /**
   * Returns the last item in the collection.
   */
  last() {
    return this.items[this.items.length - 1];
  }

  /**
   * Finds the last item using a callback or key-value pairs.
   */
  lastWhere(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    if (typeof condition === 'function') {
      return this.items.findLast((item, index) => condition(item, index, this));
    }

    const keys = Object.keys(condition);

    return this.items.findLast((item) => {
      return keys.every((key) => (strict ? item[key] === condition[key] : item[key] == condition[key]));
    });
  }

  /**
   * Maps each item using the callback.
   */
  map<U>(callback: (item: T, index: number, collection: Collection<T>) => U) {
    const result = new Array<U>(this.items.length);
    for (let i = 0; i < this.items.length; i++) {
      result[i] = callback(this.items[i]!, i, this);
    }
    return result;
  }

  /**
   * Returns the maximum value of a given property in the collection.
   */
  maxBy(key: keyof T) {
    const values = this.items.map((item) => Num.from(item[key]));
    return values.length > 0 ? Math.max(...values) : undefined;
  }

  /**
   * Merges multiple arrays or collections into this one by a given key, replacing duplicates.
   */
  mergeBy(key: keyof T, ...inputs: (Collection<T> | T[])[]) {
    const map = new Map<T[keyof T], T>();

    for (const item of this.items) {
      map.set(item[key], item);
    }

    for (const input of inputs) {
      const items = input instanceof Collection ? input.toArray() : input;
      for (const item of items) {
        map.set(item[key], item);
      }
    }

    return new Collection<T>(Array.from(map.values()));
  }

  /**
   * Returns the minimum value of a given property in the collection.
   */
  minBy(key: keyof T) {
    const values = this.items.map((item) => Num.from(item[key]));
    return values.length > 0 ? Math.min(...values) : undefined;
  }

  /**
   * Extracts a single key's value from all items.
   */
  pluck(key: keyof T) {
    return this.items.map((item) => item[key]);
  }

  /**
   * Returns a random item from the collection
   */
  random() {
    return Arr.random<T>(this.items);
  }

  /**
   * Reduces the collection to a single value.
   */
  reduce<U>(callback: (accumulator: U, item: T, index: number, collection: Collection<T>) => U, initialValue: U) {
    return this.items.reduce((acc, item, index) => callback(acc, item, index, this), initialValue);
  }

  /**
   * Reduces the collection to a single value from right to left.
   */
  reduceRight<U>(callback: (accumulator: U, item: T, index: number, collection: Collection<T>) => U, initialValue: U) {
    return this.items.reduceRight((acc, item, index) => callback(acc, item, index, this), initialValue);
  }

  /**
   * Returns a reversed copy of the collection.
   */
  reverse() {
    return new Collection<T>([...this.items].reverse());
  }

  /**
   * Returns a new collection with items shuffled (Fisher-Yates algorithm)
   */
  shuffle() {
    return new Collection(Arr.shuffle<T>(this.items));
  }

  /**
   * Returns the number of items in the collection.
   */
  size() {
    return this.items.length;
  }

  /**
   * Returns a new collection excluding the first `count` items.
   */
  skip(count: number) {
    return new Collection(this.items.slice(count));
  }

  /**
   * Returns a portion of the collection as a new collection.
   */
  slice(start?: number, end?: number) {
    return new Collection<T>(this.items.slice(start, end));
  }

  /**
   * Checks if at least one item satisfies the condition (function or key-value pairs).
   */
  some(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    const result = this.firstWhere(condition, strict);
    return result !== null && result !== undefined;
  }

  /**
   * Sorts the collection by a property in ascending or descending order
   */
  sortBy(key: keyof T, direction: 'asc' | 'desc' = 'asc') {
    return new Collection<T>(
      [...this.items].sort((a, b) => {
        if (a[key] === b[key]) return 0;
        const compare = a[key] > b[key] ? 1 : -1;
        return direction === 'asc' ? compare : -compare;
      }),
    );
  }

  /**
   * Subtracts the values of a specific key from all items.
   */
  subBy(key: keyof T) {
    return this.items.reduce((total, item) => total - Num.from(item[key]), 0);
  }

  /**
   * Returns the sum of a given property in the collection.
   */
  sumBy(key: keyof T) {
    return this.items.reduce((total, item) => total + Num.from(item[key]), 0);
  }

  /**
   * Enables iteration with `for...of`.
   */
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }

  /**
   * Returns a new collection with a limited number of items.
   */
  take(limit: number) {
    return new Collection(limit >= 0 ? this.items.slice(0, limit) : this.items.slice(limit));
  }

  /**
   * Executes the given callback with the entire collection and returns the collection.
   */
  tap(callback: (collection: Collection<T>) => void) {
    callback(this);
    return this;
  }

  /**
   * Returns the collection as a regular array.
   */
  toArray() {
    return [...this.items];
  }

  /**
   * Removes duplicate items from a collection based on a specified key, keeping the first occurrence.
   */
  uniqueBy(key: keyof T) {
    const seen = new Set<T[keyof T]>();
    const uniqueItems = this.items.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });

    return new Collection(uniqueItems);
  }

  /**
   * Filters the collection using a condition function or key-value pairs.
   */
  where(condition: ((item: T, index: number, collection: Collection<T>) => boolean) | Partial<T>, strict = true) {
    if (typeof condition === 'function') {
      return new Collection(this.items.filter((item, index) => condition(item, index, this)));
    }

    const keys = Object.keys(condition);

    return new Collection(
      this.items.filter((item) => {
        return keys.every((key) => (strict ? item[key] === condition[key] : item[key] == condition[key]));
      }),
    );
  }
}

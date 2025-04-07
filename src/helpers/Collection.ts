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
   * Merges multiple arrays or collections into a new Collection.
   */
  concat(...inputs: (Collection | T[])[]) {
    const merged = [...this.items];

    for (const input of inputs) {
      if (input instanceof Collection) {
        merged.push(...(input as Collection<T>).items);
      } else {
        merged.push(...input);
      }
    }

    return new Collection<T>(merged);
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
   * Checks if all items pass the test implemented by the callback.
   */
  every(callback: (item: T, index: number, collection: Collection<T>) => boolean): boolean {
    return this.items.every((item, index) => callback(item, index, this));
  }

  /**
   * Returns a new collection with items that pass the test.
   */
  filter(callback: (item: T, index: number, collection: Collection<T>) => boolean): Collection<T> {
    return new Collection(this.items.filter((item, index) => callback(item, index, this)));
  }

  /**
   * Returns the first item that satisfies the callback.
   */
  find(callback: (item: T, index: number, collection: Collection<T>) => boolean): T | undefined {
    return this.items.find((item, index) => callback(item, index, this));
  }

  /**
   * Returns the index of the first item that satisfies the callback.
   */
  findIndex(callback: (item: T, index: number, collection: Collection<T>) => boolean): number {
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
   * Maps each item using the callback and flattens the result.
   */
  flatMap<U>(callback: (item: T, index: number, collection: Collection<T>) => U[]): U[] {
    return this.items.flatMap((item, index) => callback(item, index, this));
  }

  /**
   * Checks if the collection includes the given item.
   */
  includes(item: T) {
    return this.items.includes(item);
  }

  /**
   * Checks if the collection is empty.
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Returns the last item in the collection.
   */
  last() {
    return this.items[this.items.length - 1];
  }

  /**
   * Maps each item using the callback.
   */
  map<U>(callback: (item: T, index: number, collection: Collection<T>) => U): U[] {
    const result = new Array<U>(this.items.length);
    for (let i = 0; i < this.items.length; i++) {
      result[i] = callback(this.items[i]!, i, this);
    }
    return result;
  }

  /**
   * Returns the middle item in the collection.
   */
  middle() {
    const len = this.items.length;
    return len === 0 ? undefined : this.items[Math.floor(len / 2)];
  }

  /**
   * Extracts a single key's value from all items.
   */
  pluck<K extends keyof T>(key: K) {
    return new Collection(this.items.map((item) => item[key] as any));
  }

  /**
   * Reduces the collection to a single value.
   */
  reduce<U>(callback: (accumulator: U, item: T, index: number, collection: Collection<T>) => U, initialValue: U): U {
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
   * Returns the number of items in the collection.
   */
  size() {
    return this.items.length;
  }

  /**
   * Returns a portion of the collection as a new collection.
   */
  slice(start?: number, end?: number) {
    return new Collection<T>(this.items.slice(start, end));
  }

  /**
   * Checks if any item passes the test.
   */
  some(callback: (item: T, index: number, collection: Collection<T>) => boolean): boolean {
    return this.items.some((item, index) => callback(item, index, this));
  }

  /**
   * Enables iteration with `for...of`.
   */
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }

  /**
   * Returns the collection as a regular array.
   */
  toArray() {
    return [...this.items];
  }
}

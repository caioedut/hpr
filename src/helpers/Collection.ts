type CollectionItem = Record<string, any>;

export class Collection<T extends CollectionItem = CollectionItem> extends Array<T> {
  constructor(input: T | T[] = []) {
    const items = Array.isArray(input) ? [...input] : [input];
    super(...items);
    Object.setPrototypeOf(this, Collection.prototype);
  }

  static from<T extends CollectionItem>(input: T | T[]) {
    return new Collection<T>(input);
  }

  first() {
    return this[0];
  }

  isEmpty() {
    return this.length === 0;
  }

  last() {
    return this[this.length - 1];
  }

  middle() {
    const len = this.length;
    return len === 0 ? undefined : this[Math.floor(len / 2)];
  }

  pluck<K extends keyof T>(key: K) {
    return this.map((item) => item[key]);
  }

  size() {
    return this.length;
  }

  toArray() {
    return [...this];
  }
}

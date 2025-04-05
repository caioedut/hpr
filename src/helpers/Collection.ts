export class Collection<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  static from<T>(items: T[]): Collection<T> {
    return new Collection(items);
  }

  after(value: T): T[] {
    const index = this.items.indexOf(value);
    return index !== -1 ? this.items.slice(index + 1) : [];
  }

  all(): T[] {
    return this.items;
  }

  average(): number {
    return this.sum() / this.count();
  }

  avg(): number {
    return this.average();
  }

  before(value: T): T[] {
    const index = this.items.indexOf(value);
    return index !== -1 ? this.items.slice(0, index) : [];
  }

  chunk(size: number): T[][] {
    return Array.from({ length: Math.ceil(this.items.length / size) }, (_, i) =>
      this.items.slice(i * size, i * size + size),
    );
  }

  chunkWhile(predicate: (value: T, index: number) => boolean): T[][] {
    const result: T[][] = [];
    let chunk: T[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (predicate(this.items[i], i)) {
        chunk.push(this.items[i]);
      } else {
        if (chunk.length) result.push(chunk);
        chunk = [this.items[i]];
      }
    }
    if (chunk.length) result.push(chunk);
    return result;
  }

  collapse(): T[] {
    return this.items.flat();
  }

  collapseWithKeys(): Record<string, T> {
    return Object.assign({}, ...this.items);
  }

  combine(keys: any[]): any[] {
    return keys.map((key, index) => [key, this.items[index]]);
  }

  concat(...arrays: T[]): T[] {
    return this.items.concat(...arrays);
  }

  contains(value: T): boolean {
    return this.items.includes(value);
  }

  containsOneItem(): boolean {
    return this.count() === 1;
  }

  containsStrict(value: T): boolean {
    return this.items.includes(value, 0);
  }

  count(): number {
    return this.items.length;
  }

  countBy(callback: (item: T) => any): Record<string, number> {
    return this.items.reduce((acc, item) => {
      const key = callback(item);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  crossJoin(...arrays: T[]): T[][] {
    return this.items.reduce((acc, val) => acc.flatMap((x) => arrays.map((y) => [x, ...y])), [[...this.items]]);
  }

  dd(): void {
    console.log(this.items);
    process.exit();
  }

  diff(arr: T[]): T[] {
    return this.items.filter((item) => !arr.includes(item));
  }

  diffAssoc(arr: T[]): T[] {
    return this.items.filter((item) => !Object.keys(arr).includes(item as any));
  }

  diffKeys(keys: string[]): T[] {
    return this.items.filter((_, key) => !keys.includes(key));
  }

  doesntContain(value: T): boolean {
    return !this.contains(value);
  }

  dot(key: string): any {
    return key.split('.').reduce((acc, part) => acc?.[part], this.items);
  }

  dump(): void {
    console.table(this.items);
  }

  duplicates(): T[] {
    return this.items.filter((value, index, self) => self.indexOf(value) !== index);
  }

  duplicatesStrict(): T[] {
    return this.items.filter((value, index, self) => self.indexOf(value) !== index);
  }

  each(callback: (item: T, index: number) => void): Collection<T> {
    this.items.forEach(callback);
    return this;
  }

  eachSpread(callback: (item: T) => void): Collection<T> {
    this.items.forEach(callback);
    return this;
  }

  ensure(value: T): Collection<T> {
    if (!this.contains(value)) {
      this.push(value);
    }
    return this;
  }

  every(callback: (item: T, index: number) => boolean): boolean {
    return this.items.every(callback);
  }

  except(keys: string[]): Collection<T> {
    return new Collection(this.items.filter((item) => !keys.includes(item as any)));
  }

  filter(callback: (item: T, index: number) => boolean): Collection<T> {
    return new Collection(this.items.filter(callback));
  }

  first(): T | undefined {
    return this.items[0];
  }

  firstOrFail(): T {
    if (!this.items.length) throw new Error('No items found.');
    return this.items[0];
  }

  firstWhere(callback: (item: T) => boolean): T | undefined {
    return this.items.find(callback);
  }

  flatMap(callback: (item: T) => any[]): any[] {
    return this.items.flatMap(callback);
  }

  flatten(): T[] {
    return this.items.flat();
  }

  flip(): Record<any, T> {
    return Object.fromEntries(this.items.map((value, index) => [value, index]));
  }

  forget(key: string): void {
    delete this.items[key];
  }

  forPage(page: number, perPage: number): Collection<T> {
    const start = (page - 1) * perPage;
    return new Collection(this.items.slice(start, start + perPage));
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  groupBy(callback: (item: T) => any): Record<any, T[]> {
    return this.items.reduce((acc, item) => {
      const key = callback(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }

  has(value: T): boolean {
    return this.contains(value);
  }

  hasAny(values: T[]): boolean {
    return values.some((value) => this.contains(value));
  }

  implode(separator: string): string {
    return this.items.join(separator);
  }

  intersect(arr: T[]): T[] {
    return this.items.filter((item) => arr.includes(item));
  }

  intersectAssoc(arr: T[]): T[] {
    return Object.keys(arr).filter((key) => this.items.includes(arr[key]));
  }

  intersectAssocUsing(arr: T[], comparator: (a: T, b: T) => boolean): T[] {
    return Object.keys(arr).filter((key) => this.items.some((item) => comparator(item, arr[key])));
  }

  intersectByKeys(keys: string[]): T[] {
    return this.items.filter((_, index) => keys.includes(index as any));
  }

  intersectUsing(arr: T[], comparator: (a: T, b: T) => boolean): T[] {
    return this.items.filter((item) => arr.some((el) => comparator(item, el)));
  }

  isEmpty(): boolean {
    return this.count() === 0;
  }

  isNotEmpty(): boolean {
    return this.count() > 0;
  }

  join(separator: string): string {
    return this.items.join(separator);
  }

  keyBy(callback: (item: T) => any): Record<any, T> {
    return this.items.reduce((acc, item) => {
      acc[callback(item)] = item;
      return acc;
    }, {});
  }

  keys(): string[] {
    return Object.keys(this.items as any);
  }

  last(): T | undefined {
    return this.items[this.count() - 1];
  }

  lazy(): Collection<T> {
    return this;
  }

  make(items: T[]): Collection<T> {
    return new Collection(items);
  }

  map<U>(callback: (item: T, index: number) => U): Collection<U> {
    return new Collection(this.items.map(callback));
  }

  mapInto<U>(constructor: { new (): U }): Collection<U> {
    return new Collection(this.items.map((item) => new constructor(item)));
  }

  mapSpread(callback: (item: T) => any): Collection<T> {
    return new Collection(this.items.map(callback));
  }

  mapToGroups(callback: (item: T, index: number) => string): Record<string, T[]> {
    return this.items.reduce((acc, item, index) => {
      const group = callback(item, index);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  }

  mapWithKeys<K extends number | string>(callback: (item: T, index: number) => { key: K; value: T }): Record<K, T> {
    return this.items.reduce(
      (acc, item, index) => {
        const { key, value } = callback(item, index);
        acc[key] = value;
        return acc;
      },
      {} as Record<K, T>,
    );
  }

  max(): T | undefined {
    return Math.max(...(this.items as any));
  }

  median(): number {
    const sorted = [...this.items].sort((a, b) => (a < b ? -1 : 1));
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  min(): T | undefined {
    return Math.min(...(this.items as any));
  }

  mode(): T[] {
    const countMap = this.items.reduce(
      (acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      },
      {} as Record<T, number>,
    );
    const maxCount = Math.max(...Object.values(countMap));
    return this.items.filter((item) => countMap[item] === maxCount);
  }

  multiply(factor: number): T[] {
    return this.items.map((item) => (item as any) * factor);
  }

  nth(n: number): T | undefined {
    return this.items[n];
  }

  only(keys: string[]): T[] {
    return this.items.filter((_, key) => keys.includes(key as any));
  }

  pad(length: number, value: T): T[] {
    const padded = [...this.items];
    while (padded.length < length) padded.push(value);
    return padded;
  }

  partition(callback: (item: T) => boolean): [T[], T[]] {
    return this.items.reduce(
      (acc, item) => {
        acc[callback(item) ? 0 : 1].push(item);
        return acc;
      },
      [[], []],
    );
  }

  percentage(value: T): number {
    return ((value as any) / this.sum()) * 100;
  }

  pipe(callback: (items: T[]) => T[]): T[] {
    return callback(this.items);
  }

  pipeInto<U>(callback: (items: T[]) => U): U {
    return callback(this.items);
  }

  pipeThrough<U>(callback: (items: T[]) => U): U {
    return callback(this.items);
  }

  pluck(key: string): any[] {
    return this.items.map((item: any) => item[key]);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  prepend(value: T): Collection<T> {
    this.items.unshift(value);
    return this;
  }

  pull(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }

  push(value: T): void {
    this.items.push(value);
  }

  put(index: number, value: T): void {
    this.items[index] = value;
  }

  random(): T | undefined {
    const index = Math.floor(Math.random() * this.count());
    return this.items[index];
  }

  range(start: number, end: number): Collection<number> {
    return new Collection([...Array(end - start + 1).keys()].map((i) => start + i));
  }

  reduce<U>(callback: (accumulator: U, item: T) => U, initialValue: U): U {
    return this.items.reduce(callback, initialValue);
  }

  reduceSpread<U>(callback: (accumulator: U, item: T) => U, initialValue: U): U {
    return this.items.reduce(callback, initialValue);
  }

  reject(callback: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter((item) => !callback(item)));
  }

  replace(search: T, replace: T): Collection<T> {
    return new Collection(this.items.map((item) => (item === search ? replace : item)));
  }

  replaceRecursive(search: T, replace: T): Collection<T> {
    return new Collection(
      this.items.map((item) =>
        Array.isArray(item) ? item.replaceRecursive(search, replace) : item === search ? replace : item,
      ),
    );
  }

  reverse(): Collection<T> {
    return new Collection(this.items.reverse());
  }

  search(value: T): number {
    return this.items.indexOf(value);
  }

  select(callback: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter(callback));
  }

  shift(): T | undefined {
    return this.items.shift();
  }

  shuffle(): Collection<T> {
    const shuffled = [...this.items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return new Collection(shuffled);
  }

  skip(count: number): Collection<T> {
    return new Collection(this.items.slice(count));
  }

  skipUntil(callback: (item: T) => boolean): Collection<T> {
    const index = this.items.findIndex(callback);
    return new Collection(this.items.slice(index));
  }

  skipWhile(callback: (item: T) => boolean): Collection<T> {
    const index = this.items.findIndex((item) => !callback(item));
    return new Collection(this.items.slice(index));
  }

  slice(start: number, end: number): Collection<T> {
    return new Collection(this.items.slice(start, end));
  }

  sliding(windowSize: number): T[][] {
    return this.items
      .slice(0, this.count() - windowSize + 1)
      .map((_, index) => this.items.slice(index, index + windowSize));
  }

  sole(): T | undefined {
    if (this.count() === 1) return this.first();
    return undefined;
  }

  some(callback: (item: T) => boolean): boolean {
    return this.items.some(callback);
  }

  sort(callback?: (a: T, b: T) => number): Collection<T> {
    return new Collection(this.items.sort(callback));
  }

  sortBy(callback: (item: T) => any): Collection<T> {
    return new Collection(this.items.sort((a, b) => callback(a) - callback(b)));
  }

  sortByDesc(callback: (item: T) => any): Collection<T> {
    return new Collection(this.items.sort((a, b) => callback(b) - callback(a)));
  }

  sortDesc(): Collection<T> {
    return new Collection(this.items.sort().reverse());
  }

  sortKeys(): Collection<T> {
    return new Collection(
      Object.keys(this.items)
        .sort()
        .map((key) => this.items[key]),
    );
  }

  sortKeysDesc(): Collection<T> {
    return new Collection(
      Object.keys(this.items)
        .sort()
        .reverse()
        .map((key) => this.items[key]),
    );
  }

  sortKeysUsing(compare: (a: T, b: T) => number): Collection<T> {
    return new Collection(
      Object.keys(this.items)
        .sort(compare)
        .map((key) => this.items[key]),
    );
  }

  splice(start: number, deleteCount: number, ...items: T[]): T[] {
    return this.items.splice(start, deleteCount, ...items);
  }

  split(separator: string): string[] {
    return this.items.join('').split(separator);
  }

  splitIn(parts: number): T[][] {
    const size = Math.ceil(this.count() / parts);
    return this.chunk(size);
  }

  sum(): number {
    return this.items.reduce((acc, item) => acc + (item as any), 0);
  }

  take(count: number): Collection<T> {
    return new Collection(this.items.slice(0, count));
  }

  takeUntil(callback: (item: T) => boolean): Collection<T> {
    const index = this.items.findIndex(callback);
    return new Collection(this.items.slice(0, index));
  }

  takeWhile(callback: (item: T) => boolean): Collection<T> {
    const index = this.items.findIndex((item) => !callback(item));
    return new Collection(this.items.slice(0, index));
  }

  tap(callback: (collection: Collection<T>) => void): Collection<T> {
    callback(this);
    return this;
  }

  times(n: number, callback: (index: number) => T): Collection<T> {
    return new Collection([...Array(n)].map((_, index) => callback(index)));
  }

  toArray(): T[] {
    return this.items;
  }

  toJson(): string {
    return JSON.stringify(this.items);
  }

  transform(callback: (item: T, index: number) => T): Collection<T> {
    return new Collection(this.items.map(callback));
  }

  undot(): Record<string, T> {
    return this.items.reduce((acc, item) => {
      acc[item as any] = item;
      return acc;
    }, {});
  }

  union(arr: T[]): Collection<T> {
    return new Collection([...new Set([...arr, ...this.items])]);
  }

  unique(): Collection<T> {
    return new Collection([...new Set(this.items)]);
  }

  uniqueStrict(): Collection<T> {
    return new Collection([...new Set(this.items)]);
  }

  unless(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (!callback(this)) {
      return this;
    }
    return new Collection([]);
  }

  unlessEmpty(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (!this.isEmpty()) {
      return new Collection([]);
    }
    return this;
  }

  unlessNotEmpty(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (this.isNotEmpty()) {
      return new Collection([]);
    }
    return this;
  }

  unwrap(): T[] {
    return this.items;
  }

  value(): T[] {
    return this.items;
  }

  when(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (callback(this)) {
      return this;
    }
    return new Collection([]);
  }

  whenEmpty(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (this.isEmpty()) {
      return callback(this);
    }
    return this;
  }

  whenNotEmpty(callback: (collection: Collection<T>) => boolean): Collection<T> {
    if (this.isNotEmpty()) {
      return callback(this);
    }
    return this;
  }

  where(callback: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter(callback));
  }

  whereBetween(min: T, max: T): Collection<T> {
    return new Collection(this.items.filter((item) => item >= min && item <= max));
  }

  whereIn(values: T[]): Collection<T> {
    return new Collection(this.items.filter((item) => values.includes(item)));
  }

  whereInstanceOf(type: any): Collection<T> {
    return new Collection(this.items.filter((item) => item instanceof type));
  }

  whereInStrict(values: T[]): Collection<T> {
    return new Collection(this.items.filter((item) => values.includes(item)));
  }

  whereNotBetween(min: T, max: T): Collection<T> {
    return new Collection(this.items.filter((item) => item < min || item > max));
  }

  whereNotIn(values: T[]): Collection<T> {
    return new Collection(this.items.filter((item) => !values.includes(item)));
  }

  whereNotInStrict(values: T[]): Collection<T> {
    return new Collection(this.items.filter((item) => !values.includes(item)));
  }

  whereNotNull(): Collection<T> {
    return new Collection(this.items.filter((item) => item != null));
  }

  whereNull(): Collection<T> {
    return new Collection(this.items.filter((item) => item == null));
  }

  whereStrict(callback: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter(callback));
  }

  wrap(): Collection<T[]> {
    return new Collection([this.items]);
  }

  zip(...arrays: T[][]): T[][] {
    return arrays.reduce(
      (acc, array) => acc.map((tuple, i) => [...tuple, array[i]]),
      this.items.map((item) => [item]),
    );
  }
}

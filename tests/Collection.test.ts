import { Collection } from '../draft/Collection';

const collect = Collection.from;

describe('Collection', () => {
  it('should collect items into a collection', () => {
    const result = collect([1, 2, 3]);
    expect(result.all()).toEqual([1, 2, 3]);
  });

  it('should calculate the average of numbers', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.average()).toBe(3);
  });

  it('should filter items correctly', () => {
    const result = collect([1, 2, 3, 4, 5]);
    const filtered = result.filter((num) => num > 3);
    expect(filtered.all()).toEqual([4, 5]);
  });

  it('should map items correctly', () => {
    const result = collect([1, 2, 3]);
    const mapped = result.map((num) => num * 2);
    expect(mapped.all()).toEqual([2, 4, 6]);
  });

  it('should return first item', () => {
    const result = collect([10, 20, 30]);
    expect(result.first()).toBe(10);
  });

  it('should return last item', () => {
    const result = collect([10, 20, 30]);
    expect(result.last()).toBe(30);
  });

  it('should check if a collection contains an item', () => {
    const result = collect([10, 20, 30]);
    expect(result.contains(20)).toBe(true);
    expect(result.contains(40)).toBe(false);
  });

  it('should merge two collections correctly', () => {
    const result = collect([1, 2, 3]).merge([4, 5, 6]);
    expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should sort a collection in ascending order', () => {
    const result = collect([3, 1, 2]).sort();
    expect(result.all()).toEqual([1, 2, 3]);
  });

  it('should sort a collection in descending order', () => {
    const result = collect([3, 1, 2]).sortDesc();
    expect(result.all()).toEqual([3, 2, 1]);
  });

  it('should join items correctly', () => {
    const result = collect([1, 2, 3]).join('-');
    expect(result).toBe('1-2-3');
  });

  it('should remove duplicates from collection', () => {
    const result = collect([1, 2, 2, 3, 3, 4]);
    expect(result.unique().all()).toEqual([1, 2, 3, 4]);
  });

  it('should get the size of the collection', () => {
    const result = collect([1, 2, 3, 4]);
    expect(result.count()).toBe(4);
  });

  it('should get the keys of the collection', () => {
    const result = collect([10, 20, 30]);
    expect(result.keys()).toEqual([0, 1, 2]);
  });

  it('should slice a collection', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.slice(1, 4).all()).toEqual([2, 3, 4]);
  });

  it('should paginate the collection', () => {
    const result = collect([1, 2, 3, 4, 5]).forPage(1, 2);
    expect(result.all()).toEqual([1, 2]);
  });

  it('should merge recursively', () => {
    const result = collect([{ a: 1 }, { b: 2 }]).mergeRecursive([{ a: 2 }, { c: 3 }]);
    expect(result.all()).toEqual([{ a: 2 }, { b: 2 }, { c: 3 }]);
  });

  it('should get the maximum value', () => {
    const result = collect([1, 5, 3, 9, 7]);
    expect(result.max()).toBe(9);
  });

  it('should get the minimum value', () => {
    const result = collect([1, 5, 3, 9, 7]);
    expect(result.min()).toBe(1);
  });

  it('should reverse the collection', () => {
    const result = collect([1, 2, 3]);
    expect(result.reverse().all()).toEqual([3, 2, 1]);
  });

  it('should shuffle the collection', () => {
    const result = collect([1, 2, 3]);
    expect(result.shuffle().all()).toHaveLength(3);
  });

  it('should chunk a collection into smaller arrays', () => {
    const result = collect([1, 2, 3, 4, 5, 6]).chunk(2);
    expect(result.all()).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('should collapse a collection of collections', () => {
    const result = collect([
      [1, 2],
      [3, 4],
      [5, 6],
    ]).collapse();
    expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should combine keys and values', () => {
    const result = collect(['a', 'b', 'c']).combine([1, 2, 3]);
    expect(result.all()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should get the intersection of two collections', () => {
    const result = collect([1, 2, 3, 4]).intersect([3, 4, 5, 6]);
    expect(result.all()).toEqual([3, 4]);
  });

  it('should group items by a key', () => {
    const result = collect([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 1, name: 'C' },
    ]).groupBy('id');
    expect(result.all()).toEqual({
      1: [
        { id: 1, name: 'A' },
        { id: 1, name: 'C' },
      ],
      2: [{ id: 2, name: 'B' }],
    });
  });

  it('should return a random item', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect([1, 2, 3, 4, 5]).toContain(result.random());
  });

  it('should push an item into the collection', () => {
    const result = collect([1, 2, 3]);
    result.push(4);
    expect(result.all()).toEqual([1, 2, 3, 4]);
  });

  it('should pluck a value from the collection', () => {
    const result = collect([
      { age: 20, name: 'A' },
      { age: 30, name: 'B' },
    ]).pluck('name');
    expect(result.all()).toEqual(['A', 'B']);
  });

  it('should reject items based on a condition', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.reject((num) => num % 2 === 0).all()).toEqual([1, 3, 5]);
  });

  it('should get the sum of values in the collection', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.sum()).toBe(15);
  });

  it('should check if a collection is empty', () => {
    const result = collect([]);
    expect(result.isEmpty()).toBe(true);
  });

  it('should transform items in the collection', () => {
    const result = collect([1, 2, 3]).transform((item) => item * 2);
    expect(result.all()).toEqual([2, 4, 6]);
  });

  it('should return items after a certain index', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.after(2).all()).toEqual([4, 5]);
  });

  it('should return items before a certain index', () => {
    const result = collect([1, 2, 3, 4, 5]);
    expect(result.before(2).all()).toEqual([1, 2]);
  });

  it('should chunk while a condition is true', () => {
    const result = collect([1, 2, 3, 4, 5]).chunkWhile((x) => x < 4);
    expect(result.all()).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it('should collapse a collection with keys', () => {
    const result = collect([{ a: 1 }, { b: 2 }]).collapseWithKeys();
    expect(result.all()).toEqual({ a: 1, b: 2 });
  });

  it('should return true if collection contains only one item', () => {
    const result = collect([1, 2, 3]);
    expect(result.containsOneItem()).toBe(false);
    expect(collect([1]).containsOneItem()).toBe(true);
  });

  it('should contain strictly matching values', () => {
    const result = collect([1, 2, 3]);
    expect(result.containsStrict(2)).toBe(true);
    expect(result.containsStrict('2')).toBe(false);
  });

  it('should count by a given key', () => {
    const result = collect([{ a: 1 }, { a: 2 }, { a: 1 }]);
    expect(result.countBy('a')).toEqual({ '1': 2, '2': 1 });
  });

  it('should cross join two collections', () => {
    const result = collect([1, 2]).crossJoin([3, 4]);
    expect(result.all()).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
  });

  it('should dump the collection', () => {
    console.log = jest.fn();
    const result = collect([1, 2, 3]);
    result.dd();
    expect(console.log).toHaveBeenCalledWith([1, 2, 3]);
  });

  it('should return the difference of the collection', () => {
    const result = collect([1, 2, 3, 4]).diff([2, 3]);
    expect(result.all()).toEqual([1, 4]);
  });

  it('should return the difference with associative keys', () => {
    const result = collect({ a: 1, b: 2, c: 3 }).diffAssoc({ a: 1, b: 3 });
    expect(result.all()).toEqual({ b: 2, c: 3 });
  });

  it('should return the difference using a custom comparison', () => {
    const result = collect([1, 2, 3]).diffAssocUsing([2, 3], (a, b) => a === b);
    expect(result.all()).toEqual([1]);
  });

  it('should return the difference by keys', () => {
    const result = collect({ a: 1, b: 2, c: 3 }).diffKeys({ a: 1, b: 2 });
    expect(result.all()).toEqual({ c: 3 });
  });

  it('should check if collection doesnt contain a value', () => {
    const result = collect([1, 2, 3]);
    expect(result.doesntContain(4)).toBe(true);
    expect(result.doesntContain(2)).toBe(false);
  });

  it('should dot a collection', () => {
    const result = collect({ a: { b: { c: 1 } } }).dot('a.b.c');
    expect(result).toBe(1);
  });

  it('should dump a collection', () => {
    console.log = jest.fn();
    const result = collect([1, 2, 3]);
    result.dump();
    expect(console.log).toHaveBeenCalledWith([1, 2, 3]);
  });

  it('should return duplicates', () => {
    const result = collect([1, 2, 2, 3]);
    expect(result.duplicates()).toEqual([2]);
  });

  it('should return strict duplicates', () => {
    const result = collect([1, '2', 2, 3]);
    expect(result.duplicatesStrict()).toEqual([2]);
  });

  it('should iterate over each item', () => {
    const result = collect([1, 2, 3]);
    const items: number[] = [];
    result.each((item) => items.push(item));
    expect(items).toEqual([1, 2, 3]);
  });

  it('should iterate over each item spread', () => {
    const result = collect([1, 2, 3]);
    const items: number[] = [];
    result.eachSpread((item) => items.push(item));
    expect(items).toEqual([1, 2, 3]);
  });
});

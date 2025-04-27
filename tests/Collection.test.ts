import { Collection } from '../src/helpers/Collection';

describe('Collection', () => {
  describe('constructor', () => {
    it('should initialize the collection with an array of objects', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      expect(collection.toArray()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should initialize the collection with a single object wrapped in an array', () => {
      const collection = new Collection({ id: 1 });
      expect(collection.toArray()).toEqual([{ id: 1 }]);
    });

    it('should initialize with an empty array when no input is provided', () => {
      const collection = new Collection();
      expect(collection.toArray()).toEqual([]);
    });
  });

  describe('[Symbol.iterator]', () => {
    it('should allow iteration with for...of', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const collection = new Collection(data);

      const result: { id: number }[] = [];
      for (const item of collection) {
        result.push(item);
      }

      expect(result).toEqual(data);
    });
  });

  describe('from', () => {
    it('should create a collection from an array of objects', () => {
      const collection = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(collection.toArray()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should create a collection from a single object', () => {
      const collection = Collection.from({ id: 1 });
      expect(collection.toArray()).toEqual([{ id: 1 }]);
    });
  });

  describe('at', () => {
    it('should return the item at the specified index', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      expect(collection.at(0)).toEqual({ id: 1 });
      expect(collection.at(1)).toEqual({ id: 2 });
    });

    it('should return undefined for an invalid index', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      expect(collection.at(2)).toBeUndefined();
    });
  });

  describe('avgBy', () => {
    it('should return the average of a given property in the collection', () => {
      const collection = new Collection([{ value: 10 }, { value: 20 }, { value: 30 }]);
      expect(collection.avgBy('value')).toBe(20);
    });

    it('should return 0 if the property is not present or the collection is empty', () => {
      const collection = new Collection([{ value: 10 }, { value: 20 }]);
      // @ts-expect-error
      expect(collection.avgBy('nonExisting')).toBe(0);

      const emptyCollection = new Collection();
      expect(emptyCollection.avgBy('value')).toBe(0);
    });
  });

  describe('clone', () => {
    it('should return a deep clone of the collection that preserves instances', () => {
      const originalCollection = new Collection([
        { value: 10 },
        { value: 20 },
        new Date(),
        new Map([[1, 'a']]),
        new Set([1, 2, 3]),
      ]);

      const clonedCollection = originalCollection.clone();

      // Test for object cloning
      expect(clonedCollection.at(0)).not.toBe(originalCollection.at(0));
      expect(clonedCollection.at(1)).not.toBe(originalCollection.at(1));

      // Test for date cloning
      expect(clonedCollection.at(2)).not.toBe(originalCollection.at(2));
      expect(clonedCollection.at(2)).toEqual(originalCollection.at(2));

      // Test for map cloning
      expect(clonedCollection.at(3)).not.toBe(originalCollection.at(3));
      expect(clonedCollection.at(3)).toEqual(originalCollection.at(3));

      // Test for set cloning
      expect(clonedCollection.at(4)).not.toBe(originalCollection.at(4));
      expect(clonedCollection.at(4)).toEqual(originalCollection.at(4));

      // Ensure prototypes are preserved
      expect(Object.getPrototypeOf(clonedCollection.at(0))).toBe(Object.getPrototypeOf(originalCollection.at(0)));
    });

    it('should return a new collection instance', () => {
      const collection = new Collection([{ value: 10 }]);
      const clonedCollection = collection.clone();
      expect(clonedCollection).not.toBe(collection);
    });
  });

  describe('contains', () => {
    it('should return true if any item matches the callback condition', () => {
      const collection = new Collection([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);

      const result = collection.contains((item) => item.name === 'Bob');
      expect(result).toBe(true);
    });

    it('should return false if no item matches the callback condition', () => {
      const collection = new Collection([{ id: 1, name: 'Alice' }]);

      const result = collection.contains((item) => item.name === 'Bob');
      expect(result).toBe(false);
    });

    it('should return true if any item matches the partial object (strict)', () => {
      const collection = new Collection([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);

      const result = collection.contains({ id: 2 });
      expect(result).toBe(true);
    });

    it('should return false if no item matches the partial object (strict)', () => {
      const collection = new Collection([{ id: 1, name: 'Alice' }]);

      // @ts-expect-error
      const result = collection.contains({ id: '1' }, true); // different type
      expect(result).toBe(false);
    });

    it('should return true if values loosely match when strict = false', () => {
      const collection = new Collection([{ id: 1 }]);

      // @ts-expect-error
      const result = collection.contains({ id: '1' }, false);
      expect(result).toBe(true);
    });
  });

  describe('countBy', () => {
    it('should count occurrences based on a string key', () => {
      const collection = new Collection([{ type: 'fruit' }, { type: 'vegetable' }, { type: 'fruit' }]);

      const result = collection.countBy('type');
      expect(result).toEqual({ fruit: 2, vegetable: 1 });
    });

    it('should return an empty object for an empty collection', () => {
      const collection = new Collection([]);
      const result = collection.countBy('type' as any);
      expect(result).toEqual({});
    });

    it('should ignore non-string keys in the result', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 1 }]);

      const result = collection.countBy('id');
      expect(result).toEqual({ 1: 2, 2: 1 });
    });
  });

  describe('each', () => {
    it('should iterate over each item and execute the callback', () => {
      const collection = new Collection([{ name: 'Alice' }, { name: 'Bob' }]);

      const names: string[] = [];
      collection.each((item) => names.push(item.name));

      expect(names).toEqual(['Alice', 'Bob']);
    });

    it('should return the same collection instance', () => {
      const collection = new Collection([{ id: 1 }]);
      const result = collection.each(() => {});
      expect(result).toBe(collection);
    });
  });

  describe('eachAwait', () => {
    it('should asynchronously iterate over each item and execute the callback', async () => {
      const collection = new Collection([{ name: 'Alice' }, { name: 'Bob' }]);

      const result: string[] = [];

      await collection.eachAwait(async (item) => {
        result.push(item.name);
      });

      expect(result).toEqual(['Alice', 'Bob']);
    });

    it('should return the same collection instance', async () => {
      const collection = new Collection([{ id: 1 }]);
      const result = await collection.eachAwait(async () => {});
      expect(result).toBe(collection);
    });
  });

  describe('eachReverse', () => {
    it('should iterate over each item in reverse order and execute the callback', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);

      const result: number[] = [];

      collection.eachReverse((item) => {
        result.push(item.id);
      });

      expect(result).toEqual([3, 2, 1]);
    });

    it('should return the same collection instance', () => {
      const collection = new Collection([{ id: 1 }]);
      const result = collection.eachReverse(() => {});
      expect(result).toBe(collection);
    });
  });

  describe('eachReverseAwait', () => {
    it('should iterate over each item in reverse order and await the callback', async () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);

      const result: number[] = [];

      await collection.eachReverseAwait(async (item) => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        result.push(item.id);
      });

      expect(result).toEqual([3, 2, 1]);
    });

    it('should return the same collection instance', async () => {
      const collection = new Collection([{ id: 1 }]);
      const result = await collection.eachReverseAwait(async () => {});
      expect(result).toBe(collection);
    });
  });

  describe('every', () => {
    it('should return true if all items satisfy the callback condition', () => {
      const collection = new Collection([{ age: 20 }, { age: 25 }]);
      const result = collection.every((item) => item.age > 18);
      expect(result).toBe(true);
    });

    it('should return false if at least one item fails the callback condition', () => {
      const collection = new Collection([{ age: 20 }, { age: 16 }]);
      const result = collection.every((item) => item.age > 18);
      expect(result).toBe(false);
    });

    it('should return true if all items match partial condition (non-strict)', () => {
      const collection = new Collection([{ role: 'admin' }, { role: 'admin' }]);
      const result = collection.every({ role: 'admin' }, false);
      expect(result).toBe(true);
    });

    it('should return false if not all items match partial condition (strict)', () => {
      const collection = new Collection([{ role: 'admin' }, { role: 'user' }]);
      const result = collection.every({ role: 'admin' });
      expect(result).toBe(false);
    });

    it('should return true for an empty collection', () => {
      const collection = new Collection([]);
      const result = collection.every(() => false);
      expect(result).toBe(true);
    });
  });

  describe('findIndex', () => {
    it('should return the index of the first item that satisfies the callback', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const index = collection.findIndex((item) => item.id === 2);
      expect(index).toBe(1);
    });

    it('should return -1 if no item satisfies the callback', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const index = collection.findIndex((item) => item.id === 5);
      expect(index).toBe(-1);
    });

    it('should pass correct arguments to callback', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }]);
      const callback = jest.fn(() => false);
      collection.findIndex(callback);
      expect(callback).toHaveBeenCalledWith({ x: 1 }, 0, collection);
      expect(callback).toHaveBeenCalledWith({ x: 2 }, 1, collection);
    });
  });

  describe('findLast', () => {
    it('should return the last item that satisfies the callback', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }, { x: 1 }]);
      const result = collection.findLast((item) => item.x === 1);
      expect(result).toEqual({ x: 1 });
    });

    it('should return undefined if no item satisfies the callback', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }]);
      const result = collection.findLast((item) => item.x === 3);
      expect(result).toBeUndefined();
    });

    it('should pass correct arguments to the callback', () => {
      const collection = new Collection([{ a: 1 }, { a: 2 }]);
      const callback = jest.fn(() => false);
      collection.findLast(callback);
      expect(callback).toHaveBeenCalledWith({ a: 2 }, 1, collection);
      expect(callback).toHaveBeenCalledWith({ a: 1 }, 0, collection);
    });
  });

  describe('findLastIndex', () => {
    it('should return the index of the last item that satisfies the callback', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }, { x: 1 }]);
      const result = collection.findLastIndex((item) => item.x === 1);
      expect(result).toBe(2);
    });

    it('should return -1 if no item satisfies the callback', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }]);
      const result = collection.findLastIndex((item) => item.x === 3);
      expect(result).toBe(-1);
    });

    it('should pass correct arguments to the callback', () => {
      const collection = new Collection([{ a: 1 }, { a: 2 }]);
      const callback = jest.fn(() => false);
      collection.findLastIndex(callback);
      expect(callback).toHaveBeenCalledWith({ a: 2 }, 1, collection);
      expect(callback).toHaveBeenCalledWith({ a: 1 }, 0, collection);
    });
  });

  describe('first', () => {
    it('should return the first item in the collection', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      expect(collection.first()).toEqual({ id: 1 });
    });

    it('should return undefined if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.first()).toBeUndefined();
    });
  });

  describe('firstWhere', () => {
    it('should return the first item that satisfies the callback', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const result = collection.firstWhere((item) => item.id > 1);
      expect(result).toEqual({ id: 2 });
    });

    it('should return the first item that matches the partial object (strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '2' }, { id: 2 }]);
      const result = collection.firstWhere({ id: 2 });
      expect(result).toEqual({ id: 2 });
    });

    it('should return the first item that matches the partial object (non-strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '2' }, { id: 2 }]);
      const result = collection.firstWhere({ id: 2 }, false);
      expect(result).toEqual({ id: '2' });
    });

    it('should return undefined if no item matches', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.firstWhere({ id: 3 });
      expect(result).toBeUndefined();
    });
  });

  describe('flat', () => {
    it('should flatten the collection by one level', () => {
      const collection = new Collection([{ id: 1 }, [{ id: 2 }, { id: 3 }], { id: 4 }]);

      const result = collection.flat().toArray();
      expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });

    it('should return the same array if there is nothing to flatten', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.flat().toArray();
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should handle an empty collection', () => {
      const collection = new Collection();
      const result = collection.flat().toArray();
      expect(result).toEqual([]);
    });
  });

  describe('flatMap', () => {
    it('should map and flatten the result into a new array', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.flatMap((item) => [{ ...item }, { copy: item.id }]);

      expect(result).toEqual([{ id: 1 }, { copy: 1 }, { id: 2 }, { copy: 2 }]);
    });

    it('should return an empty array if all callbacks return empty arrays', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.flatMap(() => []);

      expect(result).toEqual([]);
    });

    it('should include the correct index and collection in the callback', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const indexes: number[] = [];

      collection.flatMap((_item, index) => {
        indexes.push(index);
        return [];
      });

      expect(indexes).toEqual([0, 1]);
    });
  });

  describe('groupBy', () => {
    it('should group items by the given key', () => {
      const collection = new Collection([
        { name: 'apple', type: 'fruit' },
        { name: 'banana', type: 'fruit' },
        { name: 'carrot', type: 'vegetable' },
      ]);

      const result = collection.groupBy('type');

      expect(result).toEqual({
        fruit: [
          { name: 'apple', type: 'fruit' },
          { name: 'banana', type: 'fruit' },
        ],
        vegetable: [{ name: 'carrot', type: 'vegetable' }],
      });
    });

    it('should accept items with non-string keys', () => {
      const collection = new Collection([
        { name: 'apple', type: 'fruit' },
        { name: 'invalid', type: 1 },
      ]);

      const result = collection.groupBy('type');

      expect(result).toEqual({
        '1': [{ name: 'invalid', type: 1 }],
        fruit: [{ name: 'apple', type: 'fruit' }],
      });
    });

    it('should return an empty object if collection is empty', () => {
      const collection = new Collection([]);
      const result = collection.groupBy('type');
      expect(result).toEqual({});
    });
  });

  describe('isEmpty', () => {
    it('should return true if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.isEmpty()).toBe(true);
    });

    it('should return false if the collection has items', () => {
      const collection = new Collection([{ id: 1 }]);
      expect(collection.isEmpty()).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('should return false if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.isNotEmpty()).toBe(false);
    });

    it('should return true if the collection has items', () => {
      const collection = new Collection([{ id: 1 }]);
      expect(collection.isNotEmpty()).toBe(true);
    });
  });

  describe('join', () => {
    it('should join using Str.from by default when no transform is given', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }]);
      const result = collection.join('|');
      expect(result).toBe('{"x":1}|{"x":2}');
    });

    it('should join using the transform function if provided', () => {
      const collection = new Collection([{ x: 1 }, { x: 2 }]);
      const result = collection.join('-', (item) => `${item.x}`);
      expect(result).toBe('1-2');
    });

    it('should return an empty string when the collection is empty', () => {
      const collection = new Collection([]);
      const result = collection.join('|');
      expect(result).toBe('');
    });
  });

  describe('last', () => {
    it('should return the last item in the collection', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(collection.last()).toEqual({ id: 3 });
    });

    it('should return undefined if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.last()).toBeUndefined();
    });
  });

  describe('lastWhere', () => {
    it('should return the last item that matches the condition (function)', () => {
      const collection = new Collection([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'a' },
      ]);

      const result = collection.lastWhere((item) => item.name === 'a');
      expect(result).toEqual({ id: 3, name: 'a' });
    });

    it('should return the last item that matches the condition (partial object, strict)', () => {
      const collection = new Collection([
        { id: 1, value: 1 },
        { id: 2, value: '1' },
        { id: 3, value: 1 },
      ]);

      const result = collection.lastWhere({ value: 1 }, true);
      expect(result).toEqual({ id: 3, value: 1 });
    });

    it('should return the last item that matches the condition (partial object, loose)', () => {
      const collection = new Collection([
        { id: 1, value: 1 },
        { id: 2, value: '1' },
        { id: 3, value: 1 },
      ]);

      const result = collection.lastWhere({ value: '1' }, false);
      expect(result).toEqual({ id: 3, value: 1 });
    });

    it('should return undefined if no match is found', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.lastWhere({ id: 3 });
      expect(result).toBeUndefined();
    });

    it('should work with an empty collection', () => {
      const collection = new Collection();
      const result = collection.lastWhere({ id: 1 });
      expect(result).toBeUndefined();
    });
  });

  describe('map', () => {
    it('should transform each item using the callback', () => {
      const collection = new Collection([{ value: 1 }, { value: 2 }, { value: 3 }]);

      const result = collection.map((item) => item.value * 2);

      expect(result).toEqual([2, 4, 6]);
    });

    it('should provide index and collection as callback args', () => {
      const collection = new Collection([{ value: 1 }, { value: 2 }]);

      const result = collection.map((item, index, col) => {
        expect(col).toBeInstanceOf(Collection);
        return item.value + index;
      });

      expect(result).toEqual([1, 3]);
    });

    it('should return an empty array when the collection is empty', () => {
      const collection = new Collection();
      const result = collection.map(() => 123);
      expect(result).toEqual([]);
    });
  });

  describe('maxBy', () => {
    it('should return the maximum value of a given property', () => {
      const collection = new Collection([{ age: 10 }, { age: 25 }, { age: 18 }]);
      expect(collection.maxBy('age')).toBe(25);
    });

    it('should return undefined if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.maxBy('age' as any)).toBeUndefined();
    });
  });

  describe('mergeBy', () => {
    it('should merge and replace items with the same key', () => {
      const collection = new Collection([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ]);
      const merged = collection.mergeBy('id', [
        { id: 2, name: 'Updated' },
        { id: 3, name: 'C' },
      ]);

      expect(merged.toArray()).toEqual([
        { id: 1, name: 'A' },
        { id: 2, name: 'Updated' },
        { id: 3, name: 'C' },
      ]);
    });

    it('should work with other collections as input', () => {
      const a = new Collection([{ id: 1, name: 'A' }]);
      const b = new Collection([
        { id: 1, name: 'X' },
        { id: 2, name: 'B' },
      ]);

      const result = a.mergeBy('id', b);

      expect(result.toArray()).toEqual([
        { id: 1, name: 'X' },
        { id: 2, name: 'B' },
      ]);
    });

    it('should return a new collection when nothing is merged', () => {
      const original = new Collection([{ id: 1, name: 'A' }]);
      const merged = original.mergeBy('id');
      expect(merged.toArray()).toEqual([{ id: 1, name: 'A' }]);
      expect(merged).not.toBe(original);
    });
  });

  describe('minBy', () => {
    it('should return the minimum value for the given key', () => {
      const collection = new Collection([{ value: 10 }, { value: 3 }, { value: 7 }]);
      expect(collection.minBy('value')).toBe(3);
    });

    it('should return undefined for an empty collection', () => {
      const collection = new Collection([]);
      expect(collection.minBy('value')).toBeUndefined();
    });
  });

  describe('pluck', () => {
    it('should extract values by the given key from all items', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(collection.pluck('id')).toEqual([1, 2, 3]);
    });

    it('should return undefined for missing keys', () => {
      const collection = new Collection([{ name: 'Alice' }, { name: 'Bob' }]);
      // @ts-expect-error
      expect(collection.pluck('age')).toEqual([undefined, undefined]);
    });

    it('should handle mixed objects with and without the key', () => {
      const collection = new Collection([{ id: 1 }, { name: 'Bob' }]);
      expect(collection.pluck('id')).toEqual([1, undefined]);
    });
  });

  describe('random', () => {
    it('should return a random item from the collection', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const item = collection.random();
      expect(collection.toArray()).toContainEqual(item);
    });

    it('should return undefined if the collection is empty', () => {
      const collection = new Collection();
      expect(collection.random()).toBeUndefined();
    });
  });

  describe('reduce', () => {
    it('should reduce the collection to a single value', () => {
      const collection = new Collection([{ n: 1 }, { n: 2 }, { n: 3 }]);
      const sum = collection.reduce((acc, item) => acc + item.n, 0);
      expect(sum).toBe(6);
    });

    it('should work with different types and initial values', () => {
      const collection = new Collection([{ name: 'a' }, { name: 'b' }]);
      const result = collection.reduce((acc, item) => acc + item.name, '');
      expect(result).toBe('ab');
    });
  });

  describe('reduceRight', () => {
    it('should reduce the collection from right to left', () => {
      const collection = new Collection([{ n: 1 }, { n: 2 }, { n: 3 }]);
      const result = collection.reduceRight((acc, item) => acc + item.n, 0);
      expect(result).toBe(6);
    });

    it('should respect the right-to-left order', () => {
      const collection = new Collection([{ letter: 'a' }, { letter: 'b' }, { letter: 'c' }]);
      const result = collection.reduceRight((acc, item) => acc + item.letter, '');
      expect(result).toBe('cba');
    });
  });

  describe('reverse', () => {
    it('should return a reversed copy of the collection', () => {
      const collection = new Collection([{ n: 1 }, { n: 2 }, { n: 3 }]);
      const reversed = collection.reverse();

      expect(reversed.toArray()).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }]);
      expect(collection.toArray()).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]); // original não deve mudar
    });
  });

  describe('shuffle', () => {
    it('should return a shuffled copy of the collection with the same items', () => {
      const items = Array.from({ length: 10 }, (_, i) => ({ id: i }));
      const collection = new Collection(items);
      const shuffled = collection.shuffle();

      expect(shuffled).toBeInstanceOf(Collection);
      expect(shuffled.toArray()).toHaveLength(10);
      expect(shuffled.toArray().sort((a, b) => a.id - b.id)).toEqual(items);
    });

    it('should not mutate the original collection', () => {
      const original = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      original.shuffle();
      expect(original.toArray()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
  });

  describe('size', () => {
    it('should return the number of items in the collection', () => {
      const collection = new Collection([{ a: 1 }, { a: 2 }, { a: 3 }]);
      expect(collection.size()).toBe(3);
    });

    it('should return 0 for an empty collection', () => {
      const collection = new Collection([]);
      expect(collection.size()).toBe(0);
    });
  });

  describe('slice', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    it('should return a sliced collection from start to end', () => {
      const collection = new Collection(items);
      const result = collection.slice(1, 3);
      expect(result.toArray()).toEqual([{ id: 2 }, { id: 3 }]);
    });

    it('should return a sliced collection from start to the end if no end is provided', () => {
      const collection = new Collection(items);
      const result = collection.slice(2);
      expect(result.toArray()).toEqual([{ id: 3 }, { id: 4 }]);
    });

    it('should return the full collection if no parameters are provided', () => {
      const collection = new Collection(items);
      const result = collection.slice();
      expect(result.toArray()).toEqual(items);
    });

    it('should return an empty collection if the range is out of bounds', () => {
      const collection = new Collection(items);
      const result = collection.slice(10, 20);
      expect(result.toArray()).toEqual([]);
    });
  });

  describe('some', () => {
    it('should return true if at least one item satisfies the callback condition', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const result = collection.some((item) => item.id === 2);
      expect(result).toBe(true);
    });

    it('should return false if no item satisfies the callback condition', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const result = collection.some((item) => item.id === 5);
      expect(result).toBe(false);
    });

    it('should return true if at least one item matches the partial object (strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: 2 }]);
      const result = collection.some({ id: 2 });
      expect(result).toBe(true);
    });

    it('should return false if no item matches the partial object (strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '2' }]);
      const result = collection.some({ id: 2 });
      expect(result).toBe(false);
    });

    it('should return true if at least one item matches the partial object (non-strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '2' }]);
      const result = collection.some({ id: 2 }, false);
      expect(result).toBe(true);
    });

    it('should return false for an empty collection', () => {
      const collection = new Collection([]);
      const result = collection.some(() => true);
      expect(result).toBe(false);
    });
  });

  describe('sortBy', () => {
    it('should sort the collection by a key in ascending order', () => {
      const collection = new Collection([{ age: 30 }, { age: 20 }, { age: 40 }]);
      const result = collection.sortBy('age').pluck('age');
      expect(result).toEqual([20, 30, 40]);
    });

    it('should sort the collection by a key in descending order', () => {
      const collection = new Collection([{ age: 30 }, { age: 20 }, { age: 40 }]);
      const result = collection.sortBy('age', 'desc').pluck('age');
      expect(result).toEqual([40, 30, 20]);
    });

    it('should return a new collection and not mutate the original', () => {
      const original = new Collection([{ score: 10 }, { score: 5 }]);
      const sorted = original.sortBy('score');
      expect(original.pluck('score')).toEqual([10, 5]);
      expect(sorted.pluck('score')).toEqual([5, 10]);
    });

    it('should keep the original order if values are equal', () => {
      const collection = new Collection([
        { name: 'a', score: 10 },
        { name: 'b', score: 10 },
        { name: 'c', score: 10 },
      ]);
      const result = collection.sortBy('score');
      expect(result.pluck('name')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('sumBy', () => {
    it('should return the sum of the given key', () => {
      const collection = new Collection([{ value: 10 }, { value: 20 }, { value: 5 }]);
      expect(collection.sumBy('value')).toBe(35);
    });

    it('should return 0 if the collection is empty', () => {
      const collection = new Collection([]);
      expect(collection.sumBy('value' as any)).toBe(0);
    });

    it('should handle non-numeric values as 0', () => {
      const collection = new Collection([{ value: '10' }, { value: 'x' }, { value: 5 }]);
      expect(collection.sumBy('value')).toBe(15);
    });
  });

  describe('subBy', () => {
    it('should subtract all values from 0', () => {
      const collection = new Collection([{ value: 10 }, { value: 5 }, { value: 3 }]);
      expect(collection.subBy('value')).toBe(-18); // 0 - 10 - 5 - 3
    });

    it('should return 0 if the collection is empty', () => {
      const collection = new Collection([]);
      expect(collection.subBy('value' as any)).toBe(0);
    });

    it('should handle non-numeric values as 0', () => {
      const collection = new Collection([{ value: 10 }, { value: 'a' }, { value: 3 }]);
      expect(collection.subBy('value')).toBe(-13);
    });
  });

  describe('tap', () => {
    it('should call the callback with the collection and return itself', () => {
      const callback = jest.fn();
      const collection = new Collection([{ id: 1 }, { id: 2 }]);

      const result = collection.tap(callback);

      expect(callback).toHaveBeenCalledWith(collection);
      expect(result).toBe(collection);
    });
  });

  describe('toArray', () => {
    it('should return a shallow copy of the internal array', () => {
      const original = [{ id: 1 }, { id: 2 }];
      const collection = new Collection(original);

      const array = collection.toArray();

      expect(array).toEqual(original);
      expect(array).not.toBe(original); // deve ser uma cópia
    });
  });

  describe('uniqueBy', () => {
    it('should remove duplicates based on the given key', () => {
      const collection = new Collection([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'c' },
      ]);

      const result = collection.uniqueBy('id').toArray();

      expect(result).toEqual([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ]);
    });
  });

  describe('where', () => {
    it('should filter items using a callback', () => {
      const collection = new Collection([{ age: 20 }, { age: 30 }, { age: 25 }]);

      const result = collection.where((item) => item.age > 20).toArray();

      expect(result).toEqual([{ age: 30 }, { age: 25 }]);
    });

    it('should filter items using key-value pairs (strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '1' }, { id: 2 }]);

      const result = collection.where({ id: 1 }).toArray();

      expect(result).toEqual([{ id: 1 }]);
    });

    it('should filter items using key-value pairs (non-strict)', () => {
      const collection = new Collection([{ id: 1 }, { id: '1' }, { id: 2 }]);

      const result = collection.where({ id: 1 }, false).toArray();

      expect(result).toEqual([{ id: 1 }, { id: '1' }]);
    });
  });
});

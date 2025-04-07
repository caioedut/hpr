import { Collection } from '../src/helpers/Collection';

describe('Collection', () => {
  describe('from', () => {
    it('should create a collection from an array', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(result).toBeInstanceOf(Collection);
      expect(result.toArray()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should create a collection from a single item', () => {
      const result = Collection.from({ id: 1 });
      expect(result.toArray()).toEqual([{ id: 1 }]);
    });
  });

  describe('at', () => {
    it('should return item at index', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).at(1);
      expect(result).toEqual({ id: 2 });
    });

    it('should return undefined for invalid index', () => {
      const result = Collection.from([{ id: 1 }]).at(99);
      expect(result).toBeUndefined();
    });
  });

  describe('concat', () => {
    it('should merge collections and arrays', () => {
      const a = Collection.from([{ id: 1 }]);
      const b = Collection.from([{ id: 2 }]);
      const result = a.concat(b, [{ id: 3 }]);
      expect(result.toArray()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
  });

  describe('each', () => {
    it('should iterate over all items', () => {
      const result: number[] = [];
      Collection.from([{ id: 1 }, { id: 2 }]).each((item) => result.push(item.id));
      expect(result).toEqual([1, 2]);
    });
  });

  describe('eachAwait', () => {
    it('should await each iteration', async () => {
      const result: number[] = [];
      await Collection.from([{ id: 1 }, { id: 2 }]).eachAwait(async (item) => {
        await new Promise((r) => setTimeout(r, 1));
        result.push(item.id);
      });
      expect(result).toEqual([1, 2]);
    });
  });

  describe('eachReverse', () => {
    it('should iterate in reverse', () => {
      const result: number[] = [];
      Collection.from([{ id: 1 }, { id: 2 }]).eachReverse((item) => result.push(item.id));
      expect(result).toEqual([2, 1]);
    });
  });

  describe('eachReverseAwait', () => {
    it('should await each iteration in reverse', async () => {
      const result: number[] = [];
      await Collection.from([{ id: 1 }, { id: 2 }]).eachReverseAwait(async (item) => {
        await new Promise((r) => setTimeout(r, 1));
        result.push(item.id);
      });
      expect(result).toEqual([2, 1]);
    });
  });

  describe('every', () => {
    it('should return true if all match', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).every((item) => item.id > 0);
      expect(result).toBe(true);
    });

    it('should return false if one fails', () => {
      const result = Collection.from([{ id: 1 }, { id: -1 }]).every((item) => item.id > 0);
      expect(result).toBe(false);
    });
  });

  describe('filter', () => {
    it('should return a collection with matching items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).filter((item) => item.id === 1);
      expect(result.toArray()).toEqual([{ id: 1 }]);
    });
  });

  describe('find', () => {
    it('should return the first matching item', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).find((item) => item.id === 2);
      expect(result).toEqual({ id: 2 });
    });
  });

  describe('findIndex', () => {
    it('should return index of first match', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).findIndex((item) => item.id === 2);
      expect(result).toBe(1);
    });
  });

  describe('findLast', () => {
    it('should return last matching item', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }, { id: 1 }]).findLast((item) => item.id === 1);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('findLastIndex', () => {
    it('should return index of last match', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }, { id: 1 }]).findLastIndex((item) => item.id === 1);
      expect(result).toBe(2);
    });
  });

  describe('first', () => {
    it('should return first item', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).first();
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('flatMap', () => {
    it('should flatten and map items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).flatMap((item) => [item.id, item.id * 2]);
      expect(result).toEqual([1, 2, 2, 4]);
    });
  });

  describe('includes', () => {
    it('should check inclusion', () => {
      const item = { id: 1 };
      const collection = Collection.from([item]);
      expect(collection.includes(item)).toBe(true);
      expect(collection.includes({ id: 1 })).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true if empty', () => {
      const result = Collection.from([]).isEmpty();
      expect(result).toBe(true);
    });
  });

  describe('last', () => {
    it('should return last item', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).last();
      expect(result).toEqual({ id: 2 });
    });
  });

  describe('map', () => {
    it('should map all items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).map((item) => item.id * 2);
      expect(result).toEqual([2, 4]);
    });
  });

  describe('middle', () => {
    it('should return middle item', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }, { id: 3 }]).middle();
      expect(result).toEqual({ id: 2 });
    });

    it('should return undefined if empty', () => {
      const result = Collection.from([]).middle();
      expect(result).toBeUndefined();
    });
  });

  describe('pluck', () => {
    it('should pluck values by key', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).pluck('id');
      expect(result.toArray()).toEqual([1, 2]);
    });
  });

  describe('reduce', () => {
    it('should reduce items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).reduce((acc, item) => acc + item.id, 0);
      expect(result).toBe(3);
    });
  });

  describe('reduceRight', () => {
    it('should reduce items from right to left', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).reduceRight((acc, item) => acc + item.id, 0);
      expect(result).toBe(3);
    });
  });

  describe('reverse', () => {
    it('should return reversed collection', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).reverse();
      expect(result.toArray()).toEqual([{ id: 2 }, { id: 1 }]);
    });
  });

  describe('size', () => {
    it('should return the number of items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).size();
      expect(result).toBe(2);
    });
  });

  describe('slice', () => {
    it('should return a sliced collection', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }, { id: 3 }]).slice(1, 3);
      expect(result.toArray()).toEqual([{ id: 2 }, { id: 3 }]);
    });
  });

  describe('some', () => {
    it('should return true if any match', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).some((item) => item.id === 2);
      expect(result).toBe(true);
    });

    it('should return false if none match', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).some((item) => item.id === 3);
      expect(result).toBe(false);
    });
  });

  describe('toArray', () => {
    it('should return a shallow copy of the items', () => {
      const result = Collection.from([{ id: 1 }, { id: 2 }]).toArray();
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});

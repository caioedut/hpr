import { Collection } from '../src/helpers/Collection';

describe('Collection', () => {
  describe('from', () => {
    it('should create a collection from an array', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(items).toBeInstanceOf(Collection);
      expect(items.length).toBe(2);
    });

    it('should create a collection from a single item', () => {
      const items = Collection.from({ id: 1 });
      expect(items.length).toBe(1);
      expect(items[0]).toEqual({ id: 1 });
    });
  });

  describe('first', () => {
    it('should return the first item', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(items.first()).toEqual({ id: 1 });
    });

    it('should return undefined when empty', () => {
      const items = Collection.from([]);
      expect(items.first()).toBeUndefined();
    });
  });

  describe('last', () => {
    it('should return the last item', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(items.last()).toEqual({ id: 2 });
    });

    it('should return undefined when empty', () => {
      const items = Collection.from([]);
      expect(items.last()).toBeUndefined();
    });
  });

  describe('middle', () => {
    it('should return the middle item when odd length', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(items.middle()).toEqual({ id: 2 });
    });

    it('should return the middle item when even length', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
      expect(items.middle()).toEqual({ id: 3 }); // arredonda pra baixo
    });

    it('should return undefined when empty', () => {
      const items = Collection.from([]);
      expect(items.middle()).toBeUndefined();
    });
  });

  describe('isEmpty', () => {
    it('should return true when empty', () => {
      const items = Collection.from([]);
      expect(items.isEmpty()).toBe(true);
    });

    it('should return false when not empty', () => {
      const items = Collection.from([{ id: 1 }]);
      expect(items.isEmpty()).toBe(false);
    });
  });

  describe('size', () => {
    it('should return the number of items', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(items.size()).toBe(2);
    });
  });

  describe('pluck', () => {
    it('should return values for a given key', () => {
      const items = Collection.from([{ id: 1 }, { id: 2 }]);
      expect(items.pluck('id')).toEqual([1, 2]);
    });
  });

  describe('toArray', () => {
    it('should return a shallow copy of the array', () => {
      const original = [{ id: 1 }];
      const items = Collection.from(original);
      const copy = items.toArray();
      expect(copy).toEqual(original);
      expect(copy).not.toBe(items);
    });
  });
});

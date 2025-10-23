import * as Arr from '../src/helpers/Arr';

describe('Arr', () => {
  describe('from', () => {
    test('should convert non-array values to array', () => {
      expect(Arr.from(5)).toEqual([5]);
      expect(Arr.from('a')).toEqual(['a']);
    });

    test('should return same array reference if input is already array', () => {
      const input = [1, 2, 3];
      expect(Arr.from(input)).toBe(input);
    });

    test('should convert iterable objects to array', () => {
      expect(Arr.from(new Set(['a', 'b']))).toEqual(['a', 'b']);
    });

    test('should return empty array for falsy values', () => {
      expect(Arr.from(null)).toEqual([]);
      expect(Arr.from(undefined)).toEqual([]);
    });
  });

  describe('clone', () => {
    test('should return a shallow copy of the array', () => {
      const input = [1, 2, 3];
      const result = Arr.clone(input);
      expect(result).toEqual(input);
      expect(result).not.toBe(input);
    });
  });

  describe('compact', () => {
    test('should remove falsy values', () => {
      expect(Arr.compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3]);
    });
  });

  describe('contains', () => {
    test('should return true if array contains value', () => {
      expect(Arr.contains([1, 2, 3], 2)).toBe(true);
    });

    test('should return true if condition matches item', () => {
      expect(Arr.contains([1, 2, 3], (item) => item > 2)).toBe(true);
    });

    test('should return false if not found', () => {
      expect(Arr.contains([1, 2, 3], 4)).toBe(false);
    });
  });

  describe('first / last', () => {
    test('should return first and last elements', () => {
      const arr = [10, 20, 30];
      expect(Arr.first(arr)).toBe(10);
      expect(Arr.last(arr)).toBe(30);
    });

    test('should return undefined for empty array', () => {
      expect(Arr.first([])).toBeUndefined();
      expect(Arr.last([])).toBeUndefined();
    });
  });

  describe('isArray', () => {
    test('should correctly detect arrays', () => {
      expect(Arr.isArray([1, 2])).toBe(true);
      expect(Arr.isArray('not')).toBe(false);
    });
  });

  describe('isList', () => {
    test('should return true for numeric lists', () => {
      expect(Arr.isList([0, 1, 2, 3])).toBe(true);
    });

    test('should return false otherwise', () => {
      expect(Arr.isList([1, 2, 3])).toBe(false);
    });
  });

  describe('chunk', () => {
    test('should split array into chunks', () => {
      expect(Arr.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
  });

  describe('merge / mergeCompact', () => {
    test('should merge arrays', () => {
      expect(Arr.merge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('should merge and compact arrays', () => {
      expect(Arr.mergeCompact([1, 0], [false, 2])).toEqual([1, 2]);
    });
  });

  describe('random', () => {
    test('should return a random item from array', () => {
      const result = Arr.random(['a', 'b', 'c']);
      expect(['a', 'b', 'c']).toContain(result);
    });

    test('should return undefined for empty array', () => {
      expect(Arr.random([])).toBeUndefined();
    });
  });

  describe('range', () => {
    test('should generate ascending range', () => {
      expect(Arr.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    test('should generate descending range', () => {
      expect(Arr.range(5, 1)).toEqual([5, 4, 3, 2, 1]);
    });

    test('should handle step', () => {
      expect(Arr.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test('should return empty for step = 0', () => {
      expect(Arr.range(1, 5, 0)).toEqual([]);
    });
  });

  describe('shuffle', () => {
    test('should return array with same elements but possibly different order', () => {
      const input = [1, 2, 3, 4];
      const result = Arr.shuffle(input);
      expect(result.sort()).toEqual(input.sort());
      expect(result).not.toBe(input);
    });
  });

  describe('sort', () => {
    test('should sort ascending by default', () => {
      expect(Arr.sort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('should sort descending', () => {
      expect(Arr.sort([3, 1, 2], 'desc')).toEqual([3, 2, 1]);
    });
  });

  describe('unique', () => {
    test('should remove duplicate items', () => {
      expect(Arr.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test('should handle non-array input', () => {
      expect(Arr.unique('a')).toEqual(['a']);
    });

    test('should return empty for null input', () => {
      expect(Arr.unique(null)).toEqual([]);
    });
  });
});

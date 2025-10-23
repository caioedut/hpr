import * as Util from '../src/helpers/Util';

describe('Util', () => {
  describe('coalesce', () => {
    test('should return first non-empty value', () => {
      expect(Util.coalesce(null, undefined, '', 5, 10)).toBe(5);
      expect(Util.coalesce('', 'a', 'b')).toBe('a');
    });

    test('should return undefined if all values are empty', () => {
      expect(Util.coalesce(null, undefined, '', [])).toBeUndefined();
    });
  });

  describe('isEmpty', () => {
    test('should return true for null, undefined, and empty string', () => {
      expect(Util.isEmpty(null)).toBe(true);
      expect(Util.isEmpty(undefined)).toBe(true);
      expect(Util.isEmpty('')).toBe(true);
    });

    test('should return true for empty array or object', () => {
      expect(Util.isEmpty([])).toBe(true);
      expect(Util.isEmpty({})).toBe(true);
    });

    test('should return true for empty Map or Set', () => {
      expect(Util.isEmpty(new Map())).toBe(true);
      expect(Util.isEmpty(new Set())).toBe(true);
    });

    test('should return false for non-empty values', () => {
      expect(Util.isEmpty(0)).toBe(false);
      expect(Util.isEmpty(false)).toBe(false);
      expect(Util.isEmpty([1])).toBe(false);
      expect(Util.isEmpty({ a: 1 })).toBe(false);
      expect(Util.isEmpty(new Set([1]))).toBe(false);
    });
  });

  describe('isEqual', () => {
    test('should return true for equal primitives', () => {
      expect(Util.isEqual(1, 1)).toBe(true);
      expect(Util.isEqual('a', 'a')).toBe(true);
      expect(Util.isEqual(true, true)).toBe(true);
    });

    test('should return false for different primitives', () => {
      expect(Util.isEqual(1, 2)).toBe(false);
      expect(Util.isEqual('a', 'b')).toBe(false);
      expect(Util.isEqual(true, false)).toBe(false);
    });

    test('should return true for equal dates', () => {
      const d1 = new Date('2023-01-01');
      const d2 = new Date('2023-01-01');
      expect(Util.isEqual(d1, d2)).toBe(true);
    });

    test('should return false for different dates', () => {
      const d1 = new Date('2023-01-01');
      const d2 = new Date('2024-01-01');
      expect(Util.isEqual(d1, d2)).toBe(false);
    });

    test('should handle null and non-object values correctly', () => {
      expect(Util.isEqual(null, {})).toBe(false);
      expect(Util.isEqual({}, null)).toBe(false);
      expect(Util.isEqual(null, null)).toBe(true);
    });

    test('should return true for deeply equal objects', () => {
      const a = { x: 1, y: { z: 2 } };
      const b = { x: 1, y: { z: 2 } };
      expect(Util.isEqual(a, b)).toBe(true);
    });

    test('should return false for deeply different objects', () => {
      const a = { x: 1, y: { z: 2 } };
      const b = { x: 1, y: { z: 3 } };
      expect(Util.isEqual(a, b)).toBe(false);
    });

    test('should return false for objects with different keys', () => {
      const a = { a: 1 };
      const b = { b: 1 };
      expect(Util.isEqual(a, b)).toBe(false);
    });

    test('should return true for equal arrays', () => {
      expect(Util.isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    test('should return false for different arrays', () => {
      expect(Util.isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });
  });

  describe('memoize', () => {
    test('should cache function results', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = Util.memoize(fn);

      expect(memoized(2)).toBe(4);
      expect(memoized(2)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('sleep', () => {
    test('should resolve after specified time', async () => {
      const start = Date.now();
      await Util.sleep(100);
      expect(Date.now() - start).toBeGreaterThanOrEqual(100);
    });
  });

  describe('tryCatch', () => {
    test('should return [result, null] for successful function', () => {
      const [res, err] = Util.tryCatch(() => 10);
      expect(res).toBe(10);
      expect(err).toBeNull();
    });

    test('should return [null, error] for thrown error', () => {
      const [res, err] = Util.tryCatch(() => {
        throw new Error('fail');
      });
      expect(res).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toBe('fail');
    });

    test('should convert non-Error throwables to Error instance', () => {
      const [res, err] = Util.tryCatch(() => {
        throw 'string error';
      });
      expect(res).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toBe('string error');
    });
  });

  describe('tryCatchAsync', () => {
    test('should return [result, null] for resolved promise', async () => {
      const [res, err] = await Util.tryCatchAsync(async () => 42);
      expect(res).toBe(42);
      expect(err).toBeNull();
    });

    test('should return [null, error] for rejected promise', async () => {
      const [res, err] = await Util.tryCatchAsync(async () => {
        throw new Error('async fail');
      });
      expect(res).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toBe('async fail');
    });

    test('should convert non-Error rejection to Error', async () => {
      const [res, err] = await Util.tryCatchAsync(async () => {
        throw 'bad';
      });
      expect(res).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toBe('bad');
    });
  });
});

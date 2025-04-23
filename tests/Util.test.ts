import * as Util from '../src/helpers/Util';

describe('Util', () => {
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
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      expect(Util.isEqual(date1, date2)).toBe(true);
    });

    test('should return false for different dates', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2024-01-01');
      expect(Util.isEqual(date1, date2)).toBe(false);
    });

    test('should return false when one is null or not an Utilect', () => {
      expect(Util.isEqual(null, {})).toBe(false);
      expect(Util.isEqual({}, null)).toBe(false);
      expect(Util.isEqual(null, null)).toBe(true);
    });

    test('should return true for deeply equal Utilects', () => {
      const Util1 = { a: 1, b: { c: 2 } };
      const Util2 = { a: 1, b: { c: 2 } };
      expect(Util.isEqual(Util1, Util2)).toBe(true);
    });

    test('should return false for deeply different Utilects', () => {
      const Util1 = { a: 1, b: { c: 2 } };
      const Util2 = { a: 1, b: { c: 3 } };
      expect(Util.isEqual(Util1, Util2)).toBe(false);
    });

    test('should return false if Utilect keys length differ', () => {
      const Util1 = { a: 1, b: 2 };
      const Util2 = { a: 1 };
      expect(Util.isEqual(Util1, Util2)).toBe(false);
    });

    test('should return false if Utilect keys are different', () => {
      const Util1 = { a: 1 };
      const Util2 = { b: 1 };
      expect(Util.isEqual(Util1, Util2)).toBe(false);
    });

    test('should handle arrays correctly', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];
      const arr3 = [1, 2, 4];
      expect(Util.isEqual(arr1, arr2)).toBe(true);
      expect(Util.isEqual(arr1, arr3)).toBe(false);
    });
  });
});

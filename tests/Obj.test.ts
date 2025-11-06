import * as Obj from '../src/helpers/Obj';

describe('Obj', () => {
  describe('match', () => {
    it('should return the value when key exists', () => {
      const obj = { age: 30, name: 'John' };
      expect(Obj.match(obj, 'name')).toBe('John');
      expect(Obj.match(obj, 'age')).toBe(30);
    });

    it('should return default value when key doesnt exist', () => {
      const obj = {
        colors: ['red', 'blue'],
        default: 'no-color',
      };
      expect(Obj.match(obj, 'colors')).toEqual(['red', 'blue']);
      expect(Obj.match(obj, 'theme')).toBe('no-color');
    });

    it('should return undefined when no key and no default', () => {
      const obj = { title: 'Test' };
      expect(Obj.match(obj, 'title')).toBe('Test');
      expect(Obj.match(obj, 'missing')).toBeUndefined();
    });

    it('should work with different value types', () => {
      const obj = {
        active: true,
        count: 10,
        default: null,
      };

      expect(Obj.match(obj, 'count')).toBe(10);
      expect(Obj.match(obj, 'active')).toBe(true);
      expect(Obj.match(obj, 'missing')).toBeNull();
    });

    it('should preserve type information', () => {
      const obj = {
        default: 'default-value',
        id: 123,
        name: 'Test',
      };

      // Teste de tipos (o TypeScript irá verificar)
      const id: number | string = Obj.match(obj, 'id');
      const name: string = Obj.match(obj, 'name');
      const missing = Obj.match(obj, 'unknown');

      expect(id).toBe(123);
      expect(name).toBe('Test');
      expect(missing).toBe('default-value');
    });

    it('should return default for non-string keys when default exists', () => {
      const obj = { a: 1, default: 'default-value' };
      expect(Obj.match(obj, 42)).toBe('default-value');
      expect(Obj.match(obj, true)).toBe('default-value');
    });

    it('should handle undefined or null values correctly', () => {
      const obj = { a: undefined, b: null, default: 'default' };
      expect(Obj.match(obj, 'a')).toBeUndefined();
      expect(Obj.match(obj, 'b')).toBeNull();
      expect(Obj.match(obj, 'missing')).toBe('default');
    });

    it('should work with empty object but default exists', () => {
      const obj = { default: 'only-default' };
      expect(Obj.match(obj, 'anything')).toBe('only-default');
    });

    it('should return complex default values correctly', () => {
      const obj = { default: [1, 2, 3] };
      expect(Obj.match(obj, 'missing')).toEqual([1, 2, 3]);
    });
  });

  describe('omit', () => {
    test('should remove specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = Obj.omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('should return same object if keys array is empty', () => {
      const obj = { a: 1, b: 2 };
      const result = Obj.omit(obj, []);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('should ignore keys not in object', () => {
      const obj = { a: 1 };
      const result = Obj.omit(obj, ['b' as any]);
      expect(result).toEqual({ a: 1 });
    });
  });

  describe('pick', () => {
    test('should return object with only specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = Obj.pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('should return empty object if keys array is empty', () => {
      const obj = { a: 1, b: 2 };
      const result = Obj.pick(obj, []);
      expect(result).toEqual({});
    });

    test('should skip keys not in object', () => {
      const obj = { a: 1 };
      const result = Obj.pick(obj, ['a', 'b' as any]);
      expect(result).toEqual({ a: 1 });
    });
  });
});

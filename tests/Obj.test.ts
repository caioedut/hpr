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
      // @ts-expect-error
      expect(Obj.match(obj, 'theme')).toBe('no-color');
    });

    it('should return undefined when no key and no default', () => {
      const obj = { title: 'Test' };
      expect(Obj.match(obj, 'title')).toBe('Test');
      // @ts-expect-error
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
      // @ts-expect-error
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
      // @ts-expect-error
      const missing: string = Obj.match(obj, 'unknown');

      expect(id).toBe(123);
      expect(name).toBe('Test');
      expect(missing).toBe('default-value');
    });
  });
});

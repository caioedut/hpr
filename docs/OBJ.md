# Obj

Object manipulation and utility functions with TypeScript safety.
<br/>
Call using `Obj.*()` syntax (e.g., `Obj.pick(obj, ['key'])`).

### Import
```ts
import { Obj } from 'hpr';
```

---

### `match()`

Safely retrieves a property from an object, falling back to a `default` property when the key does not exist. Fully typed in TypeScript to preserve type information.

## Syntax

```typescript
function match(obj: object, key: any)
```

**Parameters**

* `obj: T` — The object to retrieve the value from. May include a `default` property.
* `key: K | any` — The key to retrieve. Can be any type if `default` exists.

**Return Value**

* Returns the value of the property if it exists.
* Returns the `default` value if the key does not exist and `default` is defined.
* Returns `undefined` if the key does not exist and `default` is not defined.

**Examples**

```ts
const obj1 = { default: 'def', a: 123, b: true };
const obj2 = { x: 10, y: 20 };

// Key exists
Obj.match(obj1, 'a'); // 123
Obj.match(obj2, 'x'); // 10

// Key does not exist, default exists
Obj.match(obj1, 'missing'); // 'def'

// Key does not exist, no default
Obj.match(obj2, 'missing'); // undefined

// Non-string keys
Obj.match(obj1, 42); // 'def'
Obj.match(obj1, true); // 'def'
```

---

### `omit()`
Removes specific keys from an object and returns a new object without them.

```typescript
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
```

**Examples**

```typescript
Obj.omit({ a: 1, b: 2, c: 3 }, ['a']);
// { b: 2, c: 3 }

Obj.omit({ name: 'John', age: 30, active: true }, ['age', 'active']);
// { name: 'John' }
```

---

### `pick()`
Selects specific keys from an object and returns a new object containing only those properties.

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

**Examples**

```typescript
Obj.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
// { a: 1, c: 3 }

Obj.pick({ name: 'John', age: 30, active: true }, ['name']);
// { name: 'John' }
```

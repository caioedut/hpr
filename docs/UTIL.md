# Util

A collection of general-purpose utility functions for value inspection, comparison, and flow control.
<br/>
Call using `Util.*()` syntax (e.g., `Util.isEmpty(value)`).

### Import
```ts
import { Util } from 'hpr';
```

---

### `coalesce()`
Returns the first non-empty value from the provided list of values.
A value is considered non-empty based on a custom `isEmpty` check.

```typescript
function coalesce<T>(...values: unknown[]): T | undefined;
```

**Examples**
```typescript
Util.coalesce(user.firstName, user.nickname, 'Guest');
Util.coalesce(null, 0, undefined, 'hello'); // 0
Util.coalesce(null, undefined, '', []); // undefined
```

---

### `isEmpty()`
Checks if a value is considered "empty".

A value is considered empty if it is:
- `null` or `undefined`;
- An empty string (`''`);
- An empty array (`[]`);
- An empty object (`{}`);
- An empty `Map` or `Set`.

> ⚠️ Note: Values like `0` (zero) and `false` are **NOT** considered empty.

```typescript
function isEmpty(value: any): boolean;
```

**Examples**
```typescript
Util.isEmpty(null); // true
Util.isEmpty(''); // true
Util.isEmpty([]); // true
Util.isEmpty({}); // true
Util.isEmpty(0); // false
Util.isEmpty(false); // false
```

---

### `isEqual()`
Performs a deep comparison between two values to determine if they are equivalent. It handles objects, arrays, primitive types, and `Date` objects.

```typescript
function isEqual(a: any, b: any): boolean;
```

**Examples**
```typescript
Util.isEqual(1, 1); // true
Util.isEqual({ a: 1 }, { a: 1 }); // true
Util.isEqual([1, 2], [1, 2]); // true
Util.isEqual([2, 1], [1, 2]); // false (array with same values in different order)
Util.isEqual(new Date('2023-01-01'), new Date('2023-01-01')); // true
```

---

### `memoize()`
Caches the result of a synchronous function based on its arguments. Useful for optimizing expensive computations by preventing repeated execution with the same inputs.

```typescript
function memoize<T extends (...args: any[]) => any>(fn: T): T;
```

**Examples**
```typescript
const memoizedFn = Util.memoize((a, b) => a + b);

memoizedFn(1, 2); // Function runs, result is cached
memoizedFn(1, 2); // Result returned from cache (much faster)
```

---

### `sleep()`
Returns a promise that resolves after a specified number of milliseconds. Useful for pausing execution in `async` functions.

```typescript
async function sleep(ms: number): Promise<void>;
```

**Examples**
```typescript
// Inside an async function:
await Util.sleep(1000); // Pauses for 1 second
```

---

### `tryCatch()` / `tryCatchAsync()`
Safely executes a function (synchronous or asynchronous) and returns a tuple `[result, error]`. This is an alternative to traditional try/catch blocks.

- If successful, returns `[result, null]`.
- If an error occurs, returns `[null, Error]`.

```typescript
function tryCatch<T>(fn: () => T): [null, Error] | [T, null];
async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<[null, Error] | [T, null]>;
```

**Examples**
```typescript
// Synchronous
// `data` will be `{}` and `error` will be null
const [data, error] = Util.tryCatch(() => JSON.parse('{}'));

// `data` will be null and `error` will be an instance of `Error`
const [data, error] = Util.tryCatch(() => JSON.parse('invalid'));

// Asynchronous
// `data` will be filled and `error` will be null
const [data, error] = await Util.tryCatchAsync(() => fetch('/success'));

// `data` will be null and `error` will be an instance of `Error`
const [data, error] = await Util.tryCatchAsync(() => fetch('/fail'));
```

---

# Arr

Array manipulation, formatting, and validation with TypeScript safety.
<br/>
Call using `Arr.*()` syntax (e.g., `Arr.from({ length: 5 })`).

### Import
```ts
import { Arr } from 'hpr';
```

### Core Type
```typescript
type ArrayInput = any;
```

---

### `from()`
Converts any value into an array of objects.
This is the core utility used across all `Arr.*` functions to normalize input.
It ensures consistent behavior when dealing with single values, arrays, or iterable objects.
Always use `from()` to safely prepare data before performing array operations.

> ⚠️ If the input is already an array, `from()` returns the same array **by reference**.
> To avoid mutation, use `clone()` instead.

```typescript
function from<T = any>(input: ArrayInput): T[];
```

**Examples**
```typescript
Arr.from(5); // [5]
Arr.from([1, 2, 3]); // [1, 2, 3] ← same reference
Arr.from(new Set(["a", "b"])); // ["a", "b"]
Arr.from(null); // []
```

---

### `clone()`
Creates a shallow copy of the array-like input.
Uses `from()` internally to ensure consistency with any array input format.

```typescript
function clone<T = any>(input: ArrayInput): T[];
```

**Examples**
```typescript
Arr.clone([1, 2, 3]); // [1, 2, 3]
Arr.clone("x"); // ["x"]
```

---

### `chunk()`
Splits the input into chunks of the specified size.
Each chunk is a shallow copy of a portion of the original array.

```typescript
function chunk<T = any>(input: ArrayInput, size: number): T[][];
```

**Examples**
```typescript
Arr.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
Arr.chunk("abcde", 3); // [["a", "b", "c"], ["d", "e"]]
```

---

### `compact()`
Removes falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`) from the array.

```typescript
function compact<T = any>(input: ArrayInput): T[];
```

**Examples**
```typescript
Arr.compact([0, 1, false, 2, "", 3]); // [1, 2, 3]
Arr.compact(null); // []
```

---

### `contains()`
Checks if a value or condition exists in the array.

```typescript
function contains<T = any>(
  input: ArrayInput,
  valueOrHandler: ((item: T, index: number) => boolean) | T
): boolean;
```

**Examples**
```typescript
Arr.contains([1, 2, 3], 2); // true
Arr.contains(["a", "b"], (item) => item === "c"); // false
```

---

### `first()` / `last()`
Returns the first or last item from the array.

```typescript
function first<T = any>(input: ArrayInput): T | undefined;
function last<T = any>(input: ArrayInput): T | undefined;
```

**Examples**
```typescript
Arr.first([10, 20, 30]); // 10
Arr.last([10, 20, 30]); // 30
```

---

### `isArray()`
Checks if the input is a native JavaScript array.

```typescript
function isArray(input: ArrayInput): boolean;
```

**Example**
```typescript
Arr.isArray([1, 2, 3]); // true
Arr.isArray("not an array"); // false
```

---

### `isList()`
Checks if the array is a numeric list where item value equals its index.

```typescript
function isList<T = any>(input: ArrayInput): boolean;
```

**Examples**
```typescript
Arr.isList([0, 1, 2]); // true
Arr.isList([1, 2, 3]); // false
```

---

### `merge()` / `mergeCompact()`
Combines multiple array-like inputs into one.
`mergeCompact()` also removes falsy values from the result.

```typescript
function merge<T = any>(...inputs: ArrayInput[]): T[];
function mergeCompact<T = any>(...inputs: ArrayInput[]): T[];
```

**Examples**
```typescript
Arr.merge([1, 2], [3, 4]); // [1, 2, 3, 4]
Arr.mergeCompact([1, 0], [false, 2]); // [1, 2]
```

---

### `random()`
Returns a random item from the array.

```typescript
function random<T = any>(input: ArrayInput): T | undefined;
```

**Example**
```typescript
Arr.random(["a", "b", "c"]); // "b" (random)
```

---

### `range()`
Generates a numeric range from start to end (inclusive).
Supports ascending and descending ranges.

```typescript
function range(start: number, end: number, step?: number): number[];
```

**Examples**
```typescript
Arr.range(1, 5); // [1, 2, 3, 4, 5]
Arr.range(5, 1); // [5, 4, 3, 2, 1]
Arr.range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
```

---

### `shuffle()`
Randomly shuffles the items in the array.

```typescript
function shuffle<T = any>(input: ArrayInput): T[];
```

**Example**
```typescript
Arr.shuffle([1, 2, 3]); // [3, 1, 2] (random)
```

---

### `sort()`
Sorts the array in ascending or descending order.

```typescript
function sort<T = any>(input: ArrayInput, direction?: 'asc' | 'desc'): T[];
```

**Examples**
```typescript
Arr.sort([3, 1, 2]); // [1, 2, 3]
Arr.sort([3, 1, 2], "desc"); // [3, 2, 1]
```

---

# Collection

Collection is a class that works with an **array of objects**, providing a rich and fluent interface for manipulating data.

It offers a variety of methods for traversing, modifying, and querying the collection, enabling flexible and powerful data handling in TypeScript.
<br/>
Call using `Collection.from([])` or `new Collection([])`.

### Import
```ts
import { Collection } from 'hpr';
```

### Core Type
```typescript
type CollectionItem = Record<string, any>;
```

---

### from()
Creates a new Collection instance from an array or single item. This is the **primary constructor** and is used internally by all other methods that return new Collections.

```typescript
function from<T extends CollectionItem>(input: T | T[]): Collection<T>;
```

**Importance**
- Entry point for all collection operations
- Handles both single items and arrays seamlessly
- Ensures immutability by creating new instances

**Examples**
```typescript
Collection.from([1, 2, 3]);
Collection.from({ id: 1 });
```

---

### clone()
Creates a deep clone preserving all object types (Date, Map, Set, etc.). Essential for safe data manipulation.

```typescript
function clone(): Collection<T>;
```

**Key Features**
- Handles circular references
- Preserves prototypes
- Recursively clones nested structures

**Examples**
```typescript
const original = Collection.from([{ data: new Date() }]);
const cloned = original.clone();
```

---

### at() / first() / last()
Gets items by position.

```typescript
function at(index: number): T | undefined;
function first(): T | undefined;
function last(): T | undefined;
```

**Examples**
```typescript
collection.at(2);
collection.first();
collection.last();
```

### where() / firstWhere() / lastWhere()
Core filtering methods for collection queries.

```typescript
// Returns new filtered collection
function where(
  condition: ((item: T) => boolean) | Partial<T>,
  strict?: boolean
): Collection<T>;

// Returns first match (or undefined)
function firstWhere(
  condition: ((item: T) => boolean) | Partial<T>,
  strict?: boolean
): T | undefined;

// Returns last match (or undefined)
function lastWhere(
  condition: ((item: T) => boolean) | Partial<T>,
  strict?: boolean
): T | undefined;
```

**Key Features**
- **Dual syntax**: Accepts both callback functions and key-value objects
- **Strict mode**: Toggle between `===` (default) and `==` comparison
- **Chainable**: `where()` returns new Collection for method chaining
- **Early exit**: `firstWhere`/`lastWhere` stop at first match

**Examples**
```typescript
// Basic filtering
activeUsers = users.where({ status: 'active' });

// Complex logic
highValueOrders = orders.where(
  (order, index) => order.total > 1000 && index < 10
);

// Find operations
firstAdmin = users.firstWhere({ role: 'admin' });
lastDiscount = products.lastWhere({ onSale: true }, false); // loose equality
```

**Real-world Patterns**
```typescript
// Chained filtering
const result = inventory
  .where({ category: 'electronics' })
  .where(item => item.stock > 0)
  .firstWhere({ available: true });

// Safe navigation
const userName = users
  .firstWhere({ id: 123 })
  ?.name || 'Unknown';
```

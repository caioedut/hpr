# Num

Number manipulation, formatting, and validation with TypeScript safety.
<br/>
Call using `Num.*()` syntax (e.g., `Num.from('42,55')`).

### Import
```ts
import { Num } from 'hpr';
```

### Core Type
```typescript
type NumberInput = any;
```

---

### `from()`
Converts any input to a number.

```typescript
function from(input: NumberInput): number;
```

**Key Features**:
- Decimal separators (`.` or `,`)
- Thousand separators (`,` or `.`)
- Returns `0` for unparseable values
- Used internally by all Num methods

**Examples**
```typescript
Num.from("1,234.56");  // 1234.56
Num.from("1.234,56");  // 1234.56
Num.from("invalid");   // 0
Num.from(null);        // 0
Num.from([]);          // 0
Num.from([1]);         // 1
```

---

### `clamp()`
Restricts a value between min/max bounds.

```typescript
function clamp(input: NumberInput, min: NumberInput, max: NumberInput): number;
```

**Examples**
```typescript
Num.clamp(15, 0, 10);     // 10
Num.clamp(-5, 0, 10);     // 0
Num.clamp("7", "5", "9"); // 7 (number parsing)
Num.clamp(3, 5, 1);       // 1 (auto-corrects swapped bounds)
```

---

### `currency()`
Formats numbers as locale-aware currency strings.

```typescript
function currency(input: NumberInput, options?: NumberCurrencyOptions): string;
```

**Examples**
```typescript
// Default USD formatting
Num.currency(1234.5); // "$1,234.50"

// Explicit currency and locale
Num.currency(1000, {
  currency: 'BRL',
  locale: 'pt-BR'
}); // "R$1.000,00"

// Euro with German formatting
Num.currency("1.234,56", {
  currency: 'EUR',
  locale: 'de-DE'
}); // "1.234,56 €"
```

**Options**
```typescript
interface NumberCurrencyOptions {
  currency?: string;  // ISO 4217 currency code (e.g. 'USD', 'EUR')
  locale?: string;    // BCP 47 locale tag (e.g. 'en-US', 'pt-BR')
}
```

---

### `format()`
Formats numbers with locale-aware decimal precision.

```typescript
function format(input: NumberInput, options?: NumberFormatOptions): string;
```

**Examples**
```typescript
Num.format(1234.5678); // "1,234.57"
Num.format(1.23456, { precision: 3 }); // "1.235"
Num.format("1,234", { locale: 'fr-FR' }); // "1 234,00"
```

**Options**
```typescript
interface NumberFormatOptions {
  locale?: string;           // BCP 47 locale tag (e.g. 'en-US', 'pt-BR')
  precision?: number;        // Fixed decimal places
  maxPrecision?: number;     // Maximum decimal places
}
```

---

### `isNumber()` / `isNumeric()`
Number validation utilities.

```typescript
function isNumber(input: any): boolean;
function isNumeric(input: NumberInput): boolean;
```

**Examples**
```typescript
Num.isNumber(42);       // true (number type)
Num.isNumber("42");     // false
Num.isNumeric("42");    // true (coercible)
Num.isNumeric("1.23");  // true
Num.isNumeric("10px");  // false
```

**Comparison: `isNumber` vs `isNumeric`**:
- `isNumber`: Strict type check (excludes strings)
- `isNumeric`: Loose check (allows numeric strings)

| Feature                | `isNumber`       | `isNumeric`        |
|------------------------|------------------|--------------------|
| **Type Check**         | Must be `number` | Any convertible    |
| **Accepts Strings**    | ❌ No             | ✅ Yes              |
| **Rejects `NaN`**      | ✅ Yes            | ✅ Yes              |
| **Rejects `Infinity`** | ❌ No             | ✅ Yes              |
| **Use Case**           | Type validation  | Input sanitization |

**When to Use**:
- `isNumber`: Checking function arguments
- `isNumeric`: Validating user input (forms, APIs)

---

### `max()` / `min()`
Finds the highest/lowest value in a set of numbers.

```typescript
function max(...inputs: NumberInput[]): number;
function min(...inputs: NumberInput[]): number;
```

**Examples**
```typescript
Num.max(1, 5, 3);          // 5
Num.min("2", "4", "1");    // 1
Num.max(10, null, 20);     // 20 (ignores null)
Num.min([]);               // Infinity (empty set)
```

**Behavior**:
- Ignores `null`/`undefined` values
- Converts number strings automatically
- Returns `-Infinity` (max) / `Infinity` (min) for empty inputs
- Handles all `NumberInput` types (number/string)

---

### `negative()` / `positive()`
Converts numbers to their signed equivalents.

```typescript
function negative(input: NumberInput): number;
function positive(input: NumberInput): number;
```

**Examples**
```typescript
Num.positive(-5);      // 5
Num.negative(3);       // -3
Num.positive("2.5");   // 2.5
Num.negative(0);       // 0 (unchanged)
Num.positive(-0);      // 0
```

---

### `percent()`
Calculates the percentage of a value relative to a total.

Returns 0 if the total is 0 or negative.

```typescript
function percent(input: NumberInput, total: NumberInput, precision: NumberInput): number;
```

**Examples**
```typescript
Num.percent(1, 100);   // 1
Num.percent(1, 50);    // 2
Num.percent(5, 12);    // 41
Num.percent(5, 12, 1); // 41.67
```

---

### `random()`
Generates a random integer within a range (inclusive).

```typescript
function random(min: NumberInput, max: NumberInput): number;
```

**Examples**
```typescript
Num.random(1, 10);     // 7 (example)
Num.random(0, 100);    // 42 (example)
Num.random("5", "10"); // 8 (example)
Num.random(3, 3);      // 3
```

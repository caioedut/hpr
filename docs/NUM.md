# Num

Static methods for safe number manipulation, formatting, and validation.
<br/>
Call using `Num.*()` syntax (e.g., `Num.clamp()`).

```ts
import { Num } from 'hpr';
```

> **Key Foundation**:
> <br/>
> All methods use `Num.from()` internally - the **core sanitizer** that:
> <br/>
> ✔ Converts any input to a valid number
> <br/>
> ✔ Returns `0` for invalid inputs (e.g., `NaN`)

---

## 🔢 Core Conversion

### `from()`
The foundation: safely converts any input to number (invalid → 0).

```typescript
static from(input: NumberInput): number;
```

**Key Features**:
- Auto-detects decimal/thousand separators
- Fallback to `0` for NaN values
- Unifies number handling across methods

**Examples**
```typescript
Num.from("1.234,56"); // 1234.56
Num.from("1,234.56"); // 1234.56
Num.from("invalid");  // 0
Num.from(null);       // 0
Num.from({});         // 0
Num.from([0]);        // 0
Num.from([1]);        // 1
```

---

### `negative()` / `positive()`
Converts to negative/positive equivalent.

```typescript
static negative(input: NumberInput): number;
static positive(input: NumberInput): number;
```

**Examples**
```typescript
Num.positive(-5); // 5
Num.negative("3"); // -3
```

---

## 📏 Value Control

### `clamp()`
Restricts value between min/max.

```typescript
static clamp(input: NumberInput, min: NumberInput, max: NumberInput): number;
```

**Example**
```typescript
Num.clamp(15, 0, 10); // 10
```

---

### `min()` / `max()`
Returns smallest/largest value.

```typescript
static min(...inputs: NumberInput[]): number;
static max(...inputs: NumberInput[]): number;
```

**Examples**
```typescript
Num.min(2, 0, 1); // 0
Num.max(2, 5, 1); // 5
```

---

## 💰 Formatting

### `currency()`
Formats as currency string.

```typescript
static currency(input: any, options?: NumberCurrencyOptions): string;
```

**Example**
```typescript
Num.currency(1000, { currency: 'BRL' }); // "R$ 1.000,00"
```

---

## 🔍 Validation

### `isNumber()`
Strict type check (only primitive numbers, excluding NaN).

```typescript
static isNumber(input: any): boolean;
```

**Example**
```typescript
Num.isNumber(42);     // true
Num.isNumber("42");   // false
Num.isNumber(NaN);    // false
```

---

### `isNumeric()`
Checks if convertible to a finite number (including strings).

```typescript
static isNumeric(input: NumberInput): boolean;
```

**Example**
```typescript
Num.isNumeric("42");    // true
Num.isNumeric("1.23");  // true
Num.isNumeric("10px");  // false
```

### Comparison: `isNumber` vs `isNumeric`
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

## 🎲 Randomization

### `random()`
Generates random integer.

```typescript
static random(min: NumberInput, max: NumberInput): number;
```

**Example**
```typescript
Num.random(1, 100); // 57 (example)
```

---

## 🏷️ Type Definitions
```typescript
type NumberInput = number | string;

interface NumberCurrencyOptions {
  currency?: string;
  locale?: Intl.LocalesArgument;
}

interface NumberFormatOptions {
  locale?: Intl.LocalesArgument;
  precision?: number;
  maxPrecision?: number;
}
```

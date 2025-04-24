# Str

String manipulation, formatting, and validation with TypeScript safety.
<br/>
Call using `Str.*()` syntax (e.g., `Str.from(42)`).

### Import
```ts
import { Str } from 'hpr';
```

### Core Type
```typescript
type StringInput = any;
```

---

### `from()`
Converts any input to string.

```typescript
function from(input: StringInput): string;
```

**Key Features**:
- Converts any input to string (null/undefined → "")
- Handles objects/arrays automatically
- Used internally by all Str methods

**Examples**
```typescript
Str.from(null);              // ""
Str.from({ key: 42 });       // '{"key":42}'
Str.from([1, 2]);            // "1,2"
```

---

### `after()` / `before()`
Extracts segments relative to first match.

```typescript
function after(input: StringInput, search: StringInput): string;
function before(input: StringInput, search: StringInput): string;
```

**Examples**
```typescript
Str.after("2023-01-15", "-");    // "01-15"
Str.before("user@domain", "@");   // "user"
```

---

### `afterLast()` / `beforeLast()`
Extracts segments relative to last match.

```typescript
function afterLast(input: StringInput, search: StringInput): string;
function beforeLast(input: StringInput, search: StringInput): string;
```

**Examples**
```typescript
Str.afterLast("a/b/c", "/");     // "c"
Str.beforeLast("file.txt.zip", "."); // "file.txt"
```

---

### `between()` / `betweenLast()`
Extracts text between delimiters.

```typescript
function between(input: StringInput, start: StringInput, end: StringInput): string;
function betweenLast(input: StringInput, start: StringInput, end: StringInput): string;
```

**Examples**
```typescript
Str.between("[test]", "[", "]");         // "test"
Str.betweenLast("(a)(b)", "(", ")");     // "b"
```

---

### `ascii()`
Converts Unicode to ASCII.

```typescript
function ascii(input: StringInput): string;
```

**Example**
```typescript
Str.ascii("Déjà Vu"); // "Deja Vu"
```

---

### `base64()`
Base64 encoding.

```typescript
function base64(input: StringInput): string;
```

---

### `camelCase()` / `snakeCase()` / `kebabCase()` / `properCase()`
Case conversion utilities.

```typescript
function camelCase(input: StringInput): string;
function snakeCase(input: StringInput, separator?: string): string;
function kebabCase(input: StringInput): string;
function properCase(input: StringInput): string;
```

**Examples**
```typescript
Str.camelCase("hello_world");    // "helloWorld"
Str.kebabCase("HelloWorld");     // "hello-world"
```

---

### `chopStart()` / `chopEnd()`
Removes prefixes/suffixes.

```typescript
function chopStart(input: StringInput, needle: StringInput|StringInput[]): string;
function chopEnd(input: StringInput, needle: StringInput|StringInput[]): string;
```

**Examples**
```typescript
Str.chopStart("__test", "_");     // "test"
Str.chopEnd("file.txt", ".txt");  // "file"
```

---

### `color()` / `colorPastel()`
Generates HEX colors from strings.

```typescript
function color(input: StringInput): string;
function colorPastel(input: StringInput): string;
```

**Example**
```typescript
Str.color("hello"); // "#5a3b2c"
```

---

### `contains()` / `containsAll()` / `doesntContain()`
Substring checks.

```typescript
function contains(input: StringInput, needles: StringInput|StringInput[], ignoreCase?: boolean): boolean;
function containsAll(input: StringInput, needles: StringInput[], ignoreCase?: boolean): boolean;
function doesntContain(input: StringInput, needles: StringInput|StringInput[], ignoreCase?: boolean): boolean;
```

**Examples**
```typescript
Str.contains("Hello", ["ell", "ELL"]);        // true
Str.containsAll("Hello", ["Hello", "world"]); // false
Str.doesntContain("Hello", "world");          // true
```

---

### `deduplicate()`
Collapses repeated characters.

```typescript
function deduplicate(input: StringInput, character?: string): string;
```

---

### `endsWith()` / `startsWith()`
Prefix/suffix verification.

```typescript
function endsWith(input: StringInput, needles: StringInput|StringInput[]): boolean;
function startsWith(input: StringInput, needles: StringInput|StringInput[]): boolean;
```

---

### `escapeRegExp()`
Escapes special regex characters for safe pattern usage.

```typescript
function escapeRegExp(input: StringInput): string;
```

**Escapes**: `. * + ? | ( ) [ ] { } ^ $ \`

**Example**
```typescript
Str.escapeRegExp("file.txt"); // "file\\.txt"
Str.escapeRegExp("(test)");   // "\\(test\\)"
```

---

### `indexToAlpha()` / `alphaToIndex()`
Converts between numeric indices and alphabetic labels, similar to Excel column naming. Useful for mapping numbers to letters (e.g., table columns, spreadsheet logic, or sequential labels).

```typescript
function indexToAlpha(input: StringInput): string;
function alphaToIndex(input: StringInput): number;
```

**Examples**
```typescript
Str.indexToAlpha(0);   // 'A'
Str.indexToAlpha(25);  // 'Z'
Str.indexToAlpha(26);  // 'AA'
Str.indexToAlpha(-2);  // 'C'

Str.alphaToIndex('A');   // 0
Str.alphaToIndex('Z');   // 25
Str.alphaToIndex('AA');  // 26
```

---

### `isAscii()`
Checks if string contains only ASCII characters (0-127).

```typescript
function isAscii(input: StringInput): boolean;
```

**Examples**
```typescript
Str.isAscii("hello"); // true
Str.isAscii("México"); // false
Str.isAscii("日本"); // false
```

---

### `isJson()`
Validates if a string is valid JSON (parses to an object).

```typescript
function isJson(input: StringInput): boolean;
```

**Behavior**:
- Returns `false` for empty/whitespace strings
- Only returns `true` for JSON objects (not primitives)
- Automatically trims input

**Examples**
```typescript
Str.isJson('{"name":"John"}');  // true
Str.isJson('123');             // false (primitives return false)
Str.isJson('  {"x":1}  ');     // true (auto-trimmed)
Str.isJson('[1,2,3]');         // true (arrays are objects)
Str.isJson('invalid');         // false
```

---

### `isString()`
Checks if input is a primitive string.

```typescript
function isString(input: any): boolean;
```

**Examples**
```typescript
Str.isString("text");     // true
Str.isString(123);        // false
Str.isString(new String("test"));  // false (object wrapper)
Str.isString(null);       // false
```

---

### `isUrl()`
Validates if a string is a properly formatted URL.

```typescript
function isUrl(input: StringInput): boolean;
```

**Behavior**:
- Requires protocol (http/https/etc)
- Validates all URL components
- Returns false for malformed URLs

**Examples**
```typescript
Str.isUrl("https://example.com");  // true
Str.isUrl("example.com");         // false (missing protocol)
Str.isUrl("mailto:test@test.com"); // true
Str.isUrl("invalid url");         // false
```

---

### `isUuid()`
Validates if a string is a properly formatted UUID.

```typescript
function isUuid(input: StringInput): boolean;
```

**UUID Format**:
- 8-4-4-4-12 hexadecimal pattern
- Case-insensitive
- Supports versions 1-5

**Examples**
```typescript
Str.isUuid("123e4567-e89b-12d3-a456-426614174000"); // true
Str.isUuid("00000000-0000-0000-0000-000000000000"); // true
Str.isUuid("invalid-uuid"); // false
Str.isUuid("123E4567-E89B-12D3-A456-426614174000"); // true (uppercase)
```

---

### `limit()` / `limitWords()`
Truncates strings with optional ellipsis.

```typescript
function limit(input: StringInput, limit?: number, end?: string, preserveWords?: boolean): string;
function limitWords(input: StringInput, words?: number, end?: string): string;
```

**Examples**
```typescript
Str.limit("Lorem ipsum dolor", 10); // "Lorem ipsu..."
Str.limit("Hello world", 5, "→", true); // "Hello→"
Str.limitWords("One two three", 2); // "One two..."
```

**Behavior**:
- `limit()` counts characters
- `limitWords()` counts word boundaries
- Both preserve trailing space when possible

---

### `lower()` / `upper()`
Case modification.

```typescript
function lower(input: StringInput): string;
function upper(input: StringInput): string;
```

---

### `lowerFirst()` / `upperFirst()`
First character case control.

```typescript
function lowerFirst(input: StringInput): string;
function upperFirst(input: StringInput): string;
```

**Examples**
```typescript
Str.lowerFirst("Hello");    // "hello"
Str.upperFirst("hello");    // "Hello"
```

---

### `lowerFirstWord()` / `upperFirstWord()`
Modifies the case of the first word's first letter.

```typescript
function lowerFirstWord(input: StringInput): string;
function upperFirstWord(input: StringInput): string;
```

**Behavior**:
- Only modifies the first word's first character
- Preserves leading whitespace
- Handles all StringInput types

**Examples**
```typescript
Str.lowerFirstWord("Hello World");  // "hello World"
Str.upperFirstWord("hello world");  // "Hello world"
Str.lowerFirstWord("  Test Case");  // "  test Case"
Str.upperFirstWord("123 test");     // "123 test" (no effect)
```

---

### `mask()`
Replaces a portion of a string with repeating characters.

```typescript
function mask(input: StringInput, character: string, index: number, length?: number): string;
```

**Examples**
```typescript
Str.mask("password123", "*", 2, 5);    // "pa*****23"
Str.mask("secret", "x", -3);           // "secxxx"
Str.mask("test", "-", 10);             // "test"
```

---

### `pad()` / `padStart()` / `padEnd()`
Pads strings to specified length.

```typescript
function pad(input: StringInput, length: number, pad?: string): string;
function padStart(input: StringInput, length: number, pad?: string): string;
function padEnd(input: StringInput, length: number, pad?: string): string;
```

**Examples**
```typescript
Str.pad("hi", 5);          // "  hi  "
Str.padStart("5", 3, "0"); // "005"
Str.padEnd("hi", 4, "!");  // "hi!!"
```

---

### `password()`
Secure password generator.

```typescript
function password(length?: number, options?: StringPasswordOptions): string;
```

**Options**
```typescript
interface StringPasswordOptions {
  letters?: boolean;   // Include letters (default: true)
  numbers?: boolean;   // Include numbers (default: true)
  symbols?: boolean;   // Include symbols (default: true)
  spaces?: boolean;    // Include spaces (default: false)
}
```

---

### `plural()`
Returns the plural form of a word based on count.

```typescript
function plural(input: StringInput, count?: number, pluralForm?: string): string;
```

**Examples**
```typescript
Str.plural("item");       // "items"
Str.plural("item", 0);       // "item"
Str.plural("child", 2, "children"); // "children"
```

---

### `prefix()` / `suffix()`
Ensures strings start/end with exactly one instance of given value.

```typescript
function prefix(input: StringInput, prefix: StringInput): string;
function suffix(input: StringInput, suffix: StringInput): string;
```

**Examples**
```typescript
Str.prefix("world", "hello ");  // "hello world"
Str.suffix("hello", " world");  // "hello world"
Str.prefix("hello", "hello");   // "hello"
Str.suffix("test!!", "!");      // "test!"
```

---

### `random()`
Generates a random alphanumeric string.

```typescript
function random(length?: number): string;
```

**Examples**
```typescript
Str.random();    // "X7jK9pQz" (16 chars by default)
Str.random(8);   // "b5GhT2mK"
Str.random(4);   // "9fWx"
```

---

### `remove()`
Removes all occurrences of substring(s) from a string.

```typescript
function remove(input: StringInput, search: StringInput|StringInput[], ignoreCase?: boolean): string;
```

**Examples**
```typescript
Str.remove("Hello World", "l");          // "Heo Word"
Str.remove("FooBarBaz", ["o", "a"]);     // "FBrBz"
Str.remove("Hello", "h", true);          // "ello"
```

---

### `replace()` / `replaceFirst()` / `replaceLast()`
Basic string replacement operations.

```typescript
function replace(input: StringInput|StringInput[], search: StringInput|StringInput[], replace: StringInput|StringInput[], ignoreCase?: boolean): string|string[];
function replaceFirst(input: StringInput, search: StringInput, replace: StringInput): string;
function replaceLast(input: StringInput, search: StringInput, replace: StringInput): string;
```

**Examples**
```typescript
Str.replace("hello", "l", "x");         // "hexxo"
Str.replaceFirst("hello", "l", "x");    // "hexlo"
Str.replaceLast("hello", "l", "x");     // "helxo"
```

---

### `replaceStart()` / `replaceEnd()`
Targeted replacement at string edges.

```typescript
function replaceStart(input: StringInput, search: StringInput, replace: StringInput): string;
function replaceEnd(input: StringInput, search: StringInput, replace: StringInput): string;
```

**Examples**
```typescript
Str.replaceStart("test", "te", "x");    // "xst"
Str.replaceEnd("test", "st", "x");      // "tex"
```

---

### `replaceArray()`
Sequential replacements from an array.

```typescript
function replaceArray(input: StringInput, search: StringInput, replacements: StringInput|StringInput[]): string;
```

**Example**
```typescript
Str.replaceArray("?/?", "?", ["1", "2"]); // "1/2"
```

---

### `reverse()`
Reverses the characters in a string.

```typescript
function reverse(input: StringInput): string;
```

**Examples**
```typescript
Str.reverse("hello");  // "olleh"
Str.reverse("123");    // "321"
Str.reverse("");       // ""
```

---

### `slug()`
Converts a string to a URL-friendly slug.

```typescript
function slug(input: StringInput, separator?: string): string;
```

**Examples**
```typescript
Str.slug("Déjà Vu");          // "deja-vu"
Str.slug("Hello  World! 123"); // "hello-world-123"
```

**Behavior**:
- Converts special characters to ASCII equivalents
- Removes all non-alphanumeric characters
- Trims leading/trailing separators
- Converts to lowercase

---

### `squish()`
Removes extra whitespace and trims the string.

```typescript
function squish(input: StringInput): string;
```

**Examples**
```typescript
Str.squish("  Hello   World  ");  // "Hello World"
Str.squish("Too\n\nMany\nSpaces"); // "Too Many Spaces"
Str.squish("  No  Extra  ");      // "No Extra"
```

---

### `stripTags()`
Removes HTML tags while preserving line breaks and optional allowed tags.

```typescript
function stripTags(input: StringInput, allowed?: StringInput): string;
```

**Examples**
```typescript
Str.stripTags("<p>Hello</p>"); // "Hello"
Str.stripTags("<b>Hi</b>", "<b>"); // "<b>Hi</b>"
Str.stripTags("<div>Test<br>Text</div>"); // "Test\nText"
```

---

### `substr()`
Extracts a substring by position and length.

```typescript
function substr(input: StringInput, start: number, length?: number): string;
```

**Examples**
```typescript
Str.substr("Hello World", 6);     // "World"
Str.substr("Hello World", 0, 5);  // "Hello"
Str.substr("Hello World", -5);    // "World"
Str.substr("Hello", 10);          // ""
```

---

### `substrCount()`
Counts occurrences of a substring.

```typescript
function substrCount(haystack: StringInput, needle: StringInput, offset?: number, length?: number): number;
```

**Examples**
```typescript
Str.substrCount("hello hello", "ell");   // 2
Str.substrCount("ababab", "ab");        // 3
Str.substrCount("test", "x");           // 0
Str.substrCount("aaaa", "aa");          // 2 (non-overlapping)
```

---

### `substrReplace()`
Replaces text within a specific portion of a string.

```typescript
function substrReplace(input: StringInput, start: number, length: number, replacement: StringInput): string;
```

**Examples**
```typescript
Str.substrReplace("Hello World", 6, 5, "Universe");  // "Hello Universe"
Str.substrReplace("123456", 1, 3, "X");             // "1X56"
Str.substrReplace("test", -3, 2, "xx");             // "txxst"
```

---

### `swap()`
Replaces words using a key-value mapping.

```typescript
function swap(input: StringInput, map: Record<string, string>): string;
```

**Examples**
```typescript
Str.swap("hello world", { hello: "hi", world: "earth" }); // "hi earth"
Str.swap("foo bar", { foo: "1", xyz: "2" });             // "1 bar"
Str.swap("test", {});                                    // "test"
```

---

### `take()`
Extracts the first or last characters of a string.

```typescript
function take(input: StringInput, limit: number): string;
```

**Examples**
```typescript
Str.take("Hello", 3);    // "Hel"
Str.take("Hello", -2);   // "lo"
Str.take("Hello", 10);   // "Hello"
```

---

### `trim()` / `trimStart()` / `trimEnd()`
Removes whitespace from string edges.

```typescript
function trim(input: StringInput, chars?: string|null): string;
function trimStart(input: StringInput, chars?: string|null): string;
function trimEnd(input: StringInput, chars?: string|null): string;
```

**Examples**
```typescript
Str.trim("  hello  ");         // "hello"
Str.trimStart("  hello");      // "hello"
Str.trimEnd("hello  ");        // "hello"
Str.trim("__hello__", "_");    // "hello"
```

---

### `uuid()`
Generates a random UUID (version 4).

```typescript
function uuid(): string;
```

**Examples**
```typescript
Str.uuid(); // "123e4567-e89b-12d3-a456-426614174000"
```

**Format**:
8-4-4-4-12 hexadecimal digits (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)

---

### `uuid()` / `uuid7()`
Generates UUID strings (versions 4 and 7).

```typescript
function uuid(): string;          // Version 4 (random)
function uuid7(time?: Date): string; // Version 7 (time-based)
```

**Examples**
```typescript
Str.uuid();  // "123e4567-e89b-12d3-a456-426614174000" (v4)
Str.uuid7(); // "018e0a14-7e23-7e00-8234-57a1009a2e7f" (v7)
```

**Differences**:

| Feature   | v4 (uuid)    | v7 (uuid7)  |
|-----------|--------------|-------------|
| Type      | Random       | Time-based  |
| Sortable  | No           | Yes         |
| Structure | Fully random | Time prefix |

---

### `wordCount()`
Counts words in a string (supports hyphenated/underscored words).

```typescript
function wordCount(input: StringInput): number;
```

**Examples**
```typescript
Str.wordCount("Hello world");       // 2
Str.wordCount("e-mail user_name");  // 2
Str.wordCount("");                 // 0
```

---

### `wordWrap()`
Wraps text to specified line length.

```typescript
function wordWrap(input: StringInput, characters?: number, breakChar?: string, cutLongWords?: boolean): string;
```

**Examples**
```typescript
Str.wordWrap(longText, 80); // Wrapped to 80 chars
Str.wordWrap("abcdefgh", 3, "\n", true); // "abc\ndef\ngh"
```

---

### `wrap()` / `unwrap()`
Adds/removes wrapping strings.

```typescript
function wrap(input: StringInput, before: StringInput, after: StringInput): string;
function unwrap(input: StringInput, before: StringInput, after?: StringInput): string;
```

**Examples**
```typescript
Str.wrap("content", "[", "]");    // "[content]"
Str.unwrap("[content]", "[");     // "content]"
Str.unwrap("[content]", "[", "]"); // "content"
Str.unwrap("content", "[");       // "content" (no change)
```

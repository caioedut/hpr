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
static from(input: StringInput): string;
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
static after(input: StringInput, search: StringInput): string;
static before(input: StringInput, search: StringInput): string;
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
static afterLast(input: StringInput, search: StringInput): string;
static beforeLast(input: StringInput, search: StringInput): string;
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
static between(input: StringInput, start: StringInput, end: StringInput): string;
static betweenLast(input: StringInput, start: StringInput, end: StringInput): string;
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
static ascii(input: StringInput): string;
```

**Example**
```typescript
Str.ascii("Déjà Vu"); // "Deja Vu"
```

---

### `base64()`
Base64 encoding.

```typescript
static base64(input: StringInput): string;
```

---

### `camelCase()` / `snakeCase()` / `kebabCase()` / `properCase()`
Case conversion utilities.

```typescript
static camelCase(input: StringInput): string;
static snakeCase(input: StringInput, separator?: string): string;
static kebabCase(input: StringInput): string;
static properCase(input: StringInput): string;
```

**Examples**
```typescript
Str.camelCase("hello_world");    // "helloWorld"
Str.kebabCase("HelloWorld");     // "hello-world"
```

---

### `charAt()`
Gets the character at a specific index.

```typescript
static charAt(input: StringInput, index: number): string;
```

**Example**
```typescript
Str.charAt("hello", 1); // "e"
```

---

### `chopStart()` / `chopEnd()`
Removes prefixes/suffixes.

```typescript
static chopStart(input: StringInput, needle: StringInput|StringInput[]): string;
static chopEnd(input: StringInput, needle: StringInput|StringInput[]): string;
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
static color(input: StringInput): string;
static colorPastel(input: StringInput): string;
```

**Example**
```typescript
Str.color("hello"); // "#5a3b2c"
```

---

### `contains()` / `containsAll()` / `doesntContain()`
Substring checks.

```typescript
static contains(input: StringInput, needles: StringInput|StringInput[], ignoreCase?: boolean): boolean;
static containsAll(input: StringInput, needles: StringInput[], ignoreCase?: boolean): boolean;
static doesntContain(input: StringInput, needles: StringInput|StringInput[], ignoreCase?: boolean): boolean;
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
static deduplicate(input: StringInput, character?: string): string;
```

---

### `endsWith()` / `startsWith()`
Prefix/suffix verification.

```typescript
static endsWith(input: StringInput, needles: StringInput|StringInput[]): boolean;
static startsWith(input: StringInput, needles: StringInput|StringInput[]): boolean;
```

---

### `escapeRegExp()`
Escapes special regex characters for safe pattern usage.

```typescript
static escapeRegExp(input: StringInput): string;
```

**Escapes**: `. * + ? | ( ) [ ] { } ^ $ \`

**Example**
```typescript
Str.escapeRegExp("file.txt"); // "file\\.txt"
Str.escapeRegExp("(test)");   // "\\(test\\)"
```

---

### `is()`
Checks if string matches any provided regex pattern.

```typescript
static is(input: StringInput, pattern: RegExp|RegExp[]): boolean;
```

**Examples**
```typescript
Str.is("hello", /^h/); // true
Str.is("world", [/^h/, /rld$/]); // true (matches second pattern)
Str.is("test", [/\d+/]); // false
```

---

### `isAscii()`
Checks if string contains only ASCII characters (0-127).

```typescript
static isAscii(input: StringInput): boolean;
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
static isJson(input: StringInput): boolean;
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
static isString(input: any): boolean;
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
static isUrl(input: StringInput): boolean;
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
static isUuid(input: StringInput): boolean;
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

### `length()`
Returns the character length of a string.

```typescript
static length(input: StringInput): number;
```

**Examples**
```typescript
Str.length("hello");  // 5
Str.length("");      // 0
Str.length(123);     // 3 (converted to string)
Str.length(null);    // 0
```

---

### `limit()` / `limitWords()`
Truncates strings with optional ellipsis.

```typescript
static limit(input: StringInput, limit?: number, end?: string, preserveWords?: boolean): string;
static limitWords(input: StringInput, words?: number, end?: string): string;
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
static lower(input: StringInput): string;
static upper(input: StringInput): string;
```

---

### `lowerFirst()` / `upperFirst()`
First character case control.

```typescript
static lowerFirst(input: StringInput): string;
static upperFirst(input: StringInput): string;
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
static lowerFirstWord(input: StringInput): string;
static upperFirstWord(input: StringInput): string;
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
static mask(input: StringInput, character: string, index: number, length?: number): string;
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
static pad(input: StringInput, length: number, pad?: string): string;
static padStart(input: StringInput, length: number, pad?: string): string;
static padEnd(input: StringInput, length: number, pad?: string): string;
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
static password(length?: number, options?: StringPasswordOptions): string;
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
static plural(input: StringInput, count?: number, pluralForm?: string): string;
```

**Examples**
```typescript
Str.plural("item");       // "items"
Str.plural("item", 0);       // "item"
Str.plural("child", 2, "children"); // "children"
```

---

### `position()`
Finds the index of a substring's first occurrence.

```typescript
static position(haystack: StringInput, needle: StringInput, offset?: number): number;
```

**Examples**
```typescript
Str.position("hello", "e");      // 1
Str.position("hello", "l", 3);   // 3
Str.position("hello", "x");      // -1
```

---

### `prefix()` / `suffix()`
Ensures strings start/end with exactly one instance of given value.

```typescript
static prefix(input: StringInput, prefix: StringInput): string;
static suffix(input: StringInput, suffix: StringInput): string;
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
static random(length?: number): string;
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
static remove(input: StringInput, search: StringInput|StringInput[], ignoreCase?: boolean): string;
```

**Examples**
```typescript
Str.remove("Hello World", "l");          // "Heo Word"
Str.remove("FooBarBaz", ["o", "a"]);     // "FBrBz"
Str.remove("Hello", "h", true);          // "ello"
```

---

### `repeat()`
Creates a new string by repeating the input.

```typescript
static repeat(input: StringInput, times: number): string;
```

**Examples**
```typescript
Str.repeat("a", 3);    // "aaa"
Str.repeat("ab", 2);   // "abab"
Str.repeat("", 5);     // ""
```

---

### `replace()` / `replaceFirst()` / `replaceLast()`
Basic string replacement operations.

```typescript
static replace(input: StringInput|StringInput[], search: StringInput|StringInput[], replace: StringInput|StringInput[], ignoreCase?: boolean): string|string[];
static replaceFirst(input: StringInput, search: StringInput, replace: StringInput): string;
static replaceLast(input: StringInput, search: StringInput, replace: StringInput): string;
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
static replaceStart(input: StringInput, search: StringInput, replace: StringInput): string;
static replaceEnd(input: StringInput, search: StringInput, replace: StringInput): string;
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
static replaceArray(input: StringInput, search: StringInput, replacements: StringInput|StringInput[]): string;
```

**Example**
```typescript
Str.replaceArray("?/?", "?", ["1", "2"]); // "1/2"
```

---

### `reverse()`
Reverses the characters in a string.

```typescript
static reverse(input: StringInput): string;
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
static slug(input: StringInput, separator?: string): string;
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
static squish(input: StringInput): string;
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
static stripTags(input: StringInput, allowed?: StringInput): string;
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
static substr(input: StringInput, start: number, length?: number): string;
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
static substrCount(haystack: StringInput, needle: StringInput, offset?: number, length?: number): number;
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
static substrReplace(input: StringInput, start: number, length: number, replacement: StringInput): string;
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
static swap(input: StringInput, map: Record<string, string>): string;
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
static take(input: StringInput, limit: number): string;
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
static trim(input: StringInput, chars?: string|null): string;
static trimStart(input: StringInput, chars?: string|null): string;
static trimEnd(input: StringInput, chars?: string|null): string;
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
static uuid(): string;
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
static uuid(): string;          // Version 4 (random)
static uuid7(time?: Date): string; // Version 7 (time-based)
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
static wordCount(input: StringInput): number;
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
static wordWrap(input: StringInput, characters?: number, breakChar?: string, cutLongWords?: boolean): string;
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
static wrap(input: StringInput, before: StringInput, after: StringInput): string;
static unwrap(input: StringInput, before: StringInput, after?: StringInput): string;
```

**Examples**
```typescript
Str.wrap("content", "[", "]");    // "[content]"
Str.unwrap("[content]", "[");     // "content]"
Str.unwrap("[content]", "[", "]"); // "content"
Str.unwrap("content", "[");       // "content" (no change)
```

# hpr

## **Str**
To handle strings. The main method is `Str.from`.

### Type Definition

`StringInput` is `any` value that can be converted to string.

Usage: `Str.*`

```ts
import { Str } from 'hpr'

Str.from(2000); // "2000"
Str.from([1, 2, 3, 4]); // "1,2,3,4"
Str.from({ variant: "outline" }); // "{\"variant\": \"outline\"}"
```

### from
Convert the given input to a string.

```ts
export function from(input: StringInput): string
```

### after
Return the remainder of a string after the first occurrence of a given value.

```ts
export function after(input: StringInput, search: StringInput): string
```

### afterLast
Return the remainder of a string after the last occurrence of a given value.

```ts
export function afterLast(input: StringInput, search: StringInput): string
```

### ascii
Transliterate a UTF-8 value to ASCII.

```ts
export function ascii(input: StringInput): string
```

### toBase64
Convert the given string to Base64 encoding.

```ts
export function toBase64(input: StringInput): string
```

### before
Get the portion of a string before the first occurrence of a given value.

```ts
export function before(input: StringInput, search: StringInput): string
```

### beforeLast
Get the portion of a string before the last occurrence of a given value.

```ts
export function beforeLast(input: StringInput, search: StringInput): string
```

### between
Get the portion of a string between the first occurrence of two given values.

```ts
export function between(input: StringInput, start: StringInput, end: StringInput): string
```

### betweenLast
Get the portion of a string between the last occurrence of two given values.

```ts
export function betweenLast(input: StringInput, start: StringInput, end: StringInput): string
```

### camelCase
Convert a value to camel case.

```ts
export function camelCase(input: StringInput): string
```

### charAt
Get the character at the specified index.

```ts
export function charAt(input: StringInput, index: number): string
```

### chopEnd
Remove the given string(s) if it exists at the end of the haystack.

```ts
export function chopEnd(input: string, needle: StringInput | StringInput[]): string
```

### chopStart
Remove the given string(s) if it exists at the start of the haystack.

```ts
export function chopStart(input: string, needle: StringInput | StringInput[]): string
```

### color
Generates a consistent hex color based on the input string.

```ts
export function color(input: StringInput): string
```

### colorPastel
Generates a soft pastel hex color based on the input string.

```ts
export function colorPastel(input: StringInput): string
```

### contains
Determine if a given string contains a given substring.

```ts
export function contains(input: StringInput, needles: StringInput | StringInput[], ignoreCase = false): boolean
```

### containsAll
Determine if a given string contains all array values.

```ts
export function containsAll(input: StringInput, needles: StringInput[], ignoreCase = false): boolean
```

### deduplicate
Replace consecutive instances of a given character with a single character in the given string.

```ts
export function deduplicate(input: StringInput, character = ' '): string
```

### doesntContain
Determine if a given string doesn't contain a given substring.

```ts
export function doesntContain(input: StringInput, needles: StringInput | StringInput[], ignoreCase = false): boolean
```

### endsWith
Determine if a given string ends with a given substring.

```ts
export function endsWith(input: StringInput, needles: StringInput | StringInput[]): boolean
```

### escapeRegExp
Escape special characters in a string to be safely used in a regular expression.

```ts
export function escapeRegExp(input: StringInput): string
```

### is
Determine if a given string matches a given pattern.

```ts
export function is(input: StringInput, pattern: RegExp | RegExp[]): boolean
```

### isAscii
Determine if a given string is 7 bit ASCII.

```ts
export function isAscii(input: StringInput): boolean
```

### isJson
Determine if a given value is valid JSON.

```ts
export function isJson(input: unknown): boolean
```

### isString
Check if the input is a string.

```ts
export function isString(input: StringInput): boolean
```

### isUlid
Determine if a given value is a valid ULID.

```ts
export function isUlid(input: StringInput): boolean
```

### isUrl
Determine if a given value is a valid URL.

```ts
export function isUrl(input: StringInput): boolean
```

### isUuid
Determine if a given value is a valid UUID.

```ts
export function isUuid(input: StringInput): boolean
```

### kebabCase
Convert a string to kebab case.

```ts
export function kebabCase(input: StringInput): string
```

### length
Return the length of the given string.

```ts
export function length(input: StringInput): number
```

### limit
Limit the number of characters in a string.

```ts
export function limit(input: StringInput, limit = 100, end = '...', preserveWords = false): string
```

### limitWords
Limit the number of words in a string.

```ts
export function limitWords(input: StringInput, words = 100, end = '...'): string
```

### lower
Convert the given string to lowercase.

```ts
export function lower(input: StringInput): string
```

### lowerFirst
Make a string's first character lowercase.

```ts
export function lowerFirst(input: StringInput): string
```

### lowerFirstWord
Make a string's first word lowercase.

```ts
export function lowerFirstWord(input: StringInput): string
```

### mask
Masks a portion of a string with a repeated character.

```ts
export function mask(input: StringInput, character: string, index: number, length?: number): string
```

### pad
Pad both sides of a string with another.

```ts
export function pad(input: StringInput, length: number, pad = ' '): string
```

### padEnd
Pad the beginning of a string with another.

```ts
export function padEnd(input: StringInput, length: number, pad = ' '): string
```

### padStart
Pad the end of a string with another.

```ts
export function padStart(input: StringInput, length: number, pad = ' '): string
```

### password
Generate a random, secure password.

```ts
export function password(length = 32, options: StringInput = {}): string
```

### plural
Get the plural form of an word.

```ts
export function plural(input: StringInput, count = 2, plural?: string): string
```

### position
Find the multi-byte safe position of the first occurrence of a given substring in a string.

```ts
export function position(haystack: StringInput, needle: StringInput, offset = 0): number
```

### prefix
Begin a string with a single instance of a given value.

```ts
export function prefix(input: StringInput, prefix: StringInput): string
```

### properCase
Convert the given string to proper case.

```ts
export function properCase(input: StringInput): string
```

### random
Generate a more truly "random" alpha-numeric string.

```ts
export function random(length = 16): string
```

### remove
Remove StringInput occurrence of the given string in the subject.

```ts
export function remove(input: StringInput, search: StringInput | StringInput[], ignoreCase = false): string
```

### repeat
Repeat the given string.

```ts
export function repeat(input: StringInput, times: number): string
```

### replace
Replace the given value in the given string.

```ts
export function replace(input: StringInput | StringInput[], search: StringInput | StringInput[], replace: StringInput | StringInput[], ignoreCase = false): string | string[]
```

### replaceArray
Replace a given value in the string sequentially with an array.

```ts
export function replaceArray(input: StringInput, search: StringInput, replacements: StringInput | StringInput[]): string
```

### replaceEnd
Replace the last occurrence of a given value if it appears at the end of the string.

```ts
export function replaceEnd(input: StringInput, search: StringInput, replace: StringInput): string
```

### replaceFirst
Replace the first occurrence of a given value in the string.

```ts
export function replaceFirst(input: StringInput, search: StringInput, replace: StringInput): string
```

### replaceLast
Replace the last occurrence of a given value in the string.

```ts
export function replaceLast(input: StringInput, search: StringInput, replace: StringInput): string
```

### replaceMatches
Replace the patterns matching the given regular expression.

```ts
export function replaceMatches(input: StringInput, pattern: RegExp, replacement: StringInput): string
```

### replaceStart
Replace the first occurrence of the given value if it appears at the start of the string.

```ts
export function replaceStart(input: StringInput, search: StringInput, replace: StringInput): string
```

### reverse
Reverse the given string.

```ts
export function reverse(input: StringInput): string
```

### slug
Generate a URL friendly "slug" from a given string.

```ts
export function slug(input: StringInput, separator = '-'): string
```

### snakeCase
Convert a string to snake case.

```ts
export function snakeCase(input: StringInput, separator = '_'): string
```

### squish
Remove all "extra" blank space from the given string.

```ts
export function squish(input: StringInput): string
```

### startsWith
Determine if a given string starts with a given substring.

```ts
export function startsWith(input: StringInput, needles: StringInput | StringInput[]): boolean
```

### stripTags
Strip all tags from a string, optionally allowing certain tags.

```ts
export function stripTags(input: StringInput, allowed?: StringInput): string
```

### substr
Returns the portion of the string specified by the start and length parameters.

```ts
export function substr(input: StringInput, start: number, length?: number): string
```

### substrCount
Returns the number of substring occurrences.

```ts
export function substrCount(haystack: StringInput, needle: StringInput, offset: number = 0, length?: number): number
```

### substrReplace
Replace text within a portion of a string.

```ts
export function substrReplace(input: StringInput, start: number, length: number, replacement: StringInput): string
```

### suffix
Cap a string with a single instance of a given value.

```ts
export function suffix(input: StringInput, cap: StringInput): string
```

### swap
Swap multiple keywords in a string with other keywords.

```ts
export function swap(input: StringInput, map: Record<string, string>): string
```

### take
Take the first or last limit characters of a string.

```ts
export function take(input: StringInput, limit: number): string
```

### trim
Remove all whitespace from both ends of a string.

```ts
export function trim(input: StringInput, charlist: null | string = null): string
```

### trimEnd
Remove all whitespace from the end of a string.

```ts
export function trimEnd(input: StringInput, charlist: null | string = null): string
```

### trimStart
Remove all whitespace from the beginning of a string.

```ts
export function trimStart(input: StringInput, charlist: null | string = null): string
```

### unwrap
Unwrap the string with the given strings.

```ts
export function unwrap(input: StringInput, before: StringInput, after: StringInput = before): string
```

### upper
Convert the given string to upper-case.

```ts
export function upper(input: StringInput): string
```

### upperFirst
Make a string's first character uppercase.

```ts
export function upperFirst(input: StringInput): string
```

### upperFirstWord
Make a string's first word uppercase.

```ts
export function upperFirstWord(input: StringInput): string
```

### upperSplit
Split a string into pieces by uppercase characters.

```ts
export function upperSplit(input: StringInput): string[]
```

### uuid
Generate a UUID (version 4).

```ts
export function uuid(): string
```

### uuid7
Generate a UUID (version 7).

```ts
export function uuid7(time: Date = new Date()): string
```

### wordCount
Get the number of words a string contains.

```ts
export function wordCount(input: StringInput): number
```

### wordWrap
Wrap a string to a given number of characters.

```ts
export function wordWrap(input: StringInput, characters = 75, breakChar = '\n', cutLongWords = false): string
```

### wrap
Wrap the string with the given strings.

```ts
export function wrap(input: StringInput, before: StringInput, after: StringInput): string
```

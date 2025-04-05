# hpr

## **Str**
To handle strings. Usage: `Str.*`.
```ts
import { Str } from 'hpr'
const uri = Str.slug('My first group')
// uri = "my-first-group"
```

### after
Return the remainder of a string after the first occurrence of a given value.

```ts
export function after(input: any, search: any): string
```

### afterLast
Return the remainder of a string after the last occurrence of a given value.

```ts
export function afterLast(input: any, search: any): string
```

### ascii
Transliterate a UTF-8 value to ASCII.

```ts
export function ascii(input: any): string
```

### before
Get the portion of a string before the first occurrence of a given value.

```ts
export function before(input: any, search: any): string
```

### beforeLast
Get the portion of a string before the last occurrence of a given value.

```ts
export function beforeLast(input: any, search: any): string
```

### between
Get the portion of a string between the first occurrence of two given values.

```ts
export function between(input: any, start: any, end: any): string
```

### betweenLast
Get the portion of a string between the last occurrence of two given values.

```ts
export function betweenLast(input: any, start: any, end: any): string
```

### camel
Convert a value to camel case.

```ts
export function camel(input: any): string
```

### charAt
Get the character at the specified index.

```ts
export function charAt(input: any, index: number): string
```

### chopEnd
Remove the given string(s) if it exists at the end of the haystack.

```ts
export function chopEnd(input: string, needle: any | any[]): string
```

### chopStart
Remove the given string(s) if it exists at the start of the haystack.

```ts
export function chopStart(input: string, needle: any | any[]): string
```

### contains
Determine if a given string contains a given substring.

```ts
export function contains(input: any, needles: any | any[], ignoreCase = false): boolean
```

### containsAll
Determine if a given string contains all array values.

```ts
export function containsAll(input: any, needles: any[], ignoreCase = false): boolean
```

### deduplicate
Replace consecutive instances of a given character with a single character in the given string.

```ts
export function deduplicate(input: any, character = ' '): string
```

### doesntContain
Determine if a given string doesn't contain a given substring.

```ts
export function doesntContain(input: any, needles: any | any[], ignoreCase = false): boolean
```

### endsWith
Determine if a given string ends with a given substring.

```ts
export function endsWith(input: any, needles: any | any[]): boolean
```

### escapeRegExp
Escape special characters in a string to be safely used in a regular expression.

```ts
export function escapeRegExp(input: any): string
```

### from
Convert the given input to a string.

```ts
export function from(input: any): string
```

### is
Determine if a given string matches a given pattern.

```ts
export function is(input: any, pattern: RegExp | RegExp[]): boolean
```

### isAscii
Determine if a given string is 7 bit ASCII.

```ts
export function isAscii(input: any): boolean
```

### isJson
Determine if a given value is valid JSON.

```ts
export function isJson(input: unknown): boolean
```

### isString
Check if the input is a string.

```ts
export function isString(input: any): boolean
```

### isUlid
Determine if a given value is a valid ULID.

```ts
export function isUlid(input: any): boolean
```

### isUrl
Determine if a given value is a valid URL.

```ts
export function isUrl(input: any): boolean
```

### isUuid
Determine if a given value is a valid UUID.

```ts
export function isUuid(input: any): boolean
```

### kebab
Convert a string to kebab case.

```ts
export function kebab(input: any): string
```

### length
Return the length of the given string.

```ts
export function length(input: any): number
```

### limit
Limit the number of characters in a string.

```ts
export function limit(input: any, limit = 100, end = '...', preserveWords = false): string
```

### limitWords
Limit the number of words in a string.

```ts
export function limitWords(input: any, words = 100, end = '...'): string
```

### lower
Convert the given string to lowercase.

```ts
export function lower(input: any): string
```

### lowerFirst
Make a string's first character lowercase.

```ts
export function lowerFirst(input: any): string
```

### lowerFirstWord
Make a string's first word lowercase.

```ts
export function lowerFirstWord(input: any): string
```

### mask
Masks a portion of a string with a repeated character.

```ts
export function mask(input: any, character: string, index: number, length?: number): string
```

### pad
Pad both sides of a string with another.

```ts
export function pad(input: any, length: number, pad = ' '): string
```

### padEnd
Pad the beginning of a string with another.

```ts
export function padEnd(input: any, length: number, pad = ' '): string
```

### padStart
Pad the end of a string with another.

```ts
export function padStart(input: any, length: number, pad = ' '): string
```

### password
Generate a random, secure password.

```ts
export function password(length = 32, options: any = {}): string
```

### plural
Get the plural form of an word.

```ts
export function plural(input: any, count = 2, plural?: string): string
```

### position
Find the multi-byte safe position of the first occurrence of a given substring in a string.

```ts
export function position(haystack: any, needle: any, offset = 0): number
```

### prefix
Begin a string with a single instance of a given value.

```ts
export function prefix(input: any, prefix: any): string
```

### random
Generate a more truly "random" alpha-numeric string.

```ts
export function random(length = 16): string
```

### remove
Remove any occurrence of the given string in the subject.

```ts
export function remove(input: any, search: any | any[], ignoreCase = false): string
```

### repeat
Repeat the given string.

```ts
export function repeat(input: any, times: number): string
```

### replace
Replace the given value in the given string.

```ts
export function replace(input: any | any[], search: any | any[], replace: any | any[], ignoreCase = false): string | string[]
```

### replaceArray
Replace a given value in the string sequentially with an array.

```ts
export function replaceArray(input: any, search: any, replacements: any | any[]): string
```

### replaceEnd
Replace the last occurrence of a given value if it appears at the end of the string.

```ts
export function replaceEnd(input: any, search: any, replace: any): string
```

### replaceFirst
Replace the first occurrence of a given value in the string.

```ts
export function replaceFirst(input: any, search: any, replace: any): string
```

### replaceLast
Replace the last occurrence of a given value in the string.

```ts
export function replaceLast(input: any, search: any, replace: any): string
```

### replaceMatches
Replace the patterns matching the given regular expression.

```ts
export function replaceMatches(input: any, pattern: RegExp, replacement: any): string
```

### replaceStart
Replace the first occurrence of the given value if it appears at the start of the string.

```ts
export function replaceStart(input: any, search: any, replace: any): string
```

### reverse
Reverse the given string.

```ts
export function reverse(input: any): string
```

### slug
Generate a URL friendly "slug" from a given string.

```ts
export function slug(input: any, separator = '-'): string
```

### snake
Convert a string to snake case.

```ts
export function snake(input: any, separator = '_'): string
```

### squish
Remove all "extra" blank space from the given string.

```ts
export function squish(input: any): string
```

### startsWith
Determine if a given string starts with a given substring.

```ts
export function startsWith(input: any, target: any): boolean
```

### substr
Returns the portion of the string specified by the start and length parameters.

```ts
export function substr(input: any, start: number, length?: number): string
```

### substrCount
Returns the number of substring occurrences.

```ts
export function substrCount(haystack: any, needle: any, offset: number = 0, length?: number): number
```

### substrReplace
Replace text within a portion of a string.

```ts
export function substrReplace(input: any, start: number, length: number, replacement: any): string
```

### suffix
Cap a string with a single instance of a given value.

```ts
export function suffix(input: any, cap: any): string
```

### swap
Swap multiple keywords in a string with other keywords.

```ts
export function swap(input: any, map: Record<string, string>): string
```

### take
Take the first or last {$limit} characters of a string.

```ts
export function take(input: any, limit: number): string
```

### title
Convert the given string to proper case.

```ts
export function title(input: any): string
```

### toBase64
Convert the given string to Base64 encoding.

```ts
export function toBase64(input: any): string
```

### trim
Remove all whitespace from both ends of a string.

```ts
export function trim(input: any, charlist: null | string = null): string
```

### trimEnd
Remove all whitespace from the end of a string.

```ts
export function trimEnd(input: any, charlist: null | string = null): string
```

### trimStart
Remove all whitespace from the beginning of a string.

```ts
export function trimStart(input: any, charlist: null | string = null): string
```

### unwrap
Unwrap the string with the given strings.

```ts
export function unwrap(input: any, before: any, after: any = before): string
```

### upper
Convert the given string to upper-case.

```ts
export function upper(input: any): string
```

### upperFirst
Make a string's first character uppercase.

```ts
export function upperFirst(input: any): string
```

### upperFirstWord
Make a string's first word uppercase.

```ts
export function upperFirstWord(input: any): string
```

### upperSplit
Split a string into pieces by uppercase characters.

```ts
export function upperSplit(input: any): string[]
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
export function wordCount(input: any): number
```

### wordWrap
Wrap a string to a given number of characters.

```ts
export function wordWrap(input: any, characters = 75, breakChar = '\n', cutLongWords = false): string
```

### wrap
Wrap the string with the given strings.

```ts
export function wrap(input: any, before: any, after: any): string
```

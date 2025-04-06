import * as Arr from '../../src/helpers/Arr';

export type StringInput = any;

export interface StringPasswordOptions {
  letters?: boolean;
  numbers?: boolean;
  spaces?: boolean;
  symbols?: boolean;
}

/**
 * Return the remainder of a string after the first occurrence of a given value.
 */
export function after(input: StringInput, search: StringInput) {
  const str = from(input);
  const needle = from(search);

  if (needle === '') return str;

  const index = str.indexOf(needle);
  return index === -1 ? str : str.slice(index + needle.length);
}

/**
 * Return the remainder of a string after the last occurrence of a given value.
 */
export function afterLast(input: StringInput, search: StringInput) {
  const str = from(input);
  const needle = from(search);

  if (needle === '') return str;

  const index = str.lastIndexOf(needle);
  return index === -1 ? str : str.slice(index + needle.length);
}

/**
 * Transliterate a UTF-8 value to ASCII.
 */
export function ascii(input: StringInput) {
  return from(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, '');
}

/**
 * Get the portion of a string before the first occurrence of a given value.
 */
export function before(input: StringInput, search: StringInput) {
  const str = from(input);
  const needle = from(search);

  if (needle === '') return str;

  const index = str.indexOf(needle);
  return index === -1 ? str : str.slice(0, index);
}

/**
 * Get the portion of a string before the last occurrence of a given value.
 */
export function beforeLast(input: StringInput, search: StringInput) {
  const str = from(input);
  const needle = from(search);

  if (needle === '') return str;

  const index = str.lastIndexOf(needle);
  return index === -1 ? str : str.slice(0, index);
}

/**
 * Get the portion of a string between the first occurrence of two given values.
 */
export function between(input: StringInput, start: StringInput, end: StringInput) {
  const str = from(input);

  // Verifica se start ou end estão vazios e retorna a string inteira, ou o comportamento desejado
  if (!start || !end) {
    return str;
  }

  // Verifica se o start ou o end não existem na string
  const startIndex = str.indexOf(from(start));
  const endIndex = str.indexOf(from(end));

  // Se algum dos valores não for encontrado, retorna string vazia
  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return '';
  }

  return after(before(str, end), start);
}

/**
 * Get the portion of a string between the last occurrence of two given values.
 */
export function betweenLast(input: StringInput, start: StringInput, end: StringInput) {
  const str = from(input);

  // Verifica se start ou end estão vazios e retorna a string inteira, ou o comportamento desejado
  if (!start || !end) {
    return str;
  }

  // Verifica se o start ou o end não existem na string
  const startIndex = str.lastIndexOf(from(start));
  const endIndex = str.lastIndexOf(from(end));

  // Se algum dos valores não for encontrado, retorna string vazia
  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return '';
  }

  return afterLast(beforeLast(str, end), start);
}

/**
 * Convert a value to camel case.
 */
export function camel(input: StringInput) {
  return from(input)
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/**
 * Get the character at the specified index.
 */
export function charAt(input: StringInput, index: number) {
  return from(input).charAt(index);
}

/**
 * Remove the given string(s) if it exists at the end of the haystack.
 */
export function chopEnd(input: string, needle: StringInput | StringInput[]) {
  const str = from(input);
  const needles = Array.isArray(needle) ? needle : [needle];

  for (const n of needles) {
    const check = from(n);
    if (str.endsWith(check)) {
      return str.slice(0, -check.length);
    }
  }

  return str;
}

/**
 * Remove the given string(s) if it exists at the start of the haystack.
 */
export function chopStart(input: string, needle: StringInput | StringInput[]) {
  const str = from(input);
  const needles = Array.isArray(needle) ? needle : [needle];

  for (const n of needles) {
    const check = from(n);
    if (str.startsWith(check)) {
      return str.slice(check.length);
    }
  }

  return str;
}

/**
 * Determine if a given string contains a given substring.
 */
export function contains(input: StringInput, needles: StringInput | StringInput[], ignoreCase = false) {
  const str = from(input);
  const values = Arr.from<string>(needles).map(from);

  if (values.every((needle) => needle === '')) {
    return false;
  }

  const target = ignoreCase ? str.toLowerCase() : str;

  return values.some((needle) => target.includes(ignoreCase ? needle.toLowerCase() : needle));
}

/**
 * Determine if a given string contains all array values.
 */
export function containsAll(input: StringInput, needles: StringInput[], ignoreCase = false) {
  const str = from(input);
  const values = Arr.from<string>(needles).map(from);

  if (values.some((needle) => needle === '')) {
    return false;
  }

  const target = ignoreCase ? str.toLowerCase() : str;

  return values.every((needle) => target.includes(ignoreCase ? needle.toLowerCase() : needle));
}

/**
 * Replace consecutive instances of a given character with a single character in the given string.
 */
export function deduplicate(input: StringInput, character = ' ') {
  return from(input).replace(new RegExp(`${escapeRegExp(character)}+`, 'gu'), character);
}

/**
 * Determine if a given string doesn't contain a given substring.
 */
export function doesntContain(input: StringInput, needles: StringInput | StringInput[], ignoreCase = false) {
  return !contains(input, needles, ignoreCase);
}

/**
 * Determine if a given string ends with a given substring.
 */
export function endsWith(input: StringInput, needles: StringInput | StringInput[]) {
  return Arr.from(needles).some((needle) => from(input).endsWith(from(needle)));
}

/**
 * Escape special characters in a string to be safely used in a regular expression.
 *
 * This function escapes characters that have special meaning in regular expressions, such as
 * `.`, `*`, `+`, `?`, `|`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `$`, `\\`, etc.
 * It ensures that these characters are treated as literal characters within the regex pattern.
 */
export function escapeRegExp(input: StringInput) {
  return from(input).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert the given input to a string.
 *
 * This function ensures that the input is cast to a string, whether it's
 * a string, number, or any other type. If the input is already a string,
 * it returns it as-is. If the input is a non-string type, it is converted
 * to its string representation.
 */
export function from(input: StringInput) {
  if (input === null || input === undefined) return '';

  if (Array.isArray(input)) {
    return input.toString();
  }

  if (typeof input === 'object') {
    try {
      return JSON.stringify(input);
    } catch {}
  }

  return String(input);
}

/**
 * Determine if a given string matches a given pattern.
 */
export function is(input: StringInput, pattern: RegExp | RegExp[]) {
  const str = from(input);

  for (const regex of Arr.from<RegExp>(pattern)) {
    if (regex.test(str)) return true;
  }

  return false;
}

// TODO
// /**
//  * Extracts an excerpt from text that matches the first instance of a phrase.
//  */
// export function excerpt(
//   input: StringInput,
//   phrase: StringInput = '',
//   options: StringExcerptOptions = {}
// ) {}

/**
 * Determine if a given string is 7 bit ASCII.
 */
export function isAscii(input: StringInput) {
  return Array.from(from(input)).every((char) => char.charCodeAt(0) <= 0x7f);
}

/**
 * Determine if a given value is valid JSON.
 */
export function isJson(input: unknown) {
  if (typeof input !== 'string' || input.trim() === '') return false;

  try {
    const parsed = JSON.parse(input);
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
}

/**
 * Check if the input is a string.
 */
export function isString(input: any) {
  return typeof input === 'string';
}

/**
 * Determine if a given value is a valid ULID.
 */
export function isUlid(input: StringInput) {
  const str = from(input);

  if (str.length !== 26) return false;

  return /^[0-7][0-9A-HJKMNP-TV-Zabcdefghjkmnp-tv-z]{25}$/.test(str);
}

/**
 * Determine if a given value is a valid URL.
 */
export function isUrl(input: StringInput) {
  try {
    new URL(from(input));
    return true;
  } catch {}

  return false;
}

/**
 * Determine if a given value is a valid UUID.
 */
export function isUuid(input: StringInput) {
  return /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(from(input));
}

/**
 * Convert a string to kebab case.
 */
export function kebab(input: StringInput) {
  return slug(input, '-');
}

/**
 * Return the length of the given string.
 */
export function length(input: StringInput) {
  return from(input).length;
}

/**
 * Limit the number of characters in a string.
 */
export function limit(input: StringInput, limit = 100, end = '...', preserveWords = false) {
  const str = from(input);

  if (str.length <= limit) return str;

  if (!preserveWords) return str.slice(0, limit).trimEnd() + end;

  const clean = str.replace(/[\n\r]+/g, ' ').trim();
  const trimmed = clean.slice(0, limit).trimEnd();

  if (clean.charAt(limit) === ' ') return trimmed + end;

  return trimmed.replace(/(.*)\s.*/, '$1') + end;
}

/**
 * Limit the number of words in a string.
 */
export function limitWords(input: StringInput, words = 100, end = '...') {
  const str = from(input);

  // Divida a string em palavras e pegue as primeiras `words` palavras
  const wordsArray = str.split(/\s+/);
  const truncated = wordsArray.slice(0, words).join(' ');

  // Se a string original for maior que o truncado, adicione o `end`
  return truncated.length < str.length ? truncated + end : truncated;
}

/**
 * Convert the given string to lowercase.
 */
export function lower(input: StringInput) {
  return from(input).toLowerCase();
}

/**
 * Make a string's first character lowercase.
 */
export function lowerFirst(input: StringInput) {
  const str = from(input);
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Make a string's first word lowercase.
 */
export function lowerFirstWord(input: StringInput) {
  return from(input).replace(/^\s*\w/, (match) => match.toLowerCase());
}

/**
 * Masks a portion of a string with a repeated character.
 */
export function mask(input: StringInput, character: string, index: number, length?: number) {
  const str = from(input);
  if (character === '') return str;

  const segment = str.slice(index, length ? index + length : undefined);
  if (segment === '') return str;

  const strlen = str.length;
  const startIndex = index < 0 ? Math.max(0, strlen + index) : index;
  const start = str.slice(0, startIndex);
  const segmentLen = segment.length;
  const end = str.slice(startIndex + segmentLen);

  return start + character.charAt(0).repeat(segmentLen) + end;
}

/**
 * Pad both sides of a string with another.
 */
export function pad(input: StringInput, length: number, pad = ' ') {
  const str = from(input);
  const short = Math.max(0, length - str.length);
  const left = Math.floor(short / 2);
  const right = Math.ceil(short / 2);

  return pad.repeat(left).slice(0, left) + str + pad.repeat(right).slice(0, right);
}

/**
 * Pad the beginning of a string with another.
 */
export function padEnd(input: StringInput, length: number, pad = ' ') {
  return from(input).padEnd(length, pad);
}

/**
 * Pad the end of a string with another.
 */
export function padStart(input: StringInput, length: number, pad = ' ') {
  return from(input).padStart(length, pad);
}

/**
 * Generate a random, secure password.
 */
export function password(length = 32, options: StringPasswordOptions = {}) {
  const { letters = true, numbers = true, spaces = false, symbols = true } = options;

  const sets = {
    letters: letters ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    numbers: numbers ? '0123456789' : '',
    spaces: spaces ? ' ' : '',
    symbols: symbols ? '~!#$%^&*()-_.,<>?/\\{}[]|:;' : '',
  };

  const active = Object.values(sets).filter((s) => s);
  if (!active.length) return '';

  const required = active.map((s) => s[Math.floor(Math.random() * s.length)]);
  const pool = active.join('');
  const remaining = Array.from(
    { length: length - required.length },
    () => pool[Math.floor(Math.random() * pool.length)],
  );

  return [...required, ...remaining].sort(() => Math.random() - 0.5).join('');
}

/**
 * Get the plural form of an word.
 */
export function plural(input: StringInput, count = 2, plural?: string) {
  input = from(input);
  if (!input) return '';
  plural = plural ?? `${input}s`.replace(/ss$/, 's');
  return count > 1 ? plural : input;
}

/**
 * Find the multi-byte safe position of the first occurrence of a given substring in a string.
 */
export function position(haystack: StringInput, needle: StringInput, offset = 0) {
  return from(haystack).indexOf(from(needle), offset);
}

/**
 * Begin a string with a single instance of a given value.
 */
export function prefix(input: StringInput, prefix: StringInput) {
  const pattern = escapeRegExp(prefix);
  return prefix + from(input).replace(new RegExp(`^(?:${pattern})+`), '');
}

/**
 * Generate a more truly "random" alpha-numeric string.
 */
export function random(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

/**
 * Remove any occurrence of the given string in the subject.
 */
export function remove(input: StringInput, search: StringInput | StringInput[], ignoreCase = false) {
  return Arr.from(search).reduce((acc, item) => {
    const regex = new RegExp(escapeRegExp(from(item)), ignoreCase ? 'gi' : 'g');
    return acc.replace(regex, '');
  }, from(input));
}

/**
 * Repeat the given string.
 */
export function repeat(input: StringInput, times: number) {
  return from(input).repeat(times);
}

/**
 * Replace the given value in the given string.
 */
export function replace(
  input: StringInput | StringInput[],
  search: StringInput | StringInput[],
  replace: StringInput | StringInput[],
  ignoreCase = false,
) {
  const subjects = Arr.from(input).map(from);
  const searchArr = Arr.from(search).map(from);
  const replaceArr = Arr.from(replace).map(from);

  const result = subjects.map((str) =>
    searchArr.reduce((acc, item, i) => {
      const pattern = new RegExp(escapeRegExp(item), ignoreCase ? 'gi' : 'g');
      return acc.replace(pattern, replaceArr[i] ?? '');
    }, str),
  );

  return Array.isArray(input) ? result : result[0];
}

/**
 * Replace a given value in the string sequentially with an array.
 */
export function replaceArray(input: StringInput, search: StringInput, replacements: StringInput | StringInput[]) {
  const replacems = Arr.from(replacements);

  let str = input;

  for (const value of replacems) {
    str = replaceFirst(str, search, value);
  }

  return str;
}

/**
 * Replace the last occurrence of a given value if it appears at the end of the string.
 */
export function replaceEnd(input: StringInput, search: StringInput, replace: StringInput) {
  const str = from(input);
  const value = from(search);

  return str.endsWith(value) ? str.slice(0, -value.length) + from(replace) : str;
}

/**
 * Replace the first occurrence of a given value in the string.
 */
export function replaceFirst(input: StringInput, search: StringInput, replace: StringInput) {
  return from(input).replace(from(search), from(replace));
}

/**
 * Replace the last occurrence of a given value in the string.
 */
export function replaceLast(input: StringInput, search: StringInput, replace: StringInput) {
  const str = from(input);
  const find = from(search);
  const index = str.lastIndexOf(find);

  if (index === -1) return str;

  return str.slice(0, index) + from(replace) + str.slice(index + find.length);
}

/**
 * Replace the patterns matching the given regular expression.
 */
export function replaceMatches(input: StringInput, pattern: RegExp, replacement: StringInput) {
  return from(input).replace(pattern, from(replacement));
}

/**
 * Replace the first occurrence of the given value if it appears at the start of the string.
 */
export function replaceStart(input: StringInput, search: StringInput, replace: StringInput) {
  const str = from(input);
  const value = from(search);

  return str.startsWith(value) ? str.replace(value, from(replace)) : str;
}

/**
 * Reverse the given string.
 */
export function reverse(input: StringInput) {
  return from(input).split('').reverse().join('');
}

/**
 * Generate a URL friendly "slug" from a given string.
 */
export function slug(input: StringInput, separator = '-') {
  const pattern = new RegExp(`[\\s_]+`, 'g');

  return ascii(input)
    .toLowerCase()
    .replace(pattern, separator)
    .replace(new RegExp(`[^a-z0-9${separator}]`, 'g'), '')
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}

/**
 * Convert a string to snake case.
 */
export function snake(input: StringInput, separator = '_') {
  return slug(input, separator);
}

/**
 * Remove all "extra" blank space from the given string.
 */
export function squish(input: StringInput) {
  return from(input).replace(/\s+/g, ' ').trim();
}

/**
 * Determine if a given string starts with a given substring.
 */
export function startsWith(input: StringInput, target: StringInput) {
  return from(input).startsWith(from(target));
}

/**
 * Returns the portion of the string specified by the start and length parameters.
 */
export function substr(input: StringInput, start: number, length?: number) {
  const str = from(input);

  if (length === undefined) {
    length = str.length - start;
  }

  if (start < 0) {
    start = str.length + start;
  }

  return str.slice(start, start + length);
}

/**
 * Returns the number of substring occurrences.
 */
export function substrCount(haystack: StringInput, needle: StringInput, offset: number = 0, length?: number) {
  const strHaystack = from(haystack);
  const strNeedle = from(needle);

  let substring = strHaystack.slice(offset);

  if (length !== undefined) {
    substring = substring.slice(0, length);
  }

  let count = 0;
  let position = 0;

  while ((position = substring.indexOf(strNeedle, position)) !== -1) {
    count++;
    position += strNeedle.length; // Avançar para a próxima ocorrência
  }

  return count;
}

/**
 * Replace text within a portion of a string.
 */
export function substrReplace(input: StringInput, start: number, length: number, replacement: StringInput) {
  const str = from(input);

  // Ajustando o índice para lidar com valores negativos
  const startIndex = start < 0 ? str.length + start : start;
  const endIndex = startIndex + length;

  return str.slice(0, startIndex) + from(replacement) + str.slice(endIndex);
}

/**
 * Cap a string with a single instance of a given value.
 */
export function suffix(input: StringInput, cap: StringInput) {
  const suffix = from(cap);
  return from(input).replace(new RegExp(`(?:${escapeRegExp(suffix)})+$`, 'u'), '') + suffix;
}

/**
 * Swap multiple keywords in a string with other keywords.
 */
export function swap(input: StringInput, map: Record<string, string>) {
  return from(input).replace(/(?:\b)([\w-]+)(?:\b)/g, (match) => map[match] || match);
}

/**
 * Take the first or last {$limit} characters of a string.
 */
export function take(input: StringInput, limit: number) {
  const str = from(input);

  if (limit < 0) {
    return str.slice(limit);
  }

  return str.slice(0, limit);
}

/**
 * Convert the given string to proper case.
 */
export function title(input: StringInput) {
  return from(input).replace(/\b\w/g, (match) => match.toUpperCase());
}

/**
 * Convert the given string to Base64 encoding.
 */
export function toBase64(input: StringInput) {
  return btoa(from(input));
}

/**
 * Remove all whitespace from both ends of a string.
 */
export function trim(input: StringInput, charlist: null | string = null) {
  if (charlist === null) {
    const trimDefaultCharacters = ' \n\r\t\v\0';
    const regex = `^[\\s\\uFEFF\\u200B\\u200E${trimDefaultCharacters}]+|[\\s\\uFEFF\\u200B\\u200E${trimDefaultCharacters}]+$`;
    return from(input).replace(new RegExp(regex, 'gu'), '');
  }

  return from(input).replace(new RegExp(`^[${escapeRegExp(charlist)}]+|[${escapeRegExp(charlist)}]+$`, 'gu'), '');
}

/**
 * Remove all whitespace from the end of a string.
 */
export function trimEnd(input: StringInput, charlist: null | string = null) {
  if (charlist === null) {
    const rtrimDefaultCharacters = ' \n\r\t\v\0';
    const regex = `[\\s\\uFEFF\\u200B\\u200E${rtrimDefaultCharacters}]+$`;
    return from(input).replace(new RegExp(regex, 'gu'), '');
  }

  return from(input).replace(new RegExp(`[${escapeRegExp(charlist)}]+$`, 'gu'), '');
}

/**
 * Remove all whitespace from the beginning of a string.
 */
export function trimStart(input: StringInput, charlist: null | string = null) {
  if (charlist === null) {
    const ltrimDefaultCharacters = ' \n\r\t\v\0';
    const regex = `^[\\s\\uFEFF\\u200B\\u200E${ltrimDefaultCharacters}]+`;
    return from(input).replace(new RegExp(regex, 'gu'), '');
  }

  return from(input).replace(new RegExp(`^[${escapeRegExp(charlist)}]+`, 'gu'), '');
}

/**
 * Unwrap the string with the given strings.
 */
export function unwrap(input: StringInput, before: StringInput, after: StringInput = before) {
  const beforeStr = from(before);
  const afterStr = from(after);
  let str = from(input);

  if (str.startsWith(beforeStr) && str.endsWith(afterStr)) {
    str = str.slice(beforeStr.length);
    str = str.slice(0, -afterStr.length);
  }

  return str;
}

/**
 * Convert the given string to upper-case.
 */
export function upper(input: StringInput) {
  return from(input).toUpperCase();
}

/**
 * Make a string's first character uppercase.
 */
export function upperFirst(input: StringInput) {
  const str = from(input);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Make a string's first word uppercase.
 */
export function upperFirstWord(input: StringInput) {
  return from(input).replace(/^\s*\w/, (match) => match.toUpperCase());
}

/**
 * Split a string into pieces by uppercase characters.
 */
export function upperSplit(input: StringInput) {
  return from(input)
    .split(/(?=[A-Z])/)
    .filter(Boolean);
}

/**
 * Generate a UUID (version 4).
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate a UUID (version 7).
 */
export function uuid7(time: Date = new Date()) {
  const timestamp = time.getTime();
  const high = Math.floor(timestamp / 0x100000000);
  const low = timestamp & 0xffffffff;

  // Gerar UUID com base no timestamp
  const uuid = 'xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r: number;
    if (c === 'x') {
      r = Math.floor(Math.random() * 16);
    } else {
      // Para a versão 7, o valor 'y' deve começar com '8' ou '9', conforme especificação
      r = Math.floor(Math.random() * 4) + 8;
    }
    return r.toString(16);
  });

  // Preenchendo o UUID com o timestamp
  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, function (_, p1, p2, p3, p4, p5) {
    return (
      p1 + p2 + p3 + p4.slice(0, 1) + high.toString(16).slice(0, 1) + p4.slice(1) + low.toString(16).slice(0, 7) + p5
    );
  });
}

/**
 * Get the number of words a string contains.
 */
export function wordCount(input: StringInput) {
  const pattern = /([A-Za-z0-9]+([-_][A-Za-z0-9])?)+\b/g;
  const words = ascii(input).match(pattern);
  return words ? words.length : 0;
}

/**
 * Wrap a string to a given number of characters.
 */
export function wordWrap(input: StringInput, characters = 75, breakChar = '\n', cutLongWords = false) {
  const str = from(input);

  const regex = cutLongWords
    ? new RegExp(`.{1,${characters}}`, 'g')
    : new RegExp(`(?:.{1,${characters}})(?:\\s|$)`, 'g');

  return (
    str
      .match(regex)
      ?.map((val) => trim(val))
      ?.join(breakChar) || str
  );
}

/**
 * Wrap the string with the given strings.
 */
export function wrap(input: StringInput, before: StringInput, after: StringInput) {
  return before + from(input) + after;
}

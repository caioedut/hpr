import * as Str from '../src/helpers/Str';

describe('Str', () => {
  describe('isString', () => {
    it('should return true for a string input', () => {
      expect(Str.isString('Hello')).toBe(true);
    });

    it('should return false for a number input', () => {
      expect(Str.isString(123)).toBe(false);
    });

    it('should return false for a boolean input', () => {
      expect(Str.isString(true)).toBe(false);
    });

    it('should return false for an object input', () => {
      expect(Str.isString({})).toBe(false);
    });

    it('should return false for an array input', () => {
      expect(Str.isString([1, 2, 3])).toBe(false);
    });

    it('should return false for null', () => {
      expect(Str.isString(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Str.isString(undefined)).toBe(false);
    });
  });

  describe('from', () => {
    it('should return the string itself if input is already a string', () => {
      expect(Str.from('Hello')).toBe('Hello');
    });

    it('should return a string representation of a number', () => {
      expect(Str.from(123)).toBe('123');
    });

    it('should return an empty string for null input', () => {
      expect(Str.from(null)).toBe('');
    });

    it('should return an empty string for undefined input', () => {
      expect(Str.from(undefined)).toBe('');
    });

    it('should convert an array to a string', () => {
      expect(Str.from([1, 2, 3])).toBe('1,2,3');
    });

    it('should convert an object to a JSON string', () => {
      expect(Str.from({ key: 'value' })).toBe('{"key":"value"}');
    });

    it("should return the string 'true' for a boolean true", () => {
      expect(Str.from(true)).toBe('true');
    });

    it("should return the string 'false' for a boolean false", () => {
      expect(Str.from(false)).toBe('false');
    });
  });

  describe('after', () => {
    it('should return the substring after the first occurrence of the search string', () => {
      const result = Str.after('hello world', 'hello');
      expect(result).toBe(' world');
    });

    it('should return the original string if the search string is not found', () => {
      const result = Str.after('hello world', 'abc');
      expect(result).toBe('hello world');
    });

    it('should return an empty string if the search string is at the end', () => {
      const result = Str.after('hello world', 'world');
      expect(result).toBe('');
    });

    it('should handle empty strings', () => {
      const result = Str.after('', 'hello');
      expect(result).toBe('');
    });

    it('should handle cases where the search string is an empty string', () => {
      const result = Str.after('hello world', '');
      expect(result).toBe('hello world');
    });
  });

  describe('afterLast', () => {
    it('should return the substring after the last occurrence of the search string', () => {
      const result = Str.afterLast('hello world hello again', 'hello');
      expect(result).toBe(' again');
    });

    it('should return the original string if the search string is not found', () => {
      const result = Str.afterLast('hello world', 'abc');
      expect(result).toBe('hello world');
    });

    it('should return an empty string if the search string is at the end', () => {
      const result = Str.afterLast('hello world', 'world');
      expect(result).toBe('');
    });

    it('should handle empty strings', () => {
      const result = Str.afterLast('', 'hello');
      expect(result).toBe('');
    });

    it('should handle cases where the search string is an empty string', () => {
      const result = Str.afterLast('hello world', '');
      expect(result).toBe('hello world');
    });
  });

  describe('ascii', () => {
    it('should remove accents and non-ASCII characters from a string', () => {
      expect(Str.ascii('Café')).toBe('Cafe');
      expect(Str.ascii('Olá Mundo!')).toBe('Ola Mundo!');
      expect(Str.ascii('Résumé')).toBe('Resume');
      expect(Str.ascii('niño')).toBe('nino');
    });

    it('should return an empty string when input is empty', () => {
      expect(Str.ascii('')).toBe('');
    });

    it('should handle non-ASCII characters properly', () => {
      expect(Str.ascii('你好')).toBe('');
      expect(Str.ascii('©')).toBe('');
    });

    it('should return the same string when there are no accents or non-ASCII characters', () => {
      expect(Str.ascii('Hello World')).toBe('Hello World');
    });
  });

  describe('base64', () => {
    it('should convert string to Base64', () => {
      const result = Str.base64('Hello');
      expect(result).toBe('SGVsbG8=');
    });

    it('should handle empty string', () => {
      const result = Str.base64('');
      expect(result).toBe('');
    });
  });

  describe('before', () => {
    it('should return the substring before the first occurrence of the search string', () => {
      const result = Str.before('hello world', 'hello');
      expect(result).toBe('');
    });

    it('should return the original string if the search string is not found', () => {
      const result = Str.before('hello world', 'abc');
      expect(result).toBe('hello world');
    });

    it("should return the portion before the search string if it's at the start", () => {
      const result = Str.before('hello world', 'world');
      expect(result).toBe('hello ');
    });

    it('should handle empty strings', () => {
      const result = Str.before('', 'hello');
      expect(result).toBe('');
    });

    it('should handle cases where the search string is an empty string', () => {
      const result = Str.before('hello world', '');
      expect(result).toBe('hello world');
    });
  });

  describe('beforeLast', () => {
    it('should return the substring before the last occurrence of the search string', () => {
      const result = Str.beforeLast('hello world hello again', 'hello');
      expect(result).toBe('hello world ');
    });

    it('should return the original string if the search string is not found', () => {
      const result = Str.beforeLast('hello world', 'abc');
      expect(result).toBe('hello world');
    });

    it('should return the portion before the last occurrence when the search string is at the end', () => {
      const result = Str.beforeLast('hello world', 'world');
      expect(result).toBe('hello ');
    });

    it('should handle empty strings', () => {
      const result = Str.beforeLast('', 'hello');
      expect(result).toBe('');
    });

    it('should handle cases where the search string is an empty string', () => {
      const result = Str.beforeLast('hello world', '');
      expect(result).toBe('hello world');
    });
  });

  describe('between', () => {
    it('should return the substring between the start and end values', () => {
      const result = Str.between('hello world again', 'hello', 'again');
      expect(result).toBe(' world ');
    });

    it('should return an empty string if the start or end value is not found', () => {
      const result = Str.between('hello world', 'abc', 'again');
      expect(result).toBe('');
    });

    it('should return the portion between the values if they exist', () => {
      const result = Str.between('test with [[var]]', '[[', ']]');
      expect(result).toBe('var');
    });

    it('should handle empty strings', () => {
      const result = Str.between('', 'start', 'end');
      expect(result).toBe('');
    });

    it('should handle cases where the start or end value is empty', () => {
      const result = Str.between('hello world', '', '');
      expect(result).toBe('hello world');
    });
  });

  describe('betweenLast', () => {
    it('should return the portion between the last occurrence of two values', () => {
      const result = Str.betweenLast('abc start middle end last', 'start', 'end');
      expect(result).toBe(' middle ');
    });

    it('should return an empty string if the start value is not found', () => {
      const result = Str.betweenLast('abc start middle end last', 'notFound', 'end');
      expect(result).toBe('');
    });

    it('should return an empty string if the end value is not found', () => {
      const result = Str.betweenLast('abc start middle end last', 'start', 'notFound');
      expect(result).toBe('');
    });

    it('should return an empty string if the start index is greater than or equal to the end index', () => {
      const result = Str.betweenLast('abc start middle end start', 'start', 'end');
      expect(result).toBe('');
    });

    it('should return the entire string if start or end is empty', () => {
      const result1 = Str.betweenLast('abc start middle end', '', 'end');
      const result2 = Str.betweenLast('abc start middle end', 'start', '');
      expect(result1).toBe('abc start middle end');
      expect(result2).toBe('abc start middle end');
    });

    it('should return an empty string if start and end do not exist in the string', () => {
      const result = Str.betweenLast('abc start middle end last', 'begin', 'finish');
      expect(result).toBe('');
    });
  });

  describe('camelCase', () => {
    it('should convert a string to camel case', () => {
      const result = Str.camelCase('hello_world');
      expect(result).toBe('helloWorld');
    });

    it('should handle strings with multiple words and spaces', () => {
      const result = Str.camelCase('hello world example');
      expect(result).toBe('helloWorldExample');
    });

    it('should handle strings with hyphens', () => {
      const result = Str.camelCase('hello-world-example');
      expect(result).toBe('helloWorldExample');
    });

    it('should keep existing camel case strings unchanged', () => {
      const result = Str.camelCase('helloWorld');
      expect(result).toBe('helloWorld');
    });

    it('should handle an empty string', () => {
      const result = Str.camelCase('');
      expect(result).toBe('');
    });
  });

  describe('charAt', () => {
    it('should return the character at the specified index', () => {
      const result = Str.charAt('hello', 1);
      expect(result).toBe('e');
    });

    it('should return an empty string if the index is out of bounds', () => {
      const result = Str.charAt('hello', 10);
      expect(result).toBe('');
    });

    it('should return the first character if the index is 0', () => {
      const result = Str.charAt('hello', 0);
      expect(result).toBe('h');
    });

    it('should handle empty strings', () => {
      const result = Str.charAt('', 0);
      expect(result).toBe('');
    });
  });

  describe('chopStart', () => {
    it('should remove the string if it exists at the start', () => {
      const result = Str.chopStart('hello world', 'hello');
      expect(result).toBe(' world');
    });

    it('should handle multiple needles and remove the first match', () => {
      const result = Str.chopStart('hello world', ['goodbye', 'hello']);
      expect(result).toBe(' world');
    });

    it('should not remove anything if the string does not match', () => {
      const result = Str.chopStart('hello world', 'goodbye');
      expect(result).toBe('hello world');
    });

    it('should return the string unchanged if no match is found', () => {
      const result = Str.chopStart('hello world', 'world');
      expect(result).toBe('hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.chopStart('', 'hello');
      expect(result).toBe('');
    });
  });

  describe('chopEnd', () => {
    it('should remove the string if it exists at the end', () => {
      const result = Str.chopEnd('hello world', 'world');
      expect(result).toBe('hello ');
    });

    it('should handle multiple needles and remove the first match', () => {
      const result = Str.chopEnd('hello world', ['goodbye', 'world']);
      expect(result).toBe('hello ');
    });

    it('should not remove anything if the string does not match', () => {
      const result = Str.chopEnd('hello world', 'goodbye');
      expect(result).toBe('hello world');
    });

    it('should return the string unchanged if no match is found', () => {
      const result = Str.chopEnd('hello world', 'hello');
      expect(result).toBe('hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.chopEnd('', 'world');
      expect(result).toBe('');
    });
  });

  describe('color', () => {
    it('should return a hex color string', () => {
      const result = Str.color('example');
      expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should return the same color for the same input', () => {
      const color1 = Str.color('hello');
      const color2 = Str.color('hello');
      expect(color1).toBe(color2);
    });

    it('should return different colors for different inputs', () => {
      const color1 = Str.color('hello');
      const color2 = Str.color('world');
      expect(color1).not.toBe(color2);
    });
  });

  describe('colorPastel', () => {
    it('should return a pastel hex color string', () => {
      const result = Str.colorPastel('example');
      expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should return the same pastel color for the same input', () => {
      const color1 = Str.colorPastel('hello');
      const color2 = Str.colorPastel('hello');
      expect(color1).toBe(color2);
    });

    it('should return different pastel colors for different inputs', () => {
      const color1 = Str.colorPastel('hello');
      const color2 = Str.colorPastel('world');
      expect(color1).not.toBe(color2);
    });
  });

  describe('contains', () => {
    it('should return true if the string contains the substring', () => {
      const result = Str.contains('hello world', 'world');
      expect(result).toBe(true);
    });

    it('should return false if the string does not contain the substring', () => {
      const result = Str.contains('hello world', 'goodbye');
      expect(result).toBe(false);
    });

    it('should return true if the string contains any of the substrings (multiple needles)', () => {
      const result = Str.contains('hello world', ['world', 'goodbye']);
      expect(result).toBe(true);
    });

    it('should return false if the string does not contain any of the substrings (multiple needles)', () => {
      const result = Str.contains('hello world', ['goodbye', 'earth']);
      expect(result).toBe(false);
    });

    it('should ignore case when specified', () => {
      const result = Str.contains('hello world', 'WORLD', true);
      expect(result).toBe(true);
    });

    it('should return false if the input is empty', () => {
      const result = Str.contains('', 'hello');
      expect(result).toBe(false);
    });

    it('should return false if the substring is empty', () => {
      const result = Str.contains('hello world', '');
      expect(result).toBe(false);
    });

    it('should return true if any substring is non-empty', () => {
      const result = Str.contains('hello world', ['hello', '']);
      expect(result).toBe(true);
    });

    it('should return false if all substrings are empty', () => {
      const result = Str.contains('hello world', ['', '']);
      expect(result).toBe(false);
    });
  });

  describe('containsAll', () => {
    it('should return true if the string contains all substrings', () => {
      const result = Str.containsAll('hello world', ['hello', 'world']);
      expect(result).toBe(true);
    });

    it('should return false if the string does not contain all substrings', () => {
      const result = Str.containsAll('hello world', ['hello', 'earth']);
      expect(result).toBe(false);
    });

    it('should return true if the string contains all substrings (multiple needles)', () => {
      const result = Str.containsAll('hello world', ['hello', 'world']);
      expect(result).toBe(true);
    });

    it('should return false if the string does not contain all substrings (multiple needles)', () => {
      const result = Str.containsAll('hello world', ['hello', 'earth']);
      expect(result).toBe(false);
    });

    it('should ignore case when specified', () => {
      const result = Str.containsAll('hello world', ['HELLO', 'WORLD'], true);
      expect(result).toBe(true);
    });

    it('should return false if any substring is empty', () => {
      const result = Str.containsAll('hello world', ['hello', '']);
      expect(result).toBe(false);
    });

    it('should return false if any substring is empty', () => {
      const result = Str.containsAll('hello world', ['hello', '']);
      expect(result).toBe(false);
    });

    it('should return false if all substrings are empty', () => {
      const result = Str.containsAll('hello world', ['', '']);
      expect(result).toBe(false);
    });
  });

  describe('doesntContain', () => {
    it('should return true if the string does not contain the substring', () => {
      const result = Str.doesntContain('hello world', 'goodbye');
      expect(result).toBe(true);
    });

    it('should return false if the string contains the substring', () => {
      const result = Str.doesntContain('hello world', 'world');
      expect(result).toBe(false);
    });

    it('should return true if the string does not contain any of the substrings (multiple needles)', () => {
      const result = Str.doesntContain('hello world', ['goodbye', 'earth']);
      expect(result).toBe(true);
    });

    it('should return false if the string contains any of the substrings (multiple needles)', () => {
      const result = Str.doesntContain('hello world', ['world', 'goodbye']);
      expect(result).toBe(false);
    });

    it('should ignore case when specified', () => {
      const result = Str.doesntContain('hello world', 'WORLD', true);
      expect(result).toBe(false);
    });

    it('should return true if the input is empty', () => {
      const result = Str.doesntContain('', 'hello');
      expect(result).toBe(true);
    });

    it('should return true if the substring is empty', () => {
      const result = Str.doesntContain('hello world', '');
      expect(result).toBe(true);
    });
  });

  describe('deduplicate', () => {
    it('should replace consecutive instances of a character with a single character', () => {
      const result = Str.deduplicate('hello    world', ' ');
      expect(result).toBe('hello world');
    });

    it('should return the same string if there are no consecutive characters', () => {
      const result = Str.deduplicate('hello world', ' ');
      expect(result).toBe('hello world');
    });

    it('should replace consecutive instances of the given character, even at the start', () => {
      const result = Str.deduplicate('    hello world', ' ');
      expect(result).toBe(' hello world');
    });

    it('should handle empty strings', () => {
      const result = Str.deduplicate('', ' ');
      expect(result).toBe('');
    });

    it('should handle when the character to deduplicate is not found', () => {
      const result = Str.deduplicate('hello', ' ');
      expect(result).toBe('hello');
    });
  });

  describe('endsWith', () => {
    it('should return true if the string ends with the given substring', () => {
      const result = Str.endsWith('hello world', 'world');
      expect(result).toBe(true);
    });

    it('should return false if the string does not end with the given substring', () => {
      const result = Str.endsWith('hello world', 'hello');
      expect(result).toBe(false);
    });

    it('should return true if the string ends with any of the given substrings', () => {
      const result = Str.endsWith('hello world', ['world', 'earth']);
      expect(result).toBe(true);
    });

    it('should return false if the string does not end with any of the given substrings', () => {
      const result = Str.endsWith('hello world', ['earth', 'mars']);
      expect(result).toBe(false);
    });

    it('should handle empty strings', () => {
      const result = Str.endsWith('', 'hello');
      expect(result).toBe(false);
    });

    it('should return false if an empty string is passed as a substring', () => {
      const result = Str.endsWith('hello', '');
      expect(result).toBe(false);
    });
  });

  describe('escapeRegExp', () => {
    it('should escape special characters for regular expression', () => {
      const result = Str.escapeRegExp('hello.*+?^${}()|[]\\');
      expect(result).toBe('hello\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });

    it('should not modify characters that are not special regex characters', () => {
      const result = Str.escapeRegExp('hello world');
      expect(result).toBe('hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.escapeRegExp('');
      expect(result).toBe('');
    });

    it('should escape a string with only special characters', () => {
      const result = Str.escapeRegExp('.*+?^${}()|[]\\');
      expect(result).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });

    it('should return the same string if there are no special characters', () => {
      const result = Str.escapeRegExp('abc123');
      expect(result).toBe('abc123');
    });
  });

  describe('suffix', () => {
    it('should append the suffix if not present at the end', () => {
      const result = Str.suffix('hello', '!');
      expect(result).toBe('hello!');
    });

    it('should not append the suffix if it is already present at the end', () => {
      const result = Str.suffix('hello!', '!');
      expect(result).toBe('hello!');
    });

    it('should remove extra instances of the suffix at the end', () => {
      const result = Str.suffix('hello!!!', '!');
      expect(result).toBe('hello!');
    });

    it('should handle an empty string', () => {
      const result = Str.suffix('', '!');
      expect(result).toBe('!');
    });

    it('should handle an empty suffix', () => {
      const result = Str.suffix('hello', '');
      expect(result).toBe('hello');
    });

    it('should handle when the input string is already equal to the suffix', () => {
      const result = Str.suffix('!', '!');
      expect(result).toBe('!');
    });
  });

  describe('is', () => {
    it('should return true if the string matches the given pattern', () => {
      const result = Str.is('hello world', /hello/);
      expect(result).toBe(true);
    });

    it("should return false if the string doesn't match the given pattern", () => {
      const result = Str.is('hello world', /goodbye/);
      expect(result).toBe(false);
    });

    it('should return true if the string matches any of the given patterns', () => {
      const result = Str.is('hello world', [/goodbye/, /hello/]);
      expect(result).toBe(true);
    });

    it("should return false if the string doesn't match any of the given patterns", () => {
      const result = Str.is('hello world', [/goodbye/, /earth/]);
      expect(result).toBe(false);
    });

    it('should handle empty string input', () => {
      const result = Str.is('', /hello/);
      expect(result).toBe(false);
    });

    it('should return true if the pattern is an array of regex and any match', () => {
      const result = Str.is('example text', [/\d/, /text/]);
      expect(result).toBe(true);
    });

    it('should return false if the pattern array does not match', () => {
      const result = Str.is('example text', [/\d/, /numbers/]);
      expect(result).toBe(false);
    });
  });

  describe('isAscii', () => {
    it('should return true for a string with only 7-bit ASCII characters', () => {
      const result = Str.isAscii('Hello world');
      expect(result).toBe(true);
    });

    it('should return false for a string containing non-ASCII characters', () => {
      const result = Str.isAscii('Hello world é');
      expect(result).toBe(false);
    });

    it('should return true for an empty string', () => {
      const result = Str.isAscii('');
      expect(result).toBe(true);
    });
  });

  describe('isJson', () => {
    it('should return true for a valid JSON string', () => {
      const result = Str.isJson('{"name": "John", "age": 30}');
      expect(result).toBe(true);
    });

    it('should return false for an invalid JSON string', () => {
      const result = Str.isJson('{name: John, age: 30}');
      expect(result).toBe(false);
    });

    it('should return false for a non-string input', () => {
      const result = Str.isJson({ name: 'John' });
      expect(result).toBe(false);
    });

    it('should return false for an empty string', () => {
      const result = Str.isJson('');
      expect(result).toBe(false);
    });
  });

  describe('isUlid', () => {
    it('should return true for a valid ULID', () => {
      const result = Str.isUlid('01F8V9P07J1YZV1G6W3TK0Y3S9');
      expect(result).toBe(true);
    });

    it('should return false for an invalid ULID', () => {
      const result = Str.isUlid('1234-5678-9012-3456');
      expect(result).toBe(false);
    });

    it('should return false for a ULID that is too short', () => {
      const result = Str.isUlid('01F8V9P07J1YZV1G6');
      expect(result).toBe(false);
    });

    it('should return false for a ULID that is too long', () => {
      const result = Str.isUlid('01F8V9P07J1YZV1G6W3TK0Y3S9ABCDE');
      expect(result).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should return true for a valid URL', () => {
      const result = Str.isUrl('https://www.example.com');
      expect(result).toBe(true);
    });

    it('should return false for an invalid URL', () => {
      const result = Str.isUrl('http-invalid-url');
      expect(result).toBe(false);
    });

    it('should return false for a string that is not a URL', () => {
      const result = Str.isUrl('Hello world');
      expect(result).toBe(false);
    });

    it('should return false for an empty string', () => {
      const result = Str.isUrl('');
      expect(result).toBe(false);
    });
  });

  describe('isUuid', () => {
    it('should return true for a valid UUID', () => {
      const result = Str.isUuid('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toBe(true);
    });

    it('should return false for an invalid UUID', () => {
      const result = Str.isUuid('123e4567-e89b-12d3-a456-42661417400Z');
      expect(result).toBe(false);
    });

    it('should return false for a non-UUID string', () => {
      const result = Str.isUuid('Hello world');
      expect(result).toBe(false);
    });

    it('should return false for an empty string', () => {
      const result = Str.isUuid('');
      expect(result).toBe(false);
    });
  });

  describe('kebabCase', () => {
    it('should convert a string to kebab case', () => {
      const result = Str.kebabCase('Hello World Example');
      expect(result).toBe('hello-world-example');
    });

    it('should handle strings with special characters', () => {
      const result = Str.kebabCase('Hello_World-Example!');
      expect(result).toBe('hello-world-example');
    });

    it('should handle single words', () => {
      const result = Str.kebabCase('hello');
      expect(result).toBe('hello');
    });

    it('should handle empty string', () => {
      const result = Str.kebabCase('');
      expect(result).toBe('');
    });

    it('should handle strings with numbers', () => {
      const result = Str.kebabCase('Example 123');
      expect(result).toBe('example-123');
    });
  });

  describe('length', () => {
    it('should return the length of the string', () => {
      const result = Str.length('Hello world');
      expect(result).toBe(11);
    });

    it('should return 0 for an empty string', () => {
      const result = Str.length('');
      expect(result).toBe(0);
    });

    it('should return the correct length for a string with special characters', () => {
      const result = Str.length('Hello! World?');
      expect(result).toBe(13);
    });

    it('should return the correct length for a string with numbers', () => {
      const result = Str.length('Hello123');
      expect(result).toBe(8);
    });

    it('should return the correct length for a string with spaces', () => {
      const result = Str.length('Hello world ');
      expect(result).toBe(12);
    });
  });

  describe('limit', () => {
    it('should return the original string if it is shorter than or equal to the limit', () => {
      const result = Str.limit('Hello World', 20);
      expect(result).toBe('Hello World');
    });

    it('should truncate the string and add "..." when the string exceeds the limit', () => {
      const result = Str.limit('This is a very long sentence', 10);
      expect(result).toBe('This is a...');
    });

    it('should truncate at the nearest word when preserveWords is true', () => {
      const result = Str.limit('This is a very long sentence', 12, '...', true);
      expect(result).toBe('This is a...');
    });

    it('should truncate the string without preserving words when preserveWords is false', () => {
      const result = Str.limit('This is a very long sentence', 12, '...', false);
      expect(result).toBe('This is a ve...');
    });

    it('should remove extra spaces before truncating when preserveWords is true', () => {
      const result = Str.limit('This is a\nlong sentence', 12, '...', true);
      expect(result).toBe('This is a...');
    });
  });

  describe('limitWords', () => {
    it('should limit the number of words correctly', () => {
      expect(Str.limitWords('Hello world this is a test', 3)).toBe('Hello world this...');
    });

    it('should add ellipsis when truncating', () => {
      expect(Str.limitWords('This is a long string that needs truncation', 5)).toBe('This is a long string...');
    });

    it('should not truncate if the string is short enough', () => {
      expect(Str.limitWords('Short string', 10)).toBe('Short string');
    });
  });

  describe('lower', () => {
    it('should convert all characters to lowercase', () => {
      const result = Str.lower('Hello World');
      expect(result).toBe('hello world');
    });

    it('should return an already lowercase string unchanged', () => {
      const result = Str.lower('hello world');
      expect(result).toBe('hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.lower('');
      expect(result).toBe('');
    });
  });

  describe('lowerFirst', () => {
    it('should make the first character lowercase', () => {
      const result = Str.lowerFirst('Hello World');
      expect(result).toBe('hello World');
    });

    it('should return a string with the first letter already lowercase unchanged', () => {
      const result = Str.lowerFirst('hello World');
      expect(result).toBe('hello World');
    });

    it('should handle an empty string', () => {
      const result = Str.lowerFirst('');
      expect(result).toBe('');
    });

    it('should handle a string with only one character', () => {
      const result = Str.lowerFirst('A');
      expect(result).toBe('a');
    });
  });

  describe('lowerFirstWord', () => {
    it('should make the first word lowercase', () => {
      const result = Str.lowerFirstWord('Hello World');
      expect(result).toBe('hello World');
    });

    it('should handle the string where the first word is already lowercase', () => {
      const result = Str.lowerFirstWord('hello World');
      expect(result).toBe('hello World');
    });

    it('should handle a string with multiple spaces', () => {
      const result = Str.lowerFirstWord('  Hello World');
      expect(result).toBe('  hello World');
    });

    it('should handle an empty string', () => {
      const result = Str.lowerFirstWord('');
      expect(result).toBe('');
    });
  });

  describe('mask', () => {
    it('should mask a portion of the string with the specified character', () => {
      const result = Str.mask('Hello World', '*', 6, 5);
      expect(result).toBe('Hello *****');
    });

    it('should handle a case where character is empty and return the original string', () => {
      const result = Str.mask('Hello World', '', 6, 5);
      expect(result).toBe('Hello World');
    });

    it('should handle cases where the segment is empty', () => {
      const result = Str.mask('Hello World', '*', 12, 5);
      expect(result).toBe('Hello World');
    });

    it('should handle negative index correctly', () => {
      const result = Str.mask('Hello World', '*', -5, 3);
      expect(result).toBe('Hello ***ld');
    });

    it('should return the original string when the start index is out of bounds', () => {
      const result = Str.mask('Hello World', '*', 100, 5);
      expect(result).toBe('Hello World');
    });

    it('should mask the entire string if no length is specified', () => {
      const result = Str.mask('Hello World', '*', 0);
      expect(result).toBe('***********');
    });
  });

  describe('pad', () => {
    it('should pad both sides of a string with spaces', () => {
      const result = Str.pad('Hello', 10);
      expect(result).toBe('  Hello   ');
    });

    it('should pad both sides of a string with a custom pad character', () => {
      const result = Str.pad('Hello', 10, '*');
      expect(result).toBe('**Hello***');
    });

    it('should return the original string if no padding is needed', () => {
      const result = Str.pad('Hello', 5);
      expect(result).toBe('Hello');
    });

    it('should pad both sides of a string with uneven padding', () => {
      const result = Str.pad('Hello', 9, '*');
      expect(result).toBe('**Hello**');
    });
  });

  describe('padStart', () => {
    it('should pad the start of a string with spaces', () => {
      const result = Str.padStart('Hello', 10);
      expect(result).toBe('     Hello');
    });

    it('should pad the start of a string with a custom pad character', () => {
      const result = Str.padStart('Hello', 10, '*');
      expect(result).toBe('*****Hello');
    });

    it('should return the original string if no padding is needed', () => {
      const result = Str.padStart('Hello', 5);
      expect(result).toBe('Hello');
    });
  });

  describe('padEnd', () => {
    it('should pad the end of a string with spaces', () => {
      const result = Str.padEnd('Hello', 10);
      expect(result).toBe('Hello     ');
    });

    it('should pad the end of a string with a custom pad character', () => {
      const result = Str.padEnd('Hello', 10, '*');
      expect(result).toBe('Hello*****');
    });

    it('should return the original string if no padding is needed', () => {
      const result = Str.padEnd('Hello', 5);
      expect(result).toBe('Hello');
    });
  });

  describe('password', () => {
    it('should generate a random password of the default length 32', () => {
      const result = Str.password();
      expect(result).toHaveLength(32);
    });

    it('should generate a password with only letters when letters option is true', () => {
      const result = Str.password(10, { letters: true, numbers: false, symbols: false });
      expect(result).toMatch(/^[a-zA-Z]+$/); // Only letters
    });

    it('should generate a password with only numbers when numbers option is true', () => {
      const result = Str.password(10, { letters: false, numbers: true, symbols: false });
      expect(result).toMatch(/^[0-9]+$/); // Only numbers
    });

    it('should generate a password with only symbols when symbols option is true', () => {
      const result = Str.password(10, { letters: false, numbers: false, symbols: true });
      expect(result).toMatch(/^[~!#$%^&*()-_.,<>?/\\{}[\]|:;]+$/); // Only symbols
    });

    it('should generate a password including spaces when spaces option is true', () => {
      const result = Str.password(10, { letters: true, numbers: true, spaces: true, symbols: true });
      expect(result).toMatch(/[a-zA-Z0-9~!#$%^&*()-_.,<>?/\\{}[\]|:; ]+/); // Include letters, numbers, symbols, and spaces
    });

    it('should generate a password with a custom length', () => {
      const result = Str.password(16);
      expect(result).toHaveLength(16);
    });

    it('should return an empty string if no character set is selected', () => {
      const result = Str.password(10, { letters: false, numbers: false, symbols: false });
      expect(result).toBe('');
    });
  });

  describe('plural', () => {
    it('should return the singular form when count is 1', () => {
      const result = Str.plural('apple', 1);
      expect(result).toBe('apple');
    });

    it('should return the plural form when count is greater than 1', () => {
      const result = Str.plural('apple', 2);
      expect(result).toBe('apples');
    });

    it('should return the custom plural form if provided', () => {
      const result = Str.plural('box', 2, 'boxes');
      expect(result).toBe('boxes');
    });
  });

  describe('position', () => {
    it('should return the correct position of the first occurrence of the needle', () => {
      const result = Str.position('hello world', 'world');
      expect(result).toBe(6);
    });

    it('should return -1 when the needle is not found', () => {
      const result = Str.position('hello world', 'foo');
      expect(result).toBe(-1);
    });

    it('should consider the offset when searching for the needle', () => {
      const result = Str.position('hello world', 'o', 5);
      expect(result).toBe(7);
    });
  });

  describe('random', () => {
    it('should generate a random string of the default length 16', () => {
      const result = Str.random();
      expect(result).toHaveLength(16);
    });

    it('should generate a random string with a custom length', () => {
      const result = Str.random(10);
      expect(result).toHaveLength(10);
    });

    it('should generate a random string that consists of alphanumeric characters', () => {
      const result = Str.random(10);
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe('remove', () => {
    it('should remove a single occurrence of the string', () => {
      const result = Str.remove('hello world', 'world');
      expect(result).toBe('hello ');
    });

    it('should remove all occurrences of the string when there are multiple matches', () => {
      const result = Str.remove('hello hello hello', 'hello');
      expect(result).toBe('  ');
    });

    it('should remove a case-insensitive occurrence of the string', () => {
      const result = Str.remove('hello world', 'WORLD', true);
      expect(result).toBe('hello ');
    });

    it('should handle an array of strings to remove', () => {
      const result = Str.remove('hello world hello', ['hello', 'world']);
      expect(result).toBe('  ');
    });
  });

  describe('repeat', () => {
    it('should repeat the string the correct number of times', () => {
      const result = Str.repeat('a', 3);
      expect(result).toBe('aaa');
    });

    it('should return an empty string when the repetition count is 0', () => {
      const result = Str.repeat('a', 0);
      expect(result).toBe('');
    });

    it('should return the original string when the repetition count is 1', () => {
      const result = Str.repeat('a', 1);
      expect(result).toBe('a');
    });
  });

  describe('replace', () => {
    it('should replace a single string with another string', () => {
      const result = Str.replace('hello world', 'world', 'everyone');
      expect(result).toBe('hello everyone');
    });

    it('should replace multiple occurrences of a string', () => {
      const result = Str.replace('hello hello hello', 'hello', 'hi');
      expect(result).toBe('hi hi hi');
    });

    it('should handle arrays of input, search, and replace values', () => {
      const result = Str.replace(['hello world', 'goodbye world'], ['hello', 'world'], ['hi', 'earth']);
      expect(result).toEqual(['hi earth', 'goodbye earth']);
    });

    it('should replace using regular expressions', () => {
      const result = Str.replace('123abc', 'a', 'X');
      expect(result).toBe('123Xbc');
    });

    it('should support case insensitive replacement', () => {
      const result = Str.replace('Hello hello', 'hello', 'hi', true);
      expect(result).toBe('hi hi');
    });

    it('should replace multiple search strings with their corresponding replacements', () => {
      const result = Str.replace('hello world, good world', ['hello', 'world'], ['hi', 'earth']);
      expect(result).toBe('hi earth, good earth');
    });

    it('should replace only the matched patterns', () => {
      const result = Str.replace('apple apple apple', 'apple', 'orange');
      expect(result).toBe('orange orange orange');
    });

    it('should return the original string if no match is found', () => {
      const result = Str.replace('hello', 'world', 'everyone');
      expect(result).toBe('hello');
    });

    it('should return the original string when replacing with an empty string', () => {
      const result = Str.replace('hello world', 'world', '');
      expect(result).toBe('hello ');
    });
  });

  describe('replaceArray', () => {
    it('should replace sequentially a string with an array of replacements', () => {
      const result = Str.replaceArray('hello world hello', 'hello', ['hi', 'hey']);
      expect(result).toBe('hi world hey');
    });

    it('should handle a case where replacements array is longer than matches', () => {
      const result = Str.replaceArray('hello world hello', 'hello', ['hi', 'hey', 'hola']);
      expect(result).toBe('hi world hey');
    });

    it('should handle a case where replacements array is shorter than matches', () => {
      const result = Str.replaceArray('hello world hello', 'hello', ['hi']);
      expect(result).toBe('hi world hello');
    });

    it('should return the original string if no match is found', () => {
      const result = Str.replaceArray('hello world', 'abc', ['hi', 'hey']);
      expect(result).toBe('hello world');
    });

    it('should replace all occurrences when the replacement array has enough values', () => {
      const result = Str.replaceArray('hello world hello', 'hello', ['hi', 'hey']);
      expect(result).toBe('hi world hey');
    });

    it('should handle cases where replacements have different lengths', () => {
      const result = Str.replaceArray('apple banana apple', 'apple', ['orange', 'grape']);
      expect(result).toBe('orange banana grape');
    });

    it('should handle cases with special characters', () => {
      const result = Str.replaceArray('apple@banana!apple', '@', ['#', '@']);
      expect(result).toBe('apple#banana!apple');
    });

    it('should handle an empty input string', () => {
      const result = Str.replaceArray('', 'hello', ['hi']);
      expect(result).toBe('');
    });
  });

  describe('replaceFirst', () => {
    it('should replace the first occurrence of the search string', () => {
      const result = Str.replaceFirst('hello world', 'world', 'there');
      expect(result).toBe('hello there');
    });

    it('should return the string unchanged if the search string is not found', () => {
      const result = Str.replaceFirst('hello world', 'earth', 'there');
      expect(result).toBe('hello world');
    });
  });

  describe('replaceLast', () => {
    it('should replace the last occurrence of the search string', () => {
      const result = Str.replaceLast('hello world world', 'world', 'there');
      expect(result).toBe('hello world there');
    });

    it('should return the string unchanged if the search string is not found', () => {
      const result = Str.replaceLast('hello world', 'earth', 'there');
      expect(result).toBe('hello world');
    });
  });

  describe('replaceStart', () => {
    it('should replace the search string if it appears at the start of the string', () => {
      const result = Str.replaceStart('hello world', 'hello', 'hi');
      expect(result).toBe('hi world');
    });

    it('should return the string unchanged if the search string is not at the start', () => {
      const result = Str.replaceStart('hi world', 'hello', 'hey');
      expect(result).toBe('hi world');
    });
  });

  describe('replaceEnd', () => {
    it('should replace the search string if it appears at the end of the string', () => {
      const result = Str.replaceEnd('hello world', 'world', 'there');
      expect(result).toBe('hello there');
    });

    it('should return the string unchanged if the search string is not at the end', () => {
      const result = Str.replaceEnd('hello world', 'hello', 'hi');
      expect(result).toBe('hello world');
    });
  });

  describe('reverse', () => {
    it('should reverse the string', () => {
      const result = Str.reverse('hello');
      expect(result).toBe('olleh');
    });

    it('should handle an empty string', () => {
      const result = Str.reverse('');
      expect(result).toBe('');
    });

    it('should handle a string with special characters', () => {
      const result = Str.reverse('hello!@#');
      expect(result).toBe('#@!olleh');
    });
  });

  describe('slug', () => {
    it('should generate a slug from the given string', () => {
      const result = Str.slug('Hello World Example');
      expect(result).toBe('hello-world-example');
    });

    it('should replace spaces with the specified separator', () => {
      const result = Str.slug('Hello World Example', '_');
      expect(result).toBe('hello_world_example');
    });

    it('should remove invalid characters and keep only alphanumeric and separator', () => {
      const result = Str.slug('Hello @World# Example!', '-');
      expect(result).toBe('hello-world-example');
    });

    it('should trim leading and trailing separators', () => {
      const result = Str.slug('  Hello World Example  ', '-');
      expect(result).toBe('hello-world-example');
    });

    it('should handle an empty string', () => {
      const result = Str.slug('');
      expect(result).toBe('');
    });
  });

  describe('snakeCase', () => {
    it('should convert a string to snake case', () => {
      const result = Str.snakeCase('Hello World Example');
      expect(result).toBe('hello_world_example');
    });

    it('should replace spaces with the specified separator', () => {
      const result = Str.snakeCase('Hello World Example', '-');
      expect(result).toBe('hello-world-example');
    });

    it('should handle an empty string', () => {
      const result = Str.snakeCase('');
      expect(result).toBe('');
    });
  });

  describe('squish', () => {
    it('should remove extra blank spaces from the string', () => {
      const result = Str.squish('  Hello    World   Example   ');
      expect(result).toBe('Hello World Example');
    });

    it('should trim leading and trailing spaces', () => {
      const result = Str.squish('   Hello World  ');
      expect(result).toBe('Hello World');
    });

    it('should handle an empty string', () => {
      const result = Str.squish('');
      expect(result).toBe('');
    });
  });

  describe('prefix', () => {
    it('should add the prefix to the start of the string', () => {
      const result = Str.prefix('World', 'Hello ');
      expect(result).toBe('Hello World');
    });

    it('should not add the prefix if it already starts with it', () => {
      const result = Str.prefix('Hello World', 'Hello ');
      expect(result).toBe('Hello World');
    });

    it('should handle an empty string', () => {
      const result = Str.prefix('', 'Hello ');
      expect(result).toBe('Hello ');
    });
  });

  describe('properCase', () => {
    it('should capitalize the first letter of each word', () => {
      const result = Str.properCase('hello world');
      expect(result).toBe('Hello World');
    });

    it('should handle an empty string', () => {
      const result = Str.properCase('');
      expect(result).toBe('');
    });
  });

  describe('startsWith', () => {
    it('should return true if the string starts with the given substring', () => {
      const result = Str.startsWith('hello world', 'hello');
      expect(result).toBe(true);
    });

    it('should return false if the string does not start with the given substring', () => {
      const result = Str.startsWith('hello world', 'world');
      expect(result).toBe(false);
    });

    it('should return true if the string starts with any of the given substrings', () => {
      const result = Str.startsWith('hello world', ['hello', 'hi']);
      expect(result).toBe(true);
    });

    it('should return false if the string does not start with any of the given substrings', () => {
      const result = Str.startsWith('hello world', ['world', 'earth']);
      expect(result).toBe(false);
    });

    it('should handle empty strings', () => {
      const result = Str.startsWith('', 'hello');
      expect(result).toBe(false);
    });

    it('should return false if an empty string is passed as a substring', () => {
      const result = Str.startsWith('hello', '');
      expect(result).toBe(false);
    });
  });

  describe('stripTags', () => {
    it('should remove all HTML tags', () => {
      const result = Str.stripTags('<p>Hello <strong>World</strong></p>');
      expect(result).toBe('Hello World');
    });

    it('should allow specified tags', () => {
      const result = Str.stripTags('<p>Hello <strong>World</strong></p>', '<strong>');
      expect(result).toBe('Hello <strong>World</strong>');
    });

    it('should remove PHP tags and comments', () => {
      const result = Str.stripTags('Hello <?php echo "World"; ?> <!-- comment -->');
      expect(result).toBe('Hello  ');
    });

    it('should treat <br> as newline', () => {
      const result = Str.stripTags('Line1<br>Line2<br/>Line3<BR />');
      expect(result).toBe('Line1\nLine2\nLine3\n');
    });

    it('should handle empty input', () => {
      const result = Str.stripTags('');
      expect(result).toBe('');
    });

    it('should ignore invalid allowed tags', () => {
      const result = Str.stripTags('<p>Hello</p>', 'invalid');
      expect(result).toBe('Hello');
    });

    it('should allow multiple tags', () => {
      const html = '<p>Hello <strong>World</strong> <em>and</em> everyone</p>';
      const result = Str.stripTags(html, '<strong><em>');
      expect(result).toBe('Hello <strong>World</strong> <em>and</em> everyone');
    });
  });

  describe('substr', () => {
    it('should return a portion of the string based on start and length', () => {
      const result = Str.substr('Hello World', 6, 5);
      expect(result).toBe('World');
    });

    it('should handle negative start index', () => {
      const result = Str.substr('Hello World', -5, 5);
      expect(result).toBe('World');
    });

    it('should handle when length is undefined', () => {
      const result = Str.substr('Hello World', 6);
      expect(result).toBe('World');
    });

    it('should handle an empty string', () => {
      const result = Str.substr('', 0);
      expect(result).toBe('');
    });
  });

  describe('substrCount', () => {
    it('should return the number of occurrences of a substring', () => {
      const result = Str.substrCount('Hello World Hello World', 'Hello');
      expect(result).toBe(2);
    });

    it('should handle offset parameter', () => {
      const result = Str.substrCount('Hello World Hello World', 'Hello', 6);
      expect(result).toBe(1);
    });

    it('should return 0 if the substring is not found', () => {
      const result = Str.substrCount('Hello World', 'Goodbye');
      expect(result).toBe(0);
    });

    it('should handle an empty string', () => {
      const result = Str.substrCount('', 'Hello');
      expect(result).toBe(0);
    });
  });

  describe('substrReplace', () => {
    it('should replace text within a portion of the string', () => {
      const result = Str.substrReplace('Hello World', 6, 5, 'Universe');
      expect(result).toBe('Hello Universe');
    });

    it('should handle when length is greater than the string length', () => {
      const result = Str.substrReplace('Hello', 2, 10, 'yo');
      expect(result).toBe('Heyo');
    });

    it('should handle negative start index', () => {
      const result = Str.substrReplace('Hello World', -5, 5, 'Universe');
      expect(result).toBe('Hello Universe');
    });

    it('should handle an empty string', () => {
      const result = Str.substrReplace('', 0, 0, 'Hello');
      expect(result).toBe('Hello');
    });
  });

  describe('swap', () => {
    it('should swap multiple keywords in the string', () => {
      const input = "Hello world! Let's swap keywords world and Hello.";
      const map = {
        Hello: 'Hi',
        world: 'universe',
      };
      const result = Str.swap(input, map);
      expect(result).toBe("Hi universe! Let's swap keywords universe and Hi.");
    });

    it('should not change unmatched keywords', () => {
      const input = 'No match here.';
      const map = { foo: 'bar' };
      const result = Str.swap(input, map);
      expect(result).toBe('No match here.');
    });
  });

  describe('take', () => {
    it('should take the first n characters when limit is positive', () => {
      const result = Str.take('Hello world', 5);
      expect(result).toBe('Hello');
    });

    it('should take the last n characters when limit is negative', () => {
      const result = Str.take('Hello world', -5);
      expect(result).toBe('world');
    });
  });

  describe('trim', () => {
    it('should trim whitespace from both ends of the string', () => {
      const result = Str.trim('  Hello world  ');
      expect(result).toBe('Hello world');
    });

    it('should handle custom trim characters', () => {
      const result = Str.trim('xxxHello worldxxx', 'x');
      expect(result).toBe('Hello world');
    });

    it('should return the original string when no whitespace is present', () => {
      const result = Str.trim('Hello world');
      expect(result).toBe('Hello world');
    });
  });

  describe('trimStart', () => {
    it('should trim whitespace from the beginning of the string', () => {
      const result = Str.trimStart('  Hello world');
      expect(result).toBe('Hello world');
    });

    it('should handle custom trim characters at the start', () => {
      const result = Str.trimStart('xxxHello world', 'x');
      expect(result).toBe('Hello world');
    });
  });

  describe('trimEnd', () => {
    it('should trim whitespace from the end of the string', () => {
      const result = Str.trimEnd('Hello world  ');
      expect(result).toBe('Hello world');
    });

    it('should handle custom trim characters at the end', () => {
      const result = Str.trimEnd('Hello worldxxx', 'x');
      expect(result).toBe('Hello world');
    });
  });

  describe('upper', () => {
    it('should convert the string to upper-case', () => {
      const result = Str.upper('hello world');
      expect(result).toBe('HELLO WORLD');
    });

    it('should handle an empty string', () => {
      const result = Str.upper('');
      expect(result).toBe('');
    });
  });

  describe('upperFirst', () => {
    it('should capitalize the first character of the string', () => {
      const result = Str.upperFirst('hello world');
      expect(result).toBe('Hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.upperFirst('');
      expect(result).toBe('');
    });

    it('should handle a single character string', () => {
      const result = Str.upperFirst('a');
      expect(result).toBe('A');
    });
  });

  describe('upperFirstWord', () => {
    it('should capitalize the first word of the string', () => {
      const result = Str.upperFirstWord('hello world');
      expect(result).toBe('Hello world');
    });

    it('should handle strings with leading spaces', () => {
      const result = Str.upperFirstWord('   hello world');
      expect(result).toBe('   Hello world');
    });

    it('should handle an empty string', () => {
      const result = Str.upperFirstWord('');
      expect(result).toBe('');
    });
  });

  describe('unwrap', () => {
    it('should unwrap the string with the given before and after strings', () => {
      const result = Str.unwrap('<<Hello World>>', '<<', '>>');
      expect(result).toBe('Hello World');
    });

    it('should unwrap the string when only the before string is provided', () => {
      const result = Str.unwrap('<<Hello World<<', '<<');
      expect(result).toBe('Hello World');
    });

    it('should unwrap the string when only the after string is provided', () => {
      const result = Str.unwrap('<<Hello World>>', '<<', '>>');
      expect(result).toBe('Hello World');
    });

    it('should return the original string when before string does not match', () => {
      const result = Str.unwrap('Hello World>>', '<<', '>>');
      expect(result).toBe('Hello World>>');
    });

    it('should return the original string when after string does not match', () => {
      const result = Str.unwrap('<<Hello World', '<<', '>>');
      expect(result).toBe('<<Hello World');
    });

    it('should return an empty string when the input is completely wrapped', () => {
      const result = Str.unwrap('<<>>', '<<', '>>');
      expect(result).toBe('');
    });

    it('should not modify the string if the before and after do not exist', () => {
      const result = Str.unwrap('Hello World', '<<', '>>');
      expect(result).toBe('Hello World');
    });
  });

  describe('uuid', () => {
    it('should generate a valid UUID version 4', () => {
      const result = Str.uuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      expect(result).toMatch(uuidRegex);
    });
  });

  describe('uuid7', () => {
    it('should generate a valid UUID version 7 based on current timestamp', () => {
      const result = Str.uuid7();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      expect(result).toMatch(uuidRegex);
    });

    it('should generate different UUIDs for different timestamps', () => {
      const time1 = new Date('2022-01-01');
      const time2 = new Date('2022-02-01');
      const uuid1 = Str.uuid7(time1);
      const uuid2 = Str.uuid7(time2);
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('wordCount', () => {
    it('should count words correctly without special characters', () => {
      const input = 'Hello world this is a test';
      expect(Str.wordCount(input)).toBe(6); // 6 palavras
    });

    it('should count words correctly with accented characters', () => {
      const input = 'Olá, eu sou de São Paulo!';
      expect(Str.wordCount(input)).toBe(6); // 6 palavras, incluindo "São"
    });

    it('should count words correctly with numbers', () => {
      const input = '123 test 456';
      expect(Str.wordCount(input)).toBe(3); // 3 palavras
    });

    it('should count words with special characters like hyphens correctly', () => {
      const input = 'test-word hyphenated-word';
      expect(Str.wordCount(input)).toBe(2); // 2 palavras com hífen
    });

    it('should return 0 for an empty string', () => {
      const input = '';
      expect(Str.wordCount(input)).toBe(0); // Nenhuma palavra
    });

    it('should ignore punctuation and count words correctly', () => {
      const input = 'Hello, world!';
      expect(Str.wordCount(input)).toBe(2); // 2 palavras
    });

    it('should handle strings with multiple spaces between words', () => {
      const input = '   Hello    world   ';
      expect(Str.wordCount(input)).toBe(2); // 2 palavras, espaços extras
    });

    it('should count words with numbers included correctly', () => {
      const input = 'My phone number is 123456';
      expect(Str.wordCount(input)).toBe(5); // 5 palavras
    });

    it('should handle strings with mixed language characters', () => {
      const input = 'Café é bom, não?';
      expect(Str.wordCount(input)).toBe(4); // 4 palavras
    });
  });

  describe('wordWrap', () => {
    it('should wrap a string to the specified number of characters', () => {
      const result = Str.wordWrap('This is a very long sentence that needs to be wrapped.', 10);
      expect(result).toBe('This is a\nvery long\nsentence\nthat needs\nto be\nwrapped.');
    });

    it('should wrap long words when cutLongWords is true', () => {
      const result = Str.wordWrap('Supercalifragilisticexpialidocious', 10, '\n', true);
      expect(result).toBe('Supercalif\nragilistic\nexpialidoc\nious');
    });

    it('should not wrap if the string is short enough', () => {
      const result = Str.wordWrap('Short string', 20);
      expect(result).toBe('Short string');
    });
  });

  describe('wrap', () => {
    it('should wrap the string with the given before and after strings', () => {
      const result = Str.wrap('Hello', '<b>', '</b>');
      expect(result).toBe('<b>Hello</b>');
    });

    it('should work with empty before and after strings', () => {
      const result = Str.wrap('Test', '', '');
      expect(result).toBe('Test');
    });
  });
});

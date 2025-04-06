import * as Num from '../src/helpers/Num';

describe('Num', () => {
  describe('clamp', () => {
    it('should return the number within the min and max bounds', () => {
      expect(Num.clamp(5, 1, 10)).toBe(5);
      expect(Num.clamp(0, 1, 10)).toBe(1);
      expect(Num.clamp(15, 1, 10)).toBe(10);
    });

    it('should handle negative numbers correctly', () => {
      expect(Num.clamp(-5, -10, -1)).toBe(-5);
      expect(Num.clamp(-15, -10, -1)).toBe(-10);
    });
  });

  describe('currency', () => {
    it('should format a number with the specified currency', () => {
      expect(Num.currency(1234.56, { currency: 'USD', locale: 'en-US' })).toBe('$1,234.56');
    });

    it('should handle values with no decimals', () => {
      expect(Num.currency(1000, { locale: 'en-US' })).toBe('$1,000.00');
    });

    it('should handle values with zero', () => {
      expect(Num.currency(0, { locale: 'en-US' })).toBe('$0.00');
    });

    it('should format a number with different locales', () => {
      expect(Num.currency(1234.56, { currency: 'JPY', locale: 'ja-JP' })).toBe('￥1,234.56');
      expect(Num.currency(1234.56, { currency: 'GBP', locale: 'en-GB' })).toBe('£1,234.56');
    });

    it('should round the number according to the currency format', () => {
      expect(Num.currency(1234.567, { locale: 'en-US' })).toBe('$1,234.57');
    });
  });

  describe('format', () => {
    it('should format the number with default precision', () => {
      expect(Num.format(1234.5678, { locale: 'en-US' })).toBe('1,234.57');
    });

    it('should format the number with specified precision', () => {
      expect(Num.format(1234.5678, { locale: 'en-US', precision: 3 })).toBe('1,234.568');
    });

    it('should format the number with max precision', () => {
      expect(Num.format(1234.5678, { locale: 'en-US', maxPrecision: 1 })).toBe('1,234.6');
    });

    it('should format the number with a custom locale', () => {
      expect(Num.format(1234.5678, { locale: 'de-DE' })).toBe('1.234,57');
    });
  });

  describe('from', () => {
    it('should convert a string to a number', () => {
      expect(Num.from('1234.56')).toBe(1234.56);
      expect(Num.from('1,234.56')).toBe(1234.56);
      expect(Num.from('1.234,56')).toBe(1234.56);
    });

    it('should return 0 for invalid input', () => {
      expect(Num.from('invalid')).toBe(0);
    });
  });

  describe('higher', () => {
    it('should return the highest value among the inputs', () => {
      expect(Num.higher(1, 2, 3, 4, 5)).toBe(5);
      expect(Num.higher(-1, -2, -3, -4, -5)).toBe(-1);
      expect(Num.higher(1, 3, 2)).toBe(3);
    });

    it('should handle inputs with string representations of numbers', () => {
      expect(Num.higher('1', '2', '3')).toBe(3);
      expect(Num.higher('1.1', '2.2', '0.5')).toBe(2.2);
    });

    it('should return -Infinity for an empty input array', () => {
      expect(Num.higher()).toBe(-Infinity);
    });

    it('should ignore null and undefined values', () => {
      expect(Num.higher(null, 1, undefined, 2)).toBe(2);
    });
  });

  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(Num.isNumber(123)).toBe(true);
      expect(Num.isNumber(-123)).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(Num.isNumber('123')).toBe(false);
      expect(Num.isNumber(NaN)).toBe(false);
      expect(Num.isNumber(undefined)).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should return true for numeric values', () => {
      expect(Num.isNumeric(123)).toBe(true);
      expect(Num.isNumeric(0)).toBe(true);
      expect(Num.isNumeric(-123.45)).toBe(true);
      expect(Num.isNumeric('123')).toBe(true);
      expect(Num.isNumeric('0')).toBe(true);
      expect(Num.isNumeric(null)).toBe(true);
      expect(Num.isNumeric(true)).toBe(true);
      expect(Num.isNumeric(false)).toBe(true);
    });

    it('should return false for non-numeric values', () => {
      expect(Num.isNumeric('abc')).toBe(false);
      expect(Num.isNumeric(undefined)).toBe(false);
      expect(Num.isNumeric(NaN)).toBe(false);
      expect(Num.isNumeric(Infinity)).toBe(false);
      expect(Num.isNumeric('123abc')).toBe(false);
    });
  });

  describe('lower', () => {
    it('should return the lowest value among the inputs', () => {
      expect(Num.lower(1, 2, 3, 4, 5)).toBe(1);
      expect(Num.lower(-1, -2, -3, -4, -5)).toBe(-5);
      expect(Num.lower(1, 3, 2)).toBe(1);
    });

    it('should handle inputs with string representations of numbers', () => {
      expect(Num.lower('1', '2', '3')).toBe(1);
      expect(Num.lower('1.1', '2.2', '0.5')).toBe(0.5);
    });

    it('should return Infinity for an empty input array', () => {
      expect(Num.lower()).toBe(Infinity);
    });

    it('should ignore null and undefined values', () => {
      expect(Num.lower(null, 1, undefined, 2)).toBe(1);
    });
  });

  describe('negative', () => {
    it('should return the negative of a positive number', () => {
      expect(Num.negative(5)).toBe(-5);
      expect(Num.negative(10)).toBe(-10);
    });

    it('should return the same number if it is already negative', () => {
      expect(Num.negative(-5)).toBe(-5);
      expect(Num.negative(-10)).toBe(-10);
    });

    it('should return 0 if input is 0', () => {
      expect(Num.negative(0)).toBe(0);
    });

    it('should handle string inputs', () => {
      expect(Num.negative('5')).toBe(-5);
      expect(Num.negative('-5')).toBe(-5);
    });
  });

  describe('positive', () => {
    it('should return the same number if it is positive', () => {
      expect(Num.positive(5)).toBe(5);
      expect(Num.positive(10)).toBe(10);
    });

    it('should return the absolute value of a negative number', () => {
      expect(Num.positive(-5)).toBe(5);
      expect(Num.positive(-10)).toBe(10);
    });

    it('should return 0 if input is 0', () => {
      expect(Num.positive(0)).toBe(0);
    });

    it('should handle string inputs', () => {
      expect(Num.positive('5')).toBe(5);
      expect(Num.positive('-5')).toBe(5);
    });
  });

  describe('random function', () => {
    it('should generate a random number within the given range', () => {
      const min = 1;
      const max = 10;
      const randomNumber = Num.random(min, max);

      expect(Num.isNumber(randomNumber)).toBe(true);
      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    it('should return an integer', () => {
      const min = 1;
      const max = 10;
      const randomNumber = Num.random(min, max);

      expect(Number.isInteger(randomNumber)).toBe(true);
    });

    it('should work with negative values', () => {
      const min = -10;
      const max = -1;
      const randomNumber = Num.random(min, max);

      expect(Num.isNumber(randomNumber)).toBe(true);
      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    it('should return the same number when min equals max', () => {
      const min = 5;
      const max = 5;
      const randomNumber = Num.random(min, max);

      expect(randomNumber).toBe(min);
    });
  });
});

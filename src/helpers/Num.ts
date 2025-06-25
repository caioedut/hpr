import * as Arr from './Arr';

export interface NumberCurrencyOptions {
  currency?: Intl.NumberFormatOptions['currency'];
  locale?: Intl.LocalesArgument;
}

export interface NumberFormatOptions {
  locale?: Intl.LocalesArgument;
  maxPrecision?: number;
  precision?: number;
}

export type NumberInput = any;

/**
 * Clamps the input value between the given minimum and maximum values.
 */
export function clamp(input: NumberInput, min: NumberInput, max: NumberInput) {
  return Math.min(Math.max(from(input), from(min)), from(max));
}

/**
 * Formats the input value as a currency string using the specified locale and currency.
 */
export function currency(input: any, options: NumberCurrencyOptions = {}) {
  const { currency = 'USD', locale } = options;

  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(from(input));
}

/**
 * Formats the input value as a decimal string using the specified options such as precision and locale.
 */
export function format(input: NumberInput, options: NumberFormatOptions = {}) {
  const { locale, maxPrecision, precision } = options;

  const fallback = !precision && !maxPrecision ? 2 : null;

  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: max(precision, maxPrecision, fallback),
    minimumFractionDigits: min(precision, maxPrecision, fallback),
    style: 'decimal',
  });

  return formatter.format(from(input));
}

/**
 * Converts the input value into a number, accounting for string representations with different decimal separators.
 */
export function from(input: NumberInput) {
  if (typeof input === 'string') {
    const dotIndex = input.indexOf('.');
    const commaIndex = input.indexOf(',');

    let decimalSeparator = '.';
    let thousandSeparator = ',';

    if (commaIndex > dotIndex && commaIndex !== -1) {
      decimalSeparator = ',';
      thousandSeparator = '.';
    }

    input = input.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '').replace(decimalSeparator, '.');
  }

  const num = Number(input);

  return isNaN(num) ? 0 : num;
}

/**
 * Checks if the input value is of type number and is not NaN.
 */
export function isNumber(input: any) {
  return typeof input === 'number' && !Number.isNaN(input);
}

/**
 * Checks if the input value is a valid numeric value.
 */
export function isNumeric(input: NumberInput) {
  return !isNaN(input) && isFinite(input);
}

/**
 * Returns the highest number from the provided inputs.
 */
export function max(...inputs: NumberInput[]) {
  return Math.max(...Arr.compact(inputs).map(from));
}

/**
 * Returns the lowest number from the provided inputs.
 */
export function min(...inputs: NumberInput[]) {
  return Math.min(...Arr.compact(inputs).map(from));
}

/**
 * Converts the input value to its negative equivalent, or keeps it negative if already so.
 */
export function negative(input: NumberInput) {
  const num = from(input);
  return num <= 0 ? num : num * -1;
}

/**
 * Calculates the percentage of a value relative to a total.
 *
 * Returns 0 if the total is 0 or negative.
 *
 * If `precision` is provided, the result is rounded to the specified number of decimal places.
 */
export function percent(input: NumberInput, total: NumberInput, precision: NumberInput = 0): number {
  input = from(input);
  total = from(total);
  precision = from(precision);
  if (total <= 0) return 0;
  const value = (input / total) * 100;
  return Number(value.toFixed(precision));
}

/**
 * Converts the input value to its positive equivalent, or keeps it positive if already so.
 */
export function positive(input: NumberInput) {
  const num = from(input);
  return num >= 0 ? num : num * -1;
}

/**
 * Generates a random number between the specified minimum and maximum values (inclusive).
 */
export function random(min: NumberInput, max: NumberInput) {
  const numMin = from(min);
  const numMax = from(max);
  return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
}

import * as Arr from '../../src/helpers/Arr';

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

export function clamp(input: NumberInput, min: NumberInput, max: NumberInput) {
  return Math.min(Math.max(from(input), from(min)), from(max));
}

export function currency(input: any, options: NumberCurrencyOptions = {}) {
  const { currency = 'USD', locale } = options;

  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(from(input));
}

export function format(input: NumberInput, options: NumberFormatOptions = {}) {
  const { locale, maxPrecision, precision } = options;

  const fallback = !precision && !maxPrecision ? 2 : null;

  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: higher(precision, maxPrecision, fallback),
    minimumFractionDigits: lower(precision, maxPrecision, fallback),
    style: 'decimal',
  });

  return formatter.format(from(input));
}

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

export function higher(...inputs: NumberInput[]) {
  return Math.max(...Arr.compact(inputs).map(from));
}

export function isNumber(input: any) {
  return typeof input === 'number' && !Number.isNaN(input);
}

export function isNumeric(input: NumberInput) {
  return !isNaN(input) && isFinite(input);
}

export function lower(...inputs: NumberInput[]) {
  return Math.min(...Arr.compact(inputs).map(from));
}

export function negative(input: NumberInput) {
  const num = from(input);
  return num <= 0 ? num : num * -1;
}

export function positive(input: NumberInput) {
  const num = from(input);
  return num >= 0 ? num : num * -1;
}

export function random(min: NumberInput, max: NumberInput) {
  const numMin = from(min);
  const numMax = from(max);
  return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
}

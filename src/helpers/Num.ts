export type NumberInput = any

export interface NumberFormatOptions {
    precision?: number;
    maxPrecision?: number;
    locale?: string;
}

export function isNumber(input: NumberInput) {
    return typeof input === 'number' && !Number.isNaN(input);
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

export function abbreviate(input: NumberInput, precision: number = 2) {
    let num = from(input);

    const units = ['K', 'M', 'B', 'T'];
    let unitIndex = -1;

    while (num >= 1000) {
        unitIndex++;
        num /= 1000;
    }

    return num.toFixed(precision) + (unitIndex >= 0 ? units[unitIndex] : '');
}

export function clamp(input: NumberInput, min: number, max: number) {
    const num = from(input);
    return Math.min(Math.max(num, min), max);
}

export function currency(input: NumberInput, symbol: string = '$', precision: number = 2) {
    const num = from(input);
    return `${symbol}${num.toFixed(precision)}`;
}

export function defaultCurrency(input: NumberInput) {
    return currency(input, '$');
}

export function defaultLocale(input: NumberInput) {
    const num = from(input);
    return num.toLocaleString();
}

export function fileSize(input: NumberInput, precision: number = 2) {
    let num = from(input);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (num >= 1024) {
        unitIndex++;
        num /= 1024;
    }
    return `${num.toFixed(precision)} ${units[unitIndex]}`;
}

export function forHumans(input: NumberInput) {
    const num = from(input);
    return num >= 1000 ? abbreviate(num) : num.toString();
}

export function format(input: NumberInput, options: NumberFormatOptions = {}): string {
    const {precision = 2, maxPrecision = 4, locale = 'en-US'} = options;
    const num = from(input);

    const finalPrecision = Math.min(precision, maxPrecision);

    return num.toLocaleString(locale, {
        minimumFractionDigits: finalPrecision,
        maximumFractionDigits: finalPrecision,
    });
}

export function ordinal(input: NumberInput) {
    const num = from(input);
    const suffix = ['th', 'st', 'nd', 'rd'] as const;
    const value = num % 100;
    return num + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
}

export function pairs(input: NumberInput) {
    const num = from(input);
    return [[num, num]];
}

export function percentage(input: NumberInput, precision: number = 2) {
    const num = from(input);
    return `${(num * 100).toFixed(precision)}%`;
}

export function spell(input: NumberInput): string {
    const num = from(input);

    const ones = [
        'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if (num < 20) {
        return ones[num] as string;
    } else if (num < 100) {
        const tenPart = Math.floor(num / 10);
        const onePart = num % 10;
        return `${tens[tenPart]}${onePart > 0 ? `-${ones[onePart]}` : ''}`;
    } else if (num < 1000) {
        const hundredPart = Math.floor(num / 100);
        const remainder = num % 100;
        return `${ones[hundredPart]} Hundred${remainder > 0 ? ` and ${spell(remainder)}` : ''}`;
    }

    return num.toString()
}

export function trim(input: NumberInput) {
    const num = from(input);
    return parseFloat(num.toString().trim());
}

export function useLocale(input: NumberInput, locale: string) {
    const num = from(input);
    return num.toLocaleString(locale);
}

export function withLocale(input: NumberInput, locale: string) {
    return useLocale(input, locale);
}

export function useCurrency(input: NumberInput, currency: string) {
    const num = from(input);
    return num.toLocaleString(undefined, {style: 'currency', currency});
}

export function withCurrency(input: NumberInput, currency: string) {
    return useCurrency(input, currency);
}

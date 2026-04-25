import { normalizeLanguage } from "./i18n";

const LOCALE_BY_LANGUAGE = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
} as const;

export function getLocale(language?: string | null): string {
  return LOCALE_BY_LANGUAGE[normalizeLanguage(language)];
}

export function formatCurrency(
  value: number,
  language?: string | null,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(getLocale(language), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatNumber(
  value: number,
  language?: string | null,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(getLocale(language), options).format(value);
}

export function formatSignedCurrency(
  value: number,
  language?: string | null,
  options?: Intl.NumberFormatOptions,
): string {
  const formatted = formatCurrency(Math.abs(value), language, options);

  if (value > 0) {
    return `+${formatted}`;
  }

  if (value < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

export function formatDate(
  value: string | Date,
  language?: string | null,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(getLocale(language), {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(typeof value === "string" ? new Date(value) : value);
}

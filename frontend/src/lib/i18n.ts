"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/translation.json";
import es from "../../public/locales/es/translation.json";
import fr from "../../public/locales/fr/translation.json";

export const SUPPORTED_LANGUAGES = ["en", "es", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const LANGUAGE_STORAGE_KEY = "novafund-language";

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
} as const;

export function normalizeLanguage(value?: string | null): SupportedLanguage {
  const language = value?.toLowerCase() ?? "";

  if (language.startsWith("es")) {
    return "es";
  }

  if (language.startsWith("fr")) {
    return "fr";
  }

  return "en";
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    supportedLngs: [...SUPPORTED_LANGUAGES],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;

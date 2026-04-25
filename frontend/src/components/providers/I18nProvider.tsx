"use client";

import React from "react";
import i18n, {
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
} from "@/lib/i18n";

interface I18nProviderProps {
  children: React.ReactNode;
}

function getInitialLanguage(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage) {
    return normalizeLanguage(storedLanguage);
  }

  const browserLanguage = navigator.languages.find((language) =>
    SUPPORTED_LANGUAGES.some((supportedLanguage) =>
      language.toLowerCase().startsWith(supportedLanguage),
    ),
  );

  return normalizeLanguage(browserLanguage ?? navigator.language);
}

export function I18nProvider({ children }: I18nProviderProps) {
  React.useEffect(() => {
    const applyLanguage = (language: string) => {
      const normalizedLanguage = normalizeLanguage(language);
      document.documentElement.lang = normalizedLanguage;
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
    };

    const initialLanguage = getInitialLanguage();

    if (i18n.resolvedLanguage !== initialLanguage) {
      void i18n.changeLanguage(initialLanguage);
    } else {
      applyLanguage(initialLanguage);
    }

    const handleLanguageChanged = (language: string) => {
      applyLanguage(language);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <>{children}</>;
}

"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n, { normalizeLanguage } from "@/lib/i18n";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    await i18n.changeLanguage(normalizeLanguage(event.target.value));
  };

  return (
    <footer className="bg-black text-gray-400 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">NovaFund</h3>
            <p className="text-sm text-gray-400">{t("footer.description")}</p>
            <div className="mt-6 max-w-xs">
              <label
                htmlFor="footer-language"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t("footer.languageSelectorLabel")}
              </label>
              <select
                id="footer-language"
                value={currentLanguage}
                onChange={(event) => {
                  void handleLanguageChange(event);
                }}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40"
              >
                <option value="en" className="bg-zinc-900 text-white">
                  {t("common.language.options.en")}
                </option>
                <option value="es" className="bg-zinc-900 text-white">
                  {t("common.language.options.es")}
                </option>
                <option value="fr" className="bg-zinc-900 text-white">
                  {t("common.language.options.fr")}
                </option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t("footer.sections.platform")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.nav.explore")}
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.createProject")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.nav.dashboard")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t("footer.sections.resources")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.documentation")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.helpCenter")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t("footer.sections.legal")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <span>{t("footer.copyright")}</span>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Discord
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

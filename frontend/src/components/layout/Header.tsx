"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { useSocial } from "@/contexts/SocialContext";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { currentWallet } = useSocial();
  const { t } = useTranslation();

  const navItems = [
    { href: "/explore", label: t("common.nav.explore") },
    { href: "/bridge", label: t("common.nav.bridge") },
    { href: "/create", label: t("common.nav.create") },
    { href: "/dashboard", label: t("common.nav.dashboard") },
  ];

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-background text-foreground shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center h-16">
        <Link
          href="/"
          className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          NovaFund
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <NotificationCenter />
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/10 dark:hover:bg-black/20"
            >
              <User className="h-4 w-4" />
              <span className="font-mono text-xs">
                {currentWallet.slice(0, 10)}...
              </span>
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
                <Link
                  href={`/profile/${encodeURIComponent(currentWallet)}`}
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex w-full px-4 py-3 text-left text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {t("common.nav.myProfile")}
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex w-full px-4 py-3 text-left text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {t("common.nav.dashboard")}
                </Link>
              </div>
            )}
          </div>
          <Button variant="primary" size="md">
            {t("common.actions.connectWallet")}
          </Button>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={t("common.aria.toggleMenu")}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex justify-center">
              <NotificationCenter />
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
            >
              {t("common.actions.connectWallet")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import {
  Link,
  motion,
  AnimatePresence,
  X,
  useTranslation,
} from "../../lib/optimized-imports";
import {
  Button,
  AnimatedThemeToggler,
  PokeBallIcon,
  LanguageToggle,
} from "@/components/atoms";
import { SearchBar } from "../molecules";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  className,
}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const displayTitle = title || t("pokemon.title");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-4 border-secondary bg-gradient-to-r from-primary via-primary to-primary shadow-lg",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between px-6">
          {/* Logo/Title */}
          <div className="flex items-center space-x-4">
            <PokeBallIcon />

            <Link to="/" className="flex flex-col cursor-default select-none">
              <h1
                className="text-2xl font-black text-secondary drop-shadow-lg tracking-wide"
                style={{
                  textShadow:
                    "2px 2px 0px var(--primary), -1px -1px 0px var(--primary), 1px -1px 0px var(--primary), -1px 1px 0px var(--primary)",
                }}
              >
                {displayTitle}
              </h1>
              <span className="text-xs text-secondary/80 font-semibold tracking-wider">
                {t("pokemon.slogan")}
              </span>
            </Link>
          </div>

          {/* Search Bar (if enabled) */}
          {showSearch && onSearchChange && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                placeholder={t("pokemon.search.placeholder")}
                className="w-full"
              />
            </div>
          )}

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <AnimatedThemeToggler />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="default"
              size="icon"
              onClick={toggleMobileMenu}
              className="p-3 rounded-full bg-secondary hover:bg-secondary/90 border-2 border-secondary shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              aria-label={
                isMobileMenuOpen
                  ? t("navigation.closeMenu")
                  : t("navigation.openMenu")
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && onSearchChange && (
          <div className="md:hidden px-6 pb-4">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder={t("pokemon.search.placeholder")}
              size="sm"
            />
          </div>
        )}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={closeMobileMenu}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-80 bg-secondary dark:bg-gray-900 shadow-2xl z-50 md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t("navigation.menu")}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeMobileMenu}
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label={t("navigation.closeMenu")}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex-1 p-6 space-y-8">
                    {/* Language Toggle */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("navigation.language")}
                      </h3>
                      <div className="flex items-center pr-5 justify-start w-fit rounded-full bg-primary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <LanguageToggle />
                        {t("navigation.language")}
                      </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("navigation.theme")}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <AnimatedThemeToggler className="p-3 rounded-full bg-primary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" />
                        <span className="text-primary dark:text-gray-300">
                          {t("navigation.theme")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {t("pokemon.slogan")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

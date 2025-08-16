import React from "react";
import { Search, X, useTranslation } from "@/lib/optimized-imports";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showClearButton?: boolean;
  disabled?: boolean;
}

const sizeClasses = {
  sm: {
    container: "h-8",
    input: "text-sm h-full pr-8",
    icon: "w-4 h-4 left-2",
    clearButton: "right-1 w-6 h-6",
  },
  md: {
    container: "h-10",
    input: "text-base h-full pr-10",
    icon: "w-5 h-5 left-3",
    clearButton: "right-2 w-6 h-6",
  },
  lg: {
    container: "h-12",
    input: "text-lg h-full pr-12",
    icon: "w-6 h-6 left-3",
    clearButton: "right-3 w-8 h-8",
  },
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  className,
  size = "md",
  showClearButton = true,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const classes = sizeClasses[size];
  const defaultPlaceholder = placeholder || t("pokemon.search.placeholder");

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className={cn("relative", classes.container, className)}>
      <Search
        className={cn(
          "absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",
          classes.icon
        )}
      />

      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={defaultPlaceholder}
        disabled={disabled}
        className={cn(
          "w-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200",
          classes.input,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label={t("pokemon.search.searchField")}
      />

      {showClearButton && value && !disabled && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className={cn(
            "absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200",
            classes.clearButton
          )}
          aria-label={t("pokemon.search.clearSearch")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;

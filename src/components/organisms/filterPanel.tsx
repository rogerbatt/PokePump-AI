import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Button, Badge } from "../atoms";
import { SearchBar } from "../molecules";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface FilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Moved to useMemo inside component for better performance

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchValue,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  sortBy,
  onSortChange,
  onClearFilters,
  className,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const hasActiveFilters =
    searchValue || selectedTypes.length > 0 || sortBy !== "id";
  const { t } = useTranslation();

  // Memoized pokemonTypes array for better performance
  const pokemonTypes = useMemo(() => [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ], []);

  // Memoized typeColors object for better performance
  const typeColors = useMemo(() => ({
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  }), []);

  const translatedSortOptions = [
    { value: "id", label: t("filters.sortOptions.number") },
    { value: "name", label: t("filters.sortOptions.name") },
    { value: "height", label: t("filters.sortOptions.height") },
    { value: "weight", label: t("filters.sortOptions.weight") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {t("filters.title")}
        </h2>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-xs"
            >
              {t("filters.clear")}
            </Button>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.div>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("filters.search")}
            </label>
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder={t("filters.searchPlaceholder")}
              size="sm"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("filters.sortBy")}
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {translatedSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t("filters.types", { count: selectedTypes.length })}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {pokemonTypes.map((type) => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <motion.button
                    key={type}
                    onClick={() => onTypeToggle(type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 border-2",
                      isSelected
                        ? `${typeColors[type as keyof typeof typeColors] || "bg-gray-400"} text-white border-gray-800 shadow-lg`
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {type}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {searchValue && (
                  <Badge variant="secondary" className="text-xs">
                    {t("filters.search")}: {searchValue}
                  </Badge>
                )}
                {sortBy !== "id" && (
                  <Badge variant="secondary" className="text-xs">
                    {t("filters.sortBy")}:{" "}
                    {
                      translatedSortOptions.find((o) => o.value === sortBy)
                        ?.label
                    }
                  </Badge>
                )}
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className={cn("text-xs text-white", typeColors[type as keyof typeof typeColors] || "bg-gray-400")}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterPanel;

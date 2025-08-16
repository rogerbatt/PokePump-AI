import React from "react";
import { motion } from "@/lib/optimized-imports";
import { useTranslation } from "react-i18next";
import { PokemonCard } from "../molecules";
import { cn } from "@/lib/utils";
import type { Pokemon } from "@/types/pokemon";
import { PokeBallIcon } from "@/components/atoms/pokeballIcon";

export interface PokemonGridProps {
  pokemons: Pokemon[];
  onAddToComparison?: (pokemon: Pokemon) => void;
  comparisonList?: Pokemon[];
  loading?: boolean;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const LoadingSkeleton: React.FC = () => (
  <div className="flex items-center justify-center h-80 w-full rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="text-center">
      <PokeBallIcon className="w-12 h-12 animate-spin mx-auto mb-4" />
    </div>
  </div>
);

const EmptyState: React.FC<{ message?: string }> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
        {message || t("pokemon.search.noResults")}
      </h3>
      <p className="text-gray-500 dark:text-gray-500">
        {t("pokemon.search.adjustFilters")}
      </p>
    </motion.div>
  );
};

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  onAddToComparison,
  comparisonList = [],
  loading = false,
  className,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
}) => {
  const gridClasses = cn(
    "grid gap-6 w-full",
    {
      [`grid-cols-${columns.sm}`]: columns.sm,
      [`sm:grid-cols-${columns.sm}`]: columns.sm,
      [`md:grid-cols-${columns.md}`]: columns.md,
      [`lg:grid-cols-${columns.lg}`]: columns.lg,
      [`xl:grid-cols-${columns.xl}`]: columns.xl,
    },
    "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", // fallback
    className
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 12 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className={gridClasses}>
        <EmptyState />
      </div>
    );
  }

  return (
    <motion.div
      className={gridClasses}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {pokemons.map((pokemon) => {
        const isInComparison = comparisonList.some((p) => p.id === pokemon.id);

        return (
          <motion.div
            key={pokemon.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <PokemonCard
              name={pokemon.name}
              sprite={pokemon.sprites?.front_default || undefined}
              onAddToComparison={onAddToComparison}
              isInComparison={isInComparison}
              className="h-full"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PokemonGrid;

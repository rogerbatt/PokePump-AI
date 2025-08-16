import React from "react";
import { MainLayout } from "./mainLayout";
import { LazyComparisonDrawer } from "@/components/organisms";
import { useComparisonDrawer } from "@/hooks/useComparisonDrawer";
import { cn } from "@/lib/utils";

export interface PokemonLayoutProps {
  children: React.ReactNode;
  className?: string;
  showComparison?: boolean;
  title?: string;
}

export const PokemonLayout: React.FC<PokemonLayoutProps> = ({
  children,
  className,
  showComparison = true,
  title,
}) => {
  const { pokemonList, removePokemon, clearComparison, isOpen, setIsOpen } =
    useComparisonDrawer();

  return (
    <MainLayout className={className}>
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
      )}

      <div
        className={cn(
          "space-y-6",
          showComparison && "pb-20" // Extra padding for comparison drawer
        )}
      >
        {children}
      </div>

      {showComparison && (
        <LazyComparisonDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pokemonList={pokemonList}
          onRemovePokemon={removePokemon}
          onClearComparison={clearComparison}
        />
      )}
    </MainLayout>
  );
};

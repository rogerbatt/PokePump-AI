import React, { lazy, Suspense } from "react";
import type { ComparisonPokemon } from "@/types/pokemon";
import { PokeBallIcon } from "@/components/atoms";

// Lazy load the ComparisonDrawer component
const ComparisonDrawer = lazy(() =>
  import("./comparisonDrawer").then((module) => ({
    default: module.ComparisonDrawer,
  }))
);

interface LazyComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonList: ComparisonPokemon[];
  onRemovePokemon: (id: number) => void;
  onClearComparison: () => void;
}

// Loading fallback component
const DrawerLoadingFallback: React.FC = () => (
  <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
    <div className="bg-background rounded-lg p-8 flex flex-col items-center gap-4">
      <PokeBallIcon className="w-12 h-12 animate-spin" />
      <p className="text-sm text-muted-foreground">Carregando comparação...</p>
    </div>
  </div>
);

export const LazyComparisonDrawer: React.FC<LazyComparisonDrawerProps> = (
  props
) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Suspense fallback={<DrawerLoadingFallback />}>
      <ComparisonDrawer {...props} />
    </Suspense>
  );
};

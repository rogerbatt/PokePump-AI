import React from "react";
import { cn } from "@/lib/utils";
import { Link, Plus, Check, X } from "@/lib/optimized-imports";
import { Card, CardContent, Button, PokemonIcon, TypeBadge } from "../atoms";
import { extractIdFromUrl } from "@/services/pokemonApi";
import { usePokemon } from "@/hooks/usePokemon";
import type { Pokemon } from "@/types/pokemon";
import { useTranslation } from "react-i18next";

export interface PokemonCardProps {
  name: string;
  sprite?: string;
  url?: string;
  onAddToComparison?: (pokemon: Pokemon) => void;
  isInComparison?: boolean;
  canAddMore?: boolean;
  showTypes?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Responsive size configuration for different card layouts
// Provides consistent sizing across small grids, lists, and featured displays
const sizeClasses = {
  sm: {
    card: "p-4",
    icon: "sm" as const,
    title: "text-base",
    id: "text-xs",
    button: "text-xs",
  },
  md: {
    card: "p-2",
    icon: "md" as const,
    title: "text-lg",
    id: "text-xs",
    button: "text-xs",
  },
  lg: {
    card: "p-8",
    icon: "lg" as const,
    title: "text-xl",
    id: "text-sm",
    button: "text-sm",
  },
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  sprite,
  url,
  onAddToComparison,
  isInComparison = false,
  canAddMore = true,
  showTypes = false,
  size = "md",
  className,
}) => {
  const urlId = url ? extractIdFromUrl(url) : 1;
  const { data: pokemonData } = usePokemon(name);
  const pokemonId = pokemonData?.id || urlId;
  const { t } = useTranslation();
  const classes = sizeClasses[size];

  // Prevents card navigation when interacting with comparison button
  const handleAddToComparison = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pokemonData && onAddToComparison) {
      onAddToComparison(pokemonData);
    }
  };

  return (
    <Link to={`/p/${name}`} className="block">
      <div className="group relative transform-gpu hover:-translate-y-2 hover:scale-105 transition-transform duration-200">
        <Card
          className={cn(
            // Base card styling with glassmorphism effect
            "group relative overflow-hidden transition-all duration-700 cursor-pointer border border-border/20 backdrop-blur-sm",
            "bg-gradient-to-br from-card/95 via-card to-card/90",
            // Hover effects for enhanced interactivity
            "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
            // Pseudo-element overlay for depth effect
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-card/30 before:via-transparent before:to-card/10",
            "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
            className
          )}
        >
          {/* Subtle color overlay on hover for visual feedback */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-accent/8 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Shimmer effect that sweeps across the card on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <CardContent
            className={cn("text-center relative z-10", classes.card)}
          >
            <div
              className={cn(
                "-top-5 right-0 absolute px-3 py-1 rounded-full",
                "bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30",
                "text-muted-foreground font-semibold tracking-wide",
                "group-hover:from-secondary/10 group-hover:to-secondary/10 group-hover:border-secondary/30",
                "group-hover:text-secondary transition-all duration-300",
                classes.id
              )}
            >
              #{pokemonId.toString().padStart(3, "0")}
            </div>

            <div className="mb-6 flex justify-center hover:scale-110 transition-transform duration-200">
              <div className="relative">
                <div className="absolute inset-0 rounded-full scale-150 opacity-0 duration-500" />

                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-background/80 to-muted/50 border border-border/30 group-hover:border-primary/40 transition-all duration-500">
                  <PokemonIcon
                    name={name}
                    sprite={sprite}
                    pokemonId={pokemonId}
                    size={classes.icon}
                    animated={true}
                  />
                </div>
              </div>
            </div>

            <h3
              className={cn(
                "font-bold capitalize bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent hover:scale-105 transition-transform duration-150",
                classes.title
              )}
            >
              {name}
            </h3>

            {showTypes && pokemonData?.types && (
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                {pokemonData.types.map((type) => (
                  <div
                    key={type.type.name}
                    className="hover:scale-110 hover:-translate-y-1 transition-transform duration-150"
                  >
                    <TypeBadge type={type.type.name} size="sm" />
                  </div>
                ))}
              </div>
            )}

            {onAddToComparison && (
              <div className="mt-5 group/button hover:scale-105 transition-transform duration-150">
                <Button
                  onClick={handleAddToComparison}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleAddToComparison(e);
                    }
                  }}
                  variant={isInComparison ? "secondary" : "default"}
                  size="sm"
                  className={cn(
                    "w-full transition-all duration-500 rounded-xl font-semibold shadow-lg",
                    "border-2 backdrop-blur-sm relative overflow-hidden",
                    classes.button,
                    // Dynamic styling based on comparison state
                    isInComparison
                      ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-500/30 hover:from-destructive/80 hover:to-destructive/80 hover:border-destructive/50 hover:shadow-destructive/25 hover:text-white"
                      : canAddMore
                      ? "bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:text-white border-primary/50 hover:from-primary/80 hover:to-primary hover:border-primary hover:shadow-primary/25"
                      : "bg-muted text-muted-foreground border-muted cursor-not-allowed opacity-50"
                  )}
                  disabled={!canAddMore && !isInComparison}
                  aria-label={
                    isInComparison
                      ? `Remover ${name} da comparação`
                      : `Adicionar ${name} à comparação`
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />

                  <div className="relative flex items-center justify-center gap-2">
                    {/* Dynamic button content with smooth state transitions */}
                    {isInComparison ? (
                      <>
                        <Check className="w-4 h-4 group-hover/button:hidden transition-all duration-200" />
                        <X className="w-4 h-4 hidden group-hover/button:block transition-all duration-200" />
                        <span className="group-hover/button:hidden transition-all duration-200">
                          {t("pokemon.comparison.inComparison")}
                        </span>
                        <span className="hidden group-hover/button:block transition-all duration-200">
                          {t("pokemon.comparison.remove")}
                        </span>
                      </>
                    ) : canAddMore ? (
                      <>
                        <Plus className="w-4 h-4 group-hover/button:rotate-90 transition-transform duration-200" />
                        <span>{t("pokemon.comparison.compare")}</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span className="text-xs">Limite atingido</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default PokemonCard;

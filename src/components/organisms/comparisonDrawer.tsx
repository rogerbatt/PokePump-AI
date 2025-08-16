import React, { useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  TrendingUp,
} from "../../lib/optimized-imports";
import {
  X,
  Plus,
  BarChart3,
  Zap,
  Shield,
  Heart,
  Award,
  Trash2,
  useTranslation,
  Sword,
  Star,
} from "@/lib/optimized-imports";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Progress,
} from "@/components/atoms";
import { cn } from "@/lib/utils";
import type { ComparisonPokemon } from "@/types/pokemon";

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonList: ComparisonPokemon[];
  onRemovePokemon: (id: number) => void;
  onClearComparison: () => void;
}

const MAX_POKEMON = 3;

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
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
};

const statIcons: Record<string, React.ReactNode> = {
  hp: <Heart className="w-4 h-4" />,
  attack: <Sword className="w-4 h-4" />,
  defense: <Shield className="w-4 h-4" />,
  "special-attack": <Zap className="w-4 h-4" />,
  "special-defense": <Shield className="w-4 h-4" />,
  speed: <Star className="w-4 h-4" />,
};

const getStatLabels = (t: any): Record<string, string> => ({
  hp: t("pokemon.stats.hp"),
  attack: t("pokemon.stats.attack"),
  defense: t("pokemon.stats.defense"),
  "special-attack": t("pokemon.stats.specialAttack"),
  "special-defense": t("pokemon.stats.specialDefense"),
  speed: t("pokemon.stats.speed"),
});

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  pokemonList: comparisonPokemon,
  onRemovePokemon,
  onClearComparison,
}) => {
  const { t } = useTranslation();
  const statLabels = getStatLabels(t);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Memoized function to get maximum stat value across all Pokemon
  const getMaxStat = useCallback(
    (statName: string): number => {
      return Math.max(
        ...comparisonPokemon.map(
          (pokemon) =>
            pokemon.stats.find((stat) => stat.stat.name === statName)
              ?.base_stat || 0
        )
      );
    },
    [comparisonPokemon]
  );

  // Memoized function to get stat value for a specific Pokemon
  const getStatValue = useCallback(
    (pokemon: ComparisonPokemon, statName: string): number => {
      return (
        pokemon.stats.find((stat) => stat.stat.name === statName)?.base_stat ||
        0
      );
    },
    []
  );

  // Memoized function to calculate total stats for a Pokemon
  const getTotalStats = useCallback((pokemon: ComparisonPokemon): number => {
    return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-6xl bg-background border-l shadow-2xl z-50 overflow-y-auto"
          >
            <div className="h-full flex flex-col">
              {/* Enhanced Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-3 sm:p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                        {t("pokemon.comparison.drawer")}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {comparisonPokemon.length > 0
                          ? t("pokemon.comparison.compareSelected", {
                              count: comparisonPokemon.length,
                            })
                          : t("pokemon.comparison.selectToCompare")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {comparisonPokemon.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearComparison}
                        className="group text-destructive hover:text-white hover:bg-destructive border-destructive/30 hover:border-destructive transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 text-xs sm:text-sm px-2 sm:px-3"
                        aria-label={t("pokemon.comparison.clearAll")}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onClearComparison();
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2 group-hover:animate-pulse" />
                        <span className="hidden sm:inline">
                          {t("pokemon.comparison.clearButton")}
                        </span>
                        <span className="sm:hidden">Limpar</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="p-2 hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                      aria-label={t("pokemon.comparison.closeDrawer")}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === " " ||
                          e.key === "Escape"
                        ) {
                          e.preventDefault();
                          onClose();
                        }
                      }}
                    >
                      <X className="w-5 h-5 hover:rotate-90 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 pt-0">
                {/* Enhanced Empty State */}
                {comparisonPokemon.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                    role="region"
                    aria-label={t("pokemon.comparison.emptyComparasionState")}
                  >
                    <div className="relative mb-6" aria-hidden="true">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t("pokemon.comparison.noPokemon")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t("pokemon.comparison.addPokemon", { max: MAX_POKEMON })}
                    </p>
                    <div
                      className="mt-8 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30"
                      role="note"
                      aria-label="Dica de uso"
                    >
                      <p className="text-sm text-muted-foreground">
                        💡 {t("pokemon.comparison.tip")}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Comparison Grid */}
                {comparisonPokemon.length > 0 && (
                  <div className="space-y-8">
                    {/* Pokemon Overview Cards */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-semibold text-foreground">
                          {t("pokemon.comparison.overview")}
                        </h3>
                      </div>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
                        role="list"
                        aria-label={`Lista de ${comparisonPokemon.length} Pokémon em comparação`}
                      >
                        {comparisonPokemon.map((pokemon, index) => {
                          const totalStats = getTotalStats(pokemon);
                          const isStrongest =
                            totalStats ===
                            Math.max(...comparisonPokemon.map(getTotalStats));
                          const averageStats =
                            totalStats / pokemon.stats.length;

                          return (
                            <motion.div
                              key={pokemon.id}
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              role="listitem"
                            >
                              <Card
                                className={cn(
                                  "relative overflow-hidden transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
                                  isStrongest &&
                                    "ring-2 ring-amber-500/50 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20"
                                )}
                                tabIndex={0}
                                role="article"
                                aria-label={`Card de comparação do ${
                                  pokemon.name
                                }${isStrongest ? " - Pokémon mais forte" : ""}`}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Delete" ||
                                    e.key === "Backspace"
                                  ) {
                                    e.preventDefault();
                                    onRemovePokemon(pokemon.id);
                                  }
                                }}
                              >
                                {isStrongest && (
                                  <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                                    <TrendingUp
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                    />
                                    {t("pokemon.comparison.strongest")}
                                  </div>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onRemovePokemon(pokemon.id)}
                                  className="absolute top-2 right-2 p-1.5 h-auto w-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 rounded-full z-10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                                  aria-label={`Remover ${pokemon.name} da comparação`}
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      onRemovePokemon(pokemon.id);
                                    }
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </Button>

                                <CardHeader className="text-center pb-3">
                                  <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 mb-2 sm:mb-3">
                                    <img
                                      src={pokemon.sprites.front_default || ""}
                                      alt={pokemon.name}
                                      className="w-full h-full object-contain drop-shadow-lg"
                                    />
                                  </div>
                                  <CardTitle className="capitalize text-lg sm:text-xl font-bold">
                                    {pokemon.name}
                                  </CardTitle>
                                  <div className="flex justify-center gap-1.5 mt-2">
                                    {pokemon.types.map((type) => (
                                      <Badge
                                        key={type.type.name}
                                        className={cn(
                                          typeColors[type.type.name],
                                          "text-white text-xs font-medium px-2 py-1 shadow-sm"
                                        )}
                                      >
                                        {type.type.name}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                  <div className="space-y-3">
                                    {/* Physical Stats */}
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
                                      <div className="bg-muted/50 rounded-lg p-1.5 sm:p-2 text-center">
                                        <div className="text-muted-foreground text-xs">
                                          {t("pokemon.details.height")}
                                        </div>
                                        <div className="font-semibold text-xs sm:text-sm">
                                          {(pokemon.height / 10).toFixed(1)}m
                                        </div>
                                      </div>
                                      <div className="bg-muted/50 rounded-lg p-1.5 sm:p-2 text-center">
                                        <div className="text-muted-foreground text-xs">
                                          {t("pokemon.details.weight")}
                                        </div>
                                        <div className="font-semibold text-xs sm:text-sm">
                                          {(pokemon.weight / 10).toFixed(1)}kg
                                        </div>
                                      </div>
                                    </div>

                                    {/* Stats Overview */}
                                    <div className="space-y-2">
                                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-2 sm:p-3 text-center border">
                                        <div className="text-muted-foreground text-xs mb-1">
                                          {t("pokemon.stats.total")}
                                        </div>
                                        <div
                                          className={cn(
                                            "text-xl sm:text-2xl font-bold",
                                            isStrongest
                                              ? "text-amber-600 dark:text-amber-400"
                                              : "text-foreground"
                                          )}
                                        >
                                          {totalStats}
                                        </div>
                                      </div>

                                      {/* Average Stats */}
                                      <div className="bg-muted/30 rounded-lg p-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-muted-foreground">
                                            {t(
                                              "pokemon.comparison.averagePerStat"
                                            )}
                                          </span>
                                          <span className="text-sm font-semibold">
                                            {averageStats.toFixed(1)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quick Stats Preview */}
                                    <div className="grid grid-cols-3 gap-1 text-xs">
                                      {pokemon.stats.slice(0, 3).map((stat) => {
                                        const statValue = stat.base_stat;
                                        const maxStat = Math.max(
                                          ...comparisonPokemon.flatMap((p) =>
                                            p.stats
                                              .filter(
                                                (s) =>
                                                  s.stat.name === stat.stat.name
                                              )
                                              .map((s) => s.base_stat)
                                          )
                                        );
                                        const isHighest = statValue === maxStat;

                                        return (
                                          <div
                                            key={stat.stat.name}
                                            className="bg-muted/40 rounded p-1 text-center"
                                          >
                                            <div
                                              className={cn(
                                                "font-medium text-xs sm:text-sm",
                                                isHighest
                                                  ? "text-green-600"
                                                  : "text-muted-foreground"
                                              )}
                                            >
                                              {statValue}
                                            </div>
                                            <div className="text-[9px] sm:text-[10px] text-muted-foreground capitalize">
                                              {stat.stat.name ===
                                              "special-attack"
                                                ? "Sp.A"
                                                : stat.stat.name ===
                                                  "special-defense"
                                                ? "Sp.D"
                                                : stat.stat.name.slice(0, 3)}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Enhanced Stats Comparison */}
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-3 sm:p-6">
                        <CardTitle className="flex items-center gap-2">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold">
                              {t("pokemon.comparison.statsComparison")}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                              {t("pokemon.comparison.statsDescription")}
                            </p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-6">
                        <div className="space-y-6">
                          {[
                            "hp",
                            "attack",
                            "defense",
                            "special-attack",
                            "special-defense",
                            "speed",
                          ].map((statName) => {
                            const maxStat = getMaxStat(statName);
                            const minStat = Math.min(
                              ...comparisonPokemon.map((pokemon) =>
                                getStatValue(pokemon, statName)
                              )
                            );

                            return (
                              <div key={statName} className="space-y-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="p-1.5 sm:p-2 bg-muted/50 rounded-lg flex-shrink-0">
                                    {statIcons[statName]}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-base sm:text-lg truncate">
                                      {statLabels[statName]}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                      {t(
                                        `pokemon.stats.${statName.replace(
                                          "-",
                                          "_"
                                        )}_description`
                                      )}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-xs text-muted-foreground">
                                      {t("pokemon.comparison.range")}
                                    </div>
                                    <div className="font-semibold text-sm sm:text-base">
                                      {minStat} - {maxStat}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="grid gap-2 sm:gap-4"
                                  style={{
                                    gridTemplateColumns:
                                      comparisonPokemon.length === 1
                                        ? "1fr"
                                        : comparisonPokemon.length === 2
                                        ? "repeat(2, 1fr)"
                                        : "repeat(auto-fit, minmax(200px, 1fr))",
                                  }}
                                >
                                  {comparisonPokemon.map((pokemon) => {
                                    const statValue = getStatValue(
                                      pokemon,
                                      statName
                                    );
                                    const percentage =
                                      maxStat > 0
                                        ? (statValue / maxStat) * 100
                                        : 0;
                                    const isHighest = statValue === maxStat;
                                    const isLowest =
                                      statValue === minStat &&
                                      comparisonPokemon.length > 1;

                                    return (
                                      <div
                                        key={`${pokemon.id}-${statName}`}
                                        className={cn(
                                          "relative p-2 sm:p-4 rounded-lg border transition-all duration-200",
                                          isHighest &&
                                            "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
                                          isLowest &&
                                            !isHighest &&
                                            "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
                                          !isHighest &&
                                            !isLowest &&
                                            "bg-muted/30"
                                        )}
                                      >
                                        {isHighest && (
                                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                                            <TrendingUp className="w-3 h-3" />
                                          </div>
                                        )}
                                        <div className="space-y-1 sm:space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span className="capitalize font-medium text-xs sm:text-sm truncate">
                                              {pokemon.name}
                                            </span>
                                            <span
                                              className={cn(
                                                "font-bold text-base sm:text-lg flex-shrink-0",
                                                isHighest &&
                                                  "text-green-600 dark:text-green-400",
                                                isLowest &&
                                                  !isHighest &&
                                                  "text-red-600 dark:text-red-400",
                                                !isHighest &&
                                                  !isLowest &&
                                                  "text-foreground"
                                              )}
                                            >
                                              {statValue}
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            <Progress
                                              value={percentage}
                                              className={cn(
                                                "h-2 sm:h-3 transition-all duration-300",
                                                isHighest &&
                                                  "bg-green-100 dark:bg-green-950",
                                                isLowest &&
                                                  !isHighest &&
                                                  "bg-red-100 dark:bg-red-950"
                                              )}
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                              <span>
                                                {percentage.toFixed(0)}%
                                              </span>
                                              <span>
                                                {isHighest && "🏆"}
                                                {isLowest && !isHighest && "📉"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ComparisonDrawer;

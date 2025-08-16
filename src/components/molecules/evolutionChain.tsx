import React from "react";
import {
  Link,
  ArrowRight,
  ArrowDown,
  Zap,
  Heart,
  Clock,
  MapPin,
  Star,
  useTranslation,
  t,
} from "@/lib/optimized-imports";
import { Card, CardContent } from "@/components/atoms/card";
import { PokeBallIcon } from "@/components/atoms/pokeballIcon";
import { useEvolutionChain } from "@/hooks/useEvolutionChain";
import type { Pokemon, EvolutionNode } from "@/types/pokemon";
import { Badge } from "@/components/atoms";

interface EvolutionChainProps {
  pokemonId: number | string;
}

interface EvolutionNodeProps {
  node: EvolutionNode;
  isRoot?: boolean;
  depth?: number;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemonId }) => {
  const { t } = useTranslation();
  const { evolutionTree, isLoading, error, hasComplexChain, chainDepth } =
    useEvolutionChain(pokemonId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t("pokemon.details.evolution")}
          </h3>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <PokeBallIcon className="w-12 h-12 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t("pokemon.details.evolution")}
          </h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">{t("common.error")}</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!evolutionTree) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t("pokemon.details.evolution")}
          </h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {t("pokemon.evolution.noEvolution")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {t("pokemon.details.evolution")}
          </h3>
          <div className="flex gap-2">
            {hasComplexChain && (
              <Badge variant="secondary" className="text-xs">
                {t("pokemon.evolution.complex")}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {chainDepth} {t("pokemon.evolution.stage", { count: chainDepth })}
            </Badge>
          </div>
        </div>

        <div className={`overflow-x-auto ${hasComplexChain ? "pb-4" : ""}`}>
          <EvolutionNode node={evolutionTree} isRoot={true} depth={0} />
        </div>
      </CardContent>
    </Card>
  );
};

const EvolutionNode: React.FC<EvolutionNodeProps> = ({
  node,
  isRoot = false,
  depth = 0,
}) => {
  const hasMultipleEvolutions = node.evolvesTo && node.evolvesTo.length > 1;

  return (
    <div
      className={`flex ${
        hasMultipleEvolutions ? "flex-col" : "flex-row"
      } items-center gap-4`}
    >
      <div className="flex flex-col items-center min-w-0">
        <PokemonCard
          pokemon={node.pokemon}
          evolutionDetails={node.evolutionDetails}
          isRoot={isRoot}
        />
      </div>

      {node.evolvesTo && node.evolvesTo.length > 0 && (
        <>
          {hasMultipleEvolutions ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div
                className={`grid gap-4 ${
                  node.evolvesTo.length > 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                } w-full`}
              >
                {node.evolvesTo.map(
                  (evolution: EvolutionNode, index: number) => (
                    <div
                      key={`${evolution.pokemon.id}-${index}`}
                      className="flex justify-center"
                    >
                      <EvolutionNode node={evolution} depth={depth + 1} />
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <EvolutionNode node={node.evolvesTo[0]} depth={depth + 1} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface PokemonCardProps {
  pokemon: Pokemon;
  evolutionDetails?: EvolutionNode["evolutionDetails"];
  isRoot?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  evolutionDetails,
  isRoot,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors min-w-[120px]">
      <Link
        to={`/pokemon/${pokemon.id}`}
        className="flex flex-col items-center space-y-2 text-center group"
        aria-label={`Ver detalhes de ${pokemon.name}`}
      >
        <div className="relative">
          <img
            src={
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default ||
              ""
            }
            alt={pokemon.name}
            className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                pokemon.sprites?.front_default || "/placeholder-pokemon.png";
            }}
          />
          {isRoot && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          )}
        </div>

        <div className="space-y-1">
          <p className="font-medium text-sm capitalize group-hover:text-primary transition-colors">
            {pokemon.name}
          </p>
          <p className="text-xs text-muted-foreground">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>
      </Link>

      {evolutionDetails && (
        <div className="space-y-1 w-full">
          <EvolutionRequirements details={evolutionDetails} />
        </div>
      )}
    </div>
  );
};

interface EvolutionRequirementsProps {
  details: EvolutionNode["evolutionDetails"];
}

const EvolutionRequirements: React.FC<EvolutionRequirementsProps> = ({
  details,
}) => {
  if (!details) return null;

  const requirements: React.ReactNode[] = [];

  if (details.minLevel) {
    requirements.push(
      <Badge
        key="level"
        variant="secondary"
        className="text-xs flex items-center gap-1"
      >
        <Zap className="w-3 h-3" />
        Nível {details.minLevel}
      </Badge>
    );
  }

  if (details.item) {
    requirements.push(
      <Badge
        key="item"
        variant="secondary"
        className="text-xs flex items-center gap-1"
      >
        <Star className="w-3 h-3" />
        {details.item}
      </Badge>
    );
  }

  if (details.happiness) {
    requirements.push(
      <Badge
        key="happiness"
        variant="secondary"
        className="text-xs flex items-center gap-1"
      >
        <Heart className="w-3 h-3" />
        Felicidade {details.happiness}
      </Badge>
    );
  }

  if (details.timeOfDay) {
    requirements.push(
      <Badge
        key="time"
        variant="secondary"
        className="text-xs flex items-center gap-1"
      >
        <Clock className="w-3 h-3" />
        {details.timeOfDay === "day"
          ? t("pokemon.evolution.day")
          : details.timeOfDay === "night"
          ? t("pokemon.evolution.night")
          : details.timeOfDay}
      </Badge>
    );
  }

  if (details.location) {
    requirements.push(
      <Badge
        key="location"
        variant="secondary"
        className="text-xs flex items-center gap-1"
      >
        <MapPin className="w-3 h-3" />
        {details.location}
      </Badge>
    );
  }

  if (details.trigger && details.trigger !== "level-up" && !details.minLevel) {
    const triggerMap: Record<string, string> = {
      trade: t("pokemon.evolution.trade"),
      "use-item": t("pokemon.evolution.useItem"),
      shed: t("pokemon.evolution.special"),
      spin: t("pokemon.evolution.spin"),
      "tower-of-darkness": t("pokemon.evolution.towerDarkness"),
      "tower-of-waters": t("pokemon.evolution.towerWaters"),
      "three-critical-hits": t("pokemon.evolution.criticalHits"),
      "take-damage": t("pokemon.evolution.takeDamage"),
      other: t("pokemon.evolution.other"),
    };
    const triggerText = triggerMap[details.trigger] || details.trigger;

    requirements.push(
      <Badge key="trigger" variant="secondary" className="text-xs">
        {triggerText}
      </Badge>
    );
  }

  if (requirements.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {requirements.slice(0, 2)}{" "}
      {/* Limit to 2 requirements to avoid clutter */}
      {requirements.length > 2 && (
        <Badge variant="outline" className="text-xs">
          +{requirements.length - 2}
        </Badge>
      )}
    </div>
  );
};

export { EvolutionChain };

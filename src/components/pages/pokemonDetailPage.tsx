import {
  useParams,
  Link,
  useTranslation,
  ArrowLeft,
} from "@/lib/optimized-imports";
import { useQuery } from "@tanstack/react-query";
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
} from "@/services/pokemonApi";
import type { EvolutionChainLink } from "@/types/pokemon";
import { Button, PokeBallIcon } from "@/components/atoms";
import { PokemonLayout } from "@/components/templates";
import { SpeciesVarieties, AbilitiesSection } from "@/components/molecules";
import {
  PokemonMainCard,
  StatsCard,
  SpritesCard,
  EvolutionCard,
  MovesTableWithSidePanel,
} from "@/components/organisms";

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

function EvolutionTree({ chain }: { chain: EvolutionChainLink }) {
  const renderEvolution = (evolution: EvolutionChainLink, level = 0) => {
    return (
      <div
        key={evolution.species.name}
        className="flex items-center max-sm:flex-col max-sm:space-y-5"
      >
        {level > 0 && (
          <div className="flex items-center mx-4">
            <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
            <div className="mx-2 text-xs text-gray-500">
              {evolution.evolution_details[0]?.min_level && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs">
                  Lv. {evolution.evolution_details[0].min_level}
                </span>
              )}
            </div>
            <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
          </div>
        )}
        <Link
          to={`/p/${evolution.species.name}`}
          className="text-center hover:opacity-80 transition-opacity"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                evolution.species.url.split("/")[6]
              }.png`}
              alt={evolution.species.name}
              className="w-14 h-14 object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
            {evolution.species.name}
          </p>
        </Link>
        {evolution.evolves_to.map((nextEvolution) =>
          renderEvolution(nextEvolution, level + 1)
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center overflow-x-auto">
      {renderEvolution(chain)}
    </div>
  );
}

function PokemonDetailPage() {
  const { t } = useTranslation();
  const { name } = useParams<{ name: string }>();

  const {
    data: pokemon,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name!),
    enabled: !!name,
  });

  const { data: species } = useQuery({
    queryKey: ["pokemon-species", pokemon?.species.name],
    queryFn: () => getPokemonSpecies(pokemon!.species.name),
    enabled: !!pokemon,
  });

  const { data: evolutionChain } = useQuery({
    queryKey: ["evolution-chain", species?.evolution_chain.url],
    queryFn: () => {
      return getEvolutionChain(species!.evolution_chain.url);
    },
    enabled: !!species,
  });

  if (pokemonLoading) {
    return (
      <PokemonLayout showComparison={false}>
        <div
          className="flex  items-center justify-center"
          style={{ height: "60vh" }}
        >
          <div className="text-center">
            <PokeBallIcon className="w-16 h-16 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {t("common.loading")}
            </p>
          </div>
        </div>
      </PokemonLayout>
    );
  }

  if (pokemonError || !pokemon) {
    return (
      <PokemonLayout showComparison={false}>
        <div className="flex  items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {t("pokemon.details.notFound")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t("pokemon.details.notFoundMessage", { name })}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("navigation.backToPokédex")}
            </Link>
          </div>
        </div>
      </PokemonLayout>
    );
  }

  return (
    <PokemonLayout showComparison={true}>
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <Button variant={"secondary"}>
                <ArrowLeft className="w-4 h-4" />
                Back to Pokédex
              </Button>
            </Link>
          </div>
        </div>

        {species && (
          <SpeciesVarieties
            species={species}
            currentPokemonName={pokemon.name}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <div className="col-span-1 space-y-4">
            <PokemonMainCard pokemon={pokemon} typeColors={typeColors} />
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-200 dark:border-gray-700 shadow-xl">
              <AbilitiesSection abilities={pokemon.abilities} />
            </div>
          </div>

          <div className="col-span-2 gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StatsCard stats={pokemon.stats} />

              <SpritesCard
                sprites={pokemon.sprites}
                pokemonName={pokemon.name}
              />

              <EvolutionCard
                chain={evolutionChain}
                EvolutionTree={EvolutionTree}
              />
            </div>
          </div>
        </div>

        <MovesTableWithSidePanel moves={pokemon.moves} />
      </div>
    </PokemonLayout>
  );
}

export { PokemonDetailPage };

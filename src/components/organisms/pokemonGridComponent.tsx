import { PokemonCard } from "@/components/molecules";
import type { Pokemon } from "@/types/pokemon";

interface PokemonGridComponentProps {
  isSearchMode: boolean;
  searchData?: Pokemon[];
  listData?: { results: Array<{ name: string; url: string }> };
  onAddToComparison: (pokemon: Pokemon) => void;
  isPokemonInComparison: (id: number) => boolean;
  canAddMore: boolean;
  extractIdFromUrl: (url: string) => number;
}

function PokemonGridComponent({
  isSearchMode,
  searchData,
  listData,
  onAddToComparison,
  isPokemonInComparison,
  canAddMore,
  extractIdFromUrl,
}: PokemonGridComponentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {isSearchMode
        ? searchData?.map((pokemon: Pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard
                name={pokemon.name}
                sprite={pokemon.sprites.front_default || undefined}
                onAddToComparison={onAddToComparison}
                isInComparison={isPokemonInComparison(pokemon.id)}
                canAddMore={canAddMore}
                showTypes={true}
              />
            </div>
          ))
        : listData?.results.map((pokemon: any) => (
            <div key={pokemon.name}>
              <PokemonCard
                name={pokemon.name}
                url={pokemon.url}
                onAddToComparison={onAddToComparison}
                isInComparison={isPokemonInComparison(
                  extractIdFromUrl(pokemon.url)
                )}
                canAddMore={canAddMore}
                showTypes={true}
              />
            </div>
          ))}
    </div>
  );
}

export { PokemonGridComponent };

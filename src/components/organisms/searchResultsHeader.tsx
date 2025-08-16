import { useTranslation } from "react-i18next";
import { Badge, Button } from "@/components/atoms";

interface SearchResultsHeaderProps {
  isSearchMode: boolean;
  searchResultsCount: number;
  totalPokemonCount: number;
  comparisonCount: number;
  onOpenComparison: () => void;
  onClearSearch: () => void;
}

function SearchResultsHeader({
  isSearchMode,
  searchResultsCount,
  totalPokemonCount,
  comparisonCount,
  onOpenComparison,
  onClearSearch,
}: SearchResultsHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-foreground">
          {isSearchMode
            ? t("pokemon.search.results")
            : t("pokemon.list.allPokemon")}
        </h2>
        <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
          {isSearchMode ? searchResultsCount : totalPokemonCount}{" "}
          {(isSearchMode ? searchResultsCount : totalPokemonCount) === 1
            ? t("common.result")
            : t("common.results")}
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        {comparisonCount > 0 && (
          <Button
            onClick={onOpenComparison}
            variant="outline"
            size="sm"
            className="rounded-xl border-primary/30 text-primary dark:text-secondary hover:bg-primary/10"
            aria-label={`Abrir comparação com ${comparisonCount} Pokémon`}
          >
            {t("pokemon.details.compare")} ({comparisonCount})
          </Button>
        )}
        {isSearchMode && (
          <Button
            variant="ghost"
            onClick={onClearSearch}
            className="text-muted-foreground hover:text-foreground rounded-xl"
          >
            {t("pokemon.search.clearSearch")}
          </Button>
        )}
      </div>
    </div>
  );
}

export { SearchResultsHeader };

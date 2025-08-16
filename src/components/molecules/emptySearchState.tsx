import { useTranslation, Search } from "@/lib/optimized-imports";
import { Button } from "@/components/atoms";

interface EmptySearchStateProps {
  isSearchMode: boolean;
  onClearSearch: () => void;
}

function EmptySearchState({
  isSearchMode,
  onClearSearch,
}: EmptySearchStateProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-20">
      <div className="bg-muted/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">
        {t("pokemon.search.noResults")}
      </h3>
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
        {isSearchMode ? t("pokemon.search.noResults") : t("common.noData")}
      </p>
      {isSearchMode && (
        <Button
          onClick={onClearSearch}
          variant="outline"
          className="rounded-2xl"
        >
          {t("pokemon.search.clearSearch")}
        </Button>
      )}
    </div>
  );
}

export { EmptySearchState };

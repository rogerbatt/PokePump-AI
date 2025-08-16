import { useTranslation, Sparkles, Search } from "@/lib/optimized-imports";
import { Button } from "@/components/atoms";
import { SearchBar } from "@/components/molecules";
import { usePokemonList, usePokemonSearch } from "@/hooks/usePokemon";
import { useUrlState } from "@/hooks/useUrlState";
import { extractIdFromUrl } from "@/services/pokemonApi";
import { Pagination } from "@/components/molecules/pagination";
import { useComparisonDrawer } from "@/hooks/useComparisonDrawer";
import {
  SearchResultsHeader,
  PokemonGridComponent,
} from "@/components/organisms";
import { MainLayout } from "@/components/templates";
import { LazyComparisonDrawer } from "@/components/organisms";
import { PokeBallIcon } from "@/components/atoms/pokeballIcon";

export interface PokemonListPageProps {}

export function PokemonListPage() {
  const { t } = useTranslation();

  const {
    searchQuery,
    debouncedQuery,
    currentPage,
    itemsPerPage,
    updateQuery,
    updatePage,
    updateItemsPerPage,
  } = useUrlState();

  const {
    pokemonList,
    togglePokemon: addToComparison,
    isPokemonInComparison,
    canAddMore,
    isOpen,
    setIsOpen,
    removePokemon,
    clearComparison,
  } = useComparisonDrawer();

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    isError: isSearchError,
  } = usePokemonSearch(debouncedQuery);

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
    isError: isListError,
  } = usePokemonList({ page: currentPage, limit: itemsPerPage });

  const isSearchMode = debouncedQuery.length > 0;
  const isLoading = isSearchMode ? isSearchLoading : isListLoading;
  const isError = isSearchMode ? isSearchError : isListError;
  const error = isSearchMode ? searchError : listError;

  const pokemonData = isSearchMode ? searchData : listData?.results;
  const hasNext = !isSearchMode && !!listData?.next;
  const hasPrevious = !isSearchMode && !!listData?.previous;

  const totalItems = isSearchMode ? searchData?.length || 0 : 1010;

  return (
    <MainLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-8 md:p-12 mb-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-destructive bg-clip-text text-transparent">
                PokéDex
              </h1>
              <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("pokemon.heroDescription")}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-6 text-muted-foreground" />
              <SearchBar
                value={searchQuery}
                onChange={updateQuery}
                placeholder={t("pokemon.search.placeholder")}
                size="lg"
                className="text-lg pl-12 bg-card/70 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-300 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[60vh]">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <PokeBallIcon className="w-16 h-16 animate-spin mx-auto mb-6" />
              <p className="text-lg text-muted-foreground">
                {t("common.loading")}
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <div className="bg-destructive/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">⚠️</div>
            </div>
            <h3 className="text-2xl font-bold text-destructive mb-3">
              {t("common.error")}
            </h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {error?.message || t("common.error")}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-6 rounded-2xl"
            >
              {t("common.retry")}
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {pokemonData && pokemonData.length > 0 ? (
              <>
                <SearchResultsHeader
                  isSearchMode={isSearchMode}
                  searchResultsCount={pokemonData.length}
                  totalPokemonCount={pokemonData.length}
                  comparisonCount={pokemonList.length}
                  onOpenComparison={() => setIsOpen(true)}
                  onClearSearch={() => updateQuery("")}
                />

                <PokemonGridComponent
                  isSearchMode={isSearchMode}
                  searchData={searchData}
                  listData={listData}
                  onAddToComparison={addToComparison}
                  isPokemonInComparison={isPokemonInComparison}
                  canAddMore={canAddMore()}
                  extractIdFromUrl={extractIdFromUrl}
                />
              </>
            ) : null}
          </>
        )}
      </section>

      {!isSearchMode &&
        !isLoading &&
        !isError &&
        pokemonData &&
        pokemonData.length > 0 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={updatePage}
              onItemsPerPageChange={updateItemsPerPage}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          </div>
        )}

      <LazyComparisonDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pokemonList={pokemonList}
        onRemovePokemon={removePokemon}
        onClearComparison={clearComparison}
      />
    </MainLayout>
  );
}

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { MoveDetailsContent } from "@/components/molecules/moveDetailsContent";
import { MovesFilters } from "@/components/molecules/movesFilters";
import { useMovesTable } from "@/hooks/useMovesTable";
import { extractIdFromUrl } from "@/services/pokemonApi";
import {
  damageClassIcons,
  getLearnMethodTranslationKey,
} from "@/lib/pokemon-constants";
import type { Pokemon } from "@/types/pokemon";
import { useTranslation } from "react-i18next";

interface MovesTableProps {
  pokemon: Pokemon;
}

export function MovesTable({ pokemon }: MovesTableProps) {
  const { t } = useTranslation();

  const {
    // State
    searchTerm,
    selectedLearnMethod,
    selectedVersionGroup,
    currentPage,
    selectedMove,
    isSheetOpen,

    // Actions
    setSearchTerm,
    setSelectedLearnMethod,
    setSelectedVersionGroup,
    setSelectedMove,
    setIsSheetOpen,

    // Computed values
    filteredMoves,
    paginatedMoves,
    totalPages,
    availableLearnMethods,
    availableVersionGroups,

    // Pagination actions
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = useMovesTable({ moves: pokemon.moves, itemsPerPage: 10 });

  const handleMoveClick = (moveUrl: string) => {
    const moveId = extractIdFromUrl(moveUrl);
    setSelectedMove(moveId.toString());
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Filters */}
        <MovesFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLearnMethod={selectedLearnMethod}
          onLearnMethodChange={setSelectedLearnMethod}
          selectedVersionGroup={selectedVersionGroup}
          onVersionGroupChange={setSelectedVersionGroup}
          availableLearnMethods={availableLearnMethods}
          availableVersionGroups={availableVersionGroups}
        />
        {/* Moves Table */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("pokemon.moves.title")} ({filteredMoves.length})
              </h3>
            </div>

            {paginatedMoves.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {t("pokemon.moves.noMoves")}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("pokemon.moves.name")}</TableHead>
                      <TableHead>{t("pokemon.moves.learnMethod")}</TableHead>
                      <TableHead>{t("pokemon.moves.level")}</TableHead>
                      <TableHead>{t("pokemon.moves.versionGroup")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMoves.map((move, index) => {
                      const relevantDetail = move.versionDetail;
                      const learnMethod = relevantDetail.move_learn_method.name;
                      const level = relevantDetail.level_learned_at;
                      const versionGroup = relevantDetail.version_group.name;

                      return (
                        <Sheet
                          key={`${move.move.name}-${index}`}
                          open={
                            isSheetOpen &&
                            selectedMove ===
                              extractIdFromUrl(move.move.url).toString()
                          }
                          onOpenChange={setIsSheetOpen}
                        >
                          <SheetTrigger asChild>
                            <TableRow
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleMoveClick(move.move.url)}
                            >
                              <TableCell className="font-medium capitalize">
                                {move.move.name.replace("-", " ")}
                              </TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1 capitalize">
                                  {damageClassIcons[learnMethod] || null}
                                  {t(getLearnMethodTranslationKey(learnMethod))}
                                </span>
                              </TableCell>
                              <TableCell>
                                {learnMethod === "level-up" ? level : "—"}
                              </TableCell>
                              <TableCell className="uppercase text-xs">
                                {versionGroup.replace("-", " ")}
                              </TableCell>
                            </TableRow>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle className="capitalize">
                                {move.move.name.replace("-", " ")}
                              </SheetTitle>
                            </SheetHeader>
                            <MoveDetailsContent moveId={selectedMove} />
                          </SheetContent>
                        </Sheet>
                      );
                    })}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                        {t("common.first")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {t("common.previous")}
                      </Button>
                    </div>

                    <span className="text-sm text-gray-600">
                      {t("common.pageOf", {
                        current: currentPage,
                        total: totalPages,
                      })}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                      >
                        {t("common.next")}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                      >
                        {t("common.last")}
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {filteredMoves.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("pokemon.moves.noMovesFound")}
                </h3>
                <p className="text-gray-600">
                  {t("pokemon.moves.adjustFilters")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

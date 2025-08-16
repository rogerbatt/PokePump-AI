import React, { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Search,
  Filter,
  X,
  Zap,
  Shield,
  Swords,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "@/lib/optimized-imports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Badge } from "@/components/atoms/badge";
import { PokeBallIcon } from "@/components/atoms/pokeballIcon";
import { Pagination } from "@/components/molecules/pagination";
import { useMove } from "@/hooks/useMove";
import { useMachine } from "@/hooks/useMachine";
import { useDebounce } from "@/hooks/useDebounce";
import {
  extractIdFromUrl,
  extractMachineIdFromUrl,
} from "@/services/pokemonApi";
import type { Pokemon } from "@/types/pokemon";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

interface MovesTableWithSidePanelProps {
  moves: Pokemon["moves"];
}

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

const damageClassColors: Record<string, string> = {
  physical: "text-red-600 dark:text-red-400",
  special: "text-blue-600 dark:text-blue-400",
  status: "text-gray-600 dark:text-gray-400",
};

const damageClassIcons: Record<string, React.ReactNode> = {
  physical: <Swords className="w-4 h-4" />,
  special: <Zap className="w-4 h-4" />,
  status: <Shield className="w-4 h-4" />,
};

interface ProcessedMove {
  id: string;
  name: string;
  url: string;
  learnMethod: string;
  level: number;
  versionGroup: string;
}

function MachineInfo({
  machineId,
  versionGroup,
}: {
  machineId: number;
  versionGroup: string;
}) {
  const { t } = useTranslation();
  const { data: machine, isLoading, error } = useMachine(machineId);

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
        <span className="text-red-600 dark:text-red-400 text-sm">
          {t("common.error")}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500 text-white text-xs">
            {machine.item.name.toUpperCase()}
          </Badge>
          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {versionGroup.replace("-", " ")}
          </span>
        </div>
      </div>
    </div>
  );
}

function MoveDetailsSidePanel({
  moveId,
  isOpen,
  onClose,
}: {
  moveId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { data: move, isLoading, error } = useMove(moveId);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 h-full overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-6 text-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold capitalize">
                {move?.name?.replace("-", " ") || t("common.loading")}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            {move?.type && (
              <div className="mt-2">
                <Badge
                  className={`${
                    typeColors[move.type.name]
                  } text-white border-0`}
                >
                  {move.type.name.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <PokeBallIcon className="w-8 h-8 animate-spin" />
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 dark:text-red-400">
                  {t("common.error")}
                </p>
              </div>
            )}

            {move && (
              <>
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("pokemon.moves.power")}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {move.power || "-"}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("pokemon.moves.accuracy")}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {move.accuracy ? `${move.accuracy}%` : "-"}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("pokemon.moves.pp")}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {move.pp || "-"}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("pokemon.moves.damageClass")}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          damageClassColors[move.damage_class?.name || "status"]
                        }
                      >
                        {damageClassIcons[move.damage_class?.name || "status"]}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {move.damage_class?.name || "Status"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Machines */}
                {move.machines && move.machines.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {t("pokemon.moves.machines")}
                    </h3>
                    <div className="space-y-2">
                      {move.machines.map((machineData, index) => {
                        const machineId = extractMachineIdFromUrl(
                          machineData.machine.url
                        );
                        return (
                          <MachineInfo
                            key={`${machineId}-${index}`}
                            machineId={machineId}
                            versionGroup={machineData.version_group.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Description */}
                {move.effect_entries && move.effect_entries.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {t("pokemon.moves.effect")}
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {move.effect_entries.find(
                          (entry) => entry.language.name === "en"
                        )?.effect ||
                          move.effect_entries[0]?.effect ||
                          t("common.noData")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Flavor Text */}
                {move.flavor_text_entries &&
                  move.flavor_text_entries.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {t("pokemon.moves.description")}
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                          {move.flavor_text_entries.find(
                            (entry) => entry.language.name === "en"
                          )?.flavor_text ||
                            move.flavor_text_entries[0]?.flavor_text ||
                            t("common.noData")}
                        </p>
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

type SortField = "name" | "learnMethod" | "level" | "versionGroup";
type SortDirection = "asc" | "desc";

export function MovesTableWithSidePanel({
  moves,
}: MovesTableWithSidePanelProps) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedLearnMethod, setSelectedLearnMethod] = useState("all");
  const [selectedVersionGroup, setSelectedVersionGroup] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Debounce search input with 500ms delay
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearchTerm,
    selectedLearnMethod,
    selectedVersionGroup,
    sortField,
    sortDirection,
  ]);

  // Extract unique version groups from moves
  const versionGroups = useMemo(() => {
    if (!moves) return [];
    return Array.from(
      new Set(
        moves.flatMap((move) =>
          move.version_group_details.map((detail) => detail.version_group.name)
        )
      )
    ).sort();
  }, [moves]);

  // Process moves data
  const processedMoves = useMemo<ProcessedMove[]>(() => {
    if (!moves) return [];

    return moves.flatMap((moveData) => {
      const moveId = extractIdFromUrl(moveData.move.url);
      return moveData.version_group_details.map((versionDetail) => ({
        id: moveId.toString(),
        name: moveData.move.name,
        url: moveData.move.url,
        learnMethod: versionDetail.move_learn_method.name,
        level: versionDetail.level_learned_at,
        versionGroup: versionDetail.version_group.name,
      }));
    });
  }, [moves]);

  // Filter and sort moves
  const filteredMoves = useMemo(() => {
    let filtered = processedMoves.filter((move) => {
      const matchesSearch = move.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesMethod =
        selectedLearnMethod === "all" ||
        move.learnMethod === selectedLearnMethod;
      const matchesVersionGroup =
        selectedVersionGroup === "all" ||
        move.versionGroup === selectedVersionGroup;
      return matchesSearch && matchesMethod && matchesVersionGroup;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "learnMethod":
          aValue = a.learnMethod;
          bValue = b.learnMethod;
          break;
        case "level":
          aValue = a.level;
          bValue = b.level;
          break;
        case "versionGroup":
          aValue = a.versionGroup;
          bValue = b.versionGroup;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? comparison : -comparison;
      } else {
        const comparison = (aValue as number) - (bValue as number);
        return sortDirection === "asc" ? comparison : -comparison;
      }
    });

    return filtered;
  }, [
    processedMoves,
    debouncedSearchTerm,
    selectedLearnMethod,
    selectedVersionGroup,
    sortField,
    sortDirection,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredMoves.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMoves = filteredMoves.slice(startIndex, endIndex);

  // Handle sort change
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Reset page when filters or sorting change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedLearnMethod, sortField, sortDirection]);

  const handleMoveClick = (moveId: string) => {
    setSelectedMoveId(moveId);
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedMoveId(null);
  };

  const getLearnMethodDisplay = (method: string, level: number) => {
    switch (method) {
      case "level-up":
        return `${t("pokemon.moves.level")} ${level}`;
      case "machine":
        return t("pokemon.moves.machine");
      case "tutor":
        return t("pokemon.moves.tutor");
      case "egg":
        return t("pokemon.moves.egg");
      default:
        return method;
    }
  };

  const getLearnMethodColor = (method: string) => {
    switch (method) {
      case "level-up":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "machine":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "tutor":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "egg":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 mt-4 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-[var(--primary)]/20 dark:border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          {t("pokemon.moves.title")}
        </h2>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t("pokemon.moves.searchPlaceholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Learn Method Filter */}
          <Select
            value={selectedLearnMethod}
            onValueChange={setSelectedLearnMethod}
          >
            <SelectTrigger className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("pokemon.moves.allMethods")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("pokemon.moves.allMethods")}
              </SelectItem>
              <SelectItem value="level-up">
                {t("pokemon.moves.levelUp")}
              </SelectItem>
              <SelectItem value="machine">
                {t("pokemon.moves.machine")}
              </SelectItem>
              <SelectItem value="egg">{t("pokemon.moves.egg")}</SelectItem>
              <SelectItem value="tutor">{t("pokemon.moves.tutor")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Version Group Filter */}
          <Select
            value={selectedVersionGroup}
            onValueChange={setSelectedVersionGroup}
          >
            <SelectTrigger className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("pokemon.moves.allVersions")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("pokemon.moves.allVersions")}
              </SelectItem>
              {versionGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-lg border-white/50 dark:border-gray-600/50 overflow-hidden">
          {processedMoves.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                {t("pokemon.moves.noMovesAvailable")}
              </div>
              <div className="text-gray-400 dark:text-gray-500 text-sm">
                {t("pokemon.moves.adjustFilters")}
              </div>
            </div>
          ) : (
            <>
              <Table className="border-4 border-secondary rounded-lg">
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-white rounded-tl-lg font-bold uppercase tracking-wider">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 p-0 h-auto font-bold uppercase tracking-wider text-white hover:text-white/80"
                      >
                        Nome
                        {sortField === "name" ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )
                        ) : (
                          <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-white font-bold uppercase tracking-wider">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("learnMethod")}
                        className="flex items-center gap-2 p-0 h-auto font-bold uppercase tracking-wider text-white hover:text-white/80"
                      >
                        Método de Aprendizado
                        {sortField === "learnMethod" ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )
                        ) : (
                          <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-white font-bold uppercase tracking-wider">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("versionGroup")}
                        className="flex items-center gap-2 p-0 h-auto font-bold uppercase tracking-wider text-white hover:text-white/80"
                      >
                        Versão
                        {sortField === "versionGroup" ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )
                        ) : (
                          <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-center rounded-tr-lg text-white font-bold uppercase tracking-wider">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMoves.map((move, index) => (
                    <motion.tr
                      key={`${move.id}-${move.versionGroup}-${move.learnMethod}-${move.level}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-[var(--primary)]/5 dark:hover:bg-gray-600/50 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleMoveClick(move.id)}
                    >
                      <TableCell>
                        <div className="text-sm font-bold text-gray-900 dark:text-gray-100 capitalize hover:text-[var(--primary)] transition-colors">
                          {move.name.replace("-", " ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getLearnMethodColor(move.learnMethod)}
                          variant="secondary"
                        >
                          {getLearnMethodDisplay(move.learnMethod, move.level)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {move.versionGroup.replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveClick(move.id);
                          }}
                          className="text-primary dark:text-foreground  hover:dark:bg-[var(--primary)]/30  hover:bg-[var(--primary)]/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredMoves.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  hasNext={currentPage < totalPages}
                  hasPrevious={currentPage > 1}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Side Panel */}
      <MoveDetailsSidePanel
        moveId={selectedMoveId}
        isOpen={isSidePanelOpen}
        onClose={closeSidePanel}
      />
    </>
  );
}

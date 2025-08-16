import { useState, useMemo } from "react";
import { moveLearnMethodPriority } from "@/lib/pokemon-constants";
import type { Pokemon } from "@/types/pokemon";

// Type for processed move with selected version detail
type ProcessedMove = {
  move: {
    name: string;
    url: string;
  };
  versionDetail: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  };
};

interface UseMovesTableProps {
  moves: Pokemon["moves"];
  itemsPerPage?: number;
}

interface UseMovesTableReturn {
  // State
  searchTerm: string;
  selectedLearnMethod: string;
  selectedVersionGroup: string;
  currentPage: number;
  selectedMove: string | null;
  isSheetOpen: boolean;

  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedLearnMethod: (method: string) => void;
  setSelectedVersionGroup: (group: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedMove: (move: string | null) => void;
  setIsSheetOpen: (open: boolean) => void;

  // Computed values
  filteredMoves: ProcessedMove[];
  paginatedMoves: ProcessedMove[];
  totalPages: number;
  availableLearnMethods: string[];
  availableVersionGroups: string[];

  // Pagination actions
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

/**
 * Custom hook for managing moves table state and filtering logic
 * Handles search, filtering, pagination and move selection
 */
export function useMovesTable({
  moves,
  itemsPerPage = 10,
}: UseMovesTableProps): UseMovesTableReturn {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLearnMethod, setSelectedLearnMethod] = useState("all");
  const [selectedVersionGroup, setSelectedVersionGroup] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Process moves to create flattened structure with version details
  const processedMoves = useMemo(() => {
    const processed: ProcessedMove[] = [];
    
    moves.forEach((moveData) => {
      moveData.version_group_details.forEach((versionDetail) => {
        processed.push({
          move: moveData.move,
          versionDetail,
        });
      });
    });
    
    return processed;
  }, [moves]);

  // Extract available filter options
  const availableLearnMethods = useMemo(() => {
    const methods = new Set<string>();
    processedMoves.forEach((move) => {
      methods.add(move.versionDetail.move_learn_method.name);
    });
    return Array.from(methods).sort((a, b) => {
      const priorityA = moveLearnMethodPriority[a] || 999;
      const priorityB = moveLearnMethodPriority[b] || 999;
      return priorityA - priorityB;
    });
  }, [processedMoves]);

  const availableVersionGroups = useMemo(() => {
    const groups = new Set<string>();
    processedMoves.forEach((move) => {
      groups.add(move.versionDetail.version_group.name);
    });
    return Array.from(groups).sort();
  }, [processedMoves]);

  // Filter moves based on search term and selected filters
  const filteredMoves = useMemo(() => {
    return processedMoves.filter((move) => {
      const matchesSearch = move.move.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesLearnMethod =
        selectedLearnMethod === "all" ||
        move.versionDetail.move_learn_method.name === selectedLearnMethod;

      const matchesVersionGroup =
        selectedVersionGroup === "all" ||
        move.versionDetail.version_group.name === selectedVersionGroup;

      return matchesSearch && matchesLearnMethod && matchesVersionGroup;
    });
  }, [processedMoves, searchTerm, selectedLearnMethod, selectedVersionGroup]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMoves.length / itemsPerPage);

  const paginatedMoves = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMoves.slice(startIndex, endIndex);
  }, [filteredMoves, currentPage, itemsPerPage]);

  // Reset page when filters change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleLearnMethodChange = (method: string) => {
    setSelectedLearnMethod(method);
    setCurrentPage(1);
  };

  const handleVersionGroupChange = (group: string) => {
    setSelectedVersionGroup(group);
    setCurrentPage(1);
  };

  // Pagination actions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    // State
    searchTerm,
    selectedLearnMethod,
    selectedVersionGroup,
    currentPage,
    selectedMove,
    isSheetOpen,

    // Actions
    setSearchTerm: handleSearchChange,
    setSelectedLearnMethod: handleLearnMethodChange,
    setSelectedVersionGroup: handleVersionGroupChange,
    setCurrentPage,
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
  };
}

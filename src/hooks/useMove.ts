import { useQuery } from "@tanstack/react-query";
import { getMove } from "@/services/pokemonApi";
import type { Move } from "@/types/pokemon";

export function useMove(id: number | string | null) {
  return useQuery<Move, Error>({
    queryKey: ["move", id],
    queryFn: () => {
      if (!id) throw new Error("Move ID is required");
      return getMove(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
import { useQuery } from "@tanstack/react-query";
import { getMachine } from "@/services/pokemonApi";
import type { Machine } from "@/types/pokemon";

export function useMachine(id: number | string | null) {
  return useQuery<Machine, Error>({
    queryKey: ["machine", id],
    queryFn: () => {
      if (!id) throw new Error("Machine ID is required");
      return getMachine(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
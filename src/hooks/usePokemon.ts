import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemon, searchPokemon } from "@/services/pokemonApi";
import type { PokemonSearchParams } from "@/types/pokemon";

export const usePokemonList = (params: PokemonSearchParams = {}) => {
  return useQuery({
    queryKey: ["pokemon-list", params],
    queryFn: () => getPokemonList(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const usePokemon = (nameOrId: string | number) => {
  return useQuery({
    queryKey: ["pokemon", nameOrId],
    queryFn: () => getPokemon(nameOrId),
    staleTime: 1000 * 60 * 5,
    enabled: !!nameOrId,
  });
};

export const usePokemonSearch = (query: string) => {
  return useQuery({
    queryKey: ["pokemon-search", query],
    queryFn: () => searchPokemon(query),
    staleTime: 1000 * 60 * 2,
    enabled: query.length > 0,
  });
};

export const useInfinitePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon-infinite"],
    queryFn: ({ pageParam = 1 }) =>
      getPokemonList({ page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

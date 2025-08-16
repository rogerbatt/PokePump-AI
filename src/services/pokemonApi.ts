import type {
  Pokemon,
  PokemonListResponse,
  PokemonSearchParams,
  PokemonSpecies,
  EvolutionChain,
  Move,
  Machine,
  MachineListResponse,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

// Dual-layer caching system for optimal performance
// requestCache: Prevents duplicate concurrent requests
// dataCache: Stores responses with timestamps for TTL-based invalidation
const requestCache = new Map<string, Promise<any>>();
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

function createCacheKey(url: string): string {
  return url;
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}
/**
 * Implements request deduplication and response caching
 * Prevents multiple identical API calls and caches responses for performance
 */
async function deduplicatedFetch<T>(url: string): Promise<T> {
  const cacheKey = createCacheKey(url);

  // Return cached data if still valid
  const cachedData = dataCache.get(cacheKey);
  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  // Return existing promise if request is already in progress
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  const requestPromise = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      dataCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    })
    .finally(() => {
      requestCache.delete(cacheKey);
    });

  requestCache.set(cacheKey, requestPromise);

  return requestPromise;
}

export async function getPokemonList(
  params: PokemonSearchParams = {}
): Promise<PokemonListResponse> {
  const { page = 1, limit = 20 } = params;
  const offset = (page - 1) * limit;

  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  return deduplicatedFetch<PokemonListResponse>(url);
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  const url = `${BASE_URL}/pokemon/${nameOrId}`;
  return deduplicatedFetch<Pokemon>(url);
}

/**
 * Client-side search implementation using cached Pokemon list
 * Fetches large dataset once, then filters locally for better UX
 */
export async function searchPokemon(
  query: string,
  limit = 20
): Promise<Pokemon[]> {
  // Fetch comprehensive list for client-side filtering
  const url = `${BASE_URL}/pokemon?limit=2000`;
  const data: PokemonListResponse =
    await deduplicatedFetch<PokemonListResponse>(url);

  // Filter by name match and limit results
  const filteredResults = data.results
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, limit);

  // Fetch detailed data for each matching Pokemon
  const pokemonPromises = filteredResults.map((pokemon) =>
    getPokemon(pokemon.name)
  );

  return Promise.all(pokemonPromises);
}

export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const url = `${BASE_URL}/pokemon-species/${nameOrId}`;
  return deduplicatedFetch<PokemonSpecies>(url);
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  return deduplicatedFetch<EvolutionChain>(url);
}

export async function getMove(id: number | string): Promise<Move> {
  const url = `${BASE_URL}/move/${id}`;
  return deduplicatedFetch<Move>(url);
}

export async function getMachine(id: number | string): Promise<Machine> {
  const url = `${BASE_URL}/machine/${id}`;
  return deduplicatedFetch<Machine>(url);
}

export async function getMachineList(): Promise<MachineListResponse> {
  const url = `${BASE_URL}/machine`;
  return deduplicatedFetch<MachineListResponse>(url);
}

export function extractMachineIdFromUrl(url: string): number {
  const matches = url.match(/\/machine\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

export function clearCache(): void {
  requestCache.clear();
  dataCache.clear();
}

export function getCacheStats(): {
  requestCacheSize: number;
  dataCacheSize: number;
} {
  return {
    requestCacheSize: requestCache.size,
    dataCacheSize: dataCache.size,
  };
}

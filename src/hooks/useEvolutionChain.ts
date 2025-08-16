import { useState, useEffect } from "react";
import { getEvolutionChain, getPokemon } from "@/services/pokemonApi";
import type {
  EvolutionNode,
  Pokemon,
  UseEvolutionChainResult,
} from "@/types/pokemon";

export function useEvolutionChain(
  pokemonId: number | string
): UseEvolutionChainResult {
  const [evolutionTree, setEvolutionTree] = useState<EvolutionNode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flatEvolutions, setFlatEvolutions] = useState<Pokemon[]>([]);
  const [hasComplexChain, setHasComplexChain] = useState(false);
  const [chainDepth, setChainDepth] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchEvolutionChain() {
      try {
        setIsLoading(true);
        setError(null);

        const pokemon = await getPokemon(pokemonId);
        if (!isMounted) return;

        if (!pokemon.species?.url) {
          throw new Error("Species information not available");
        }

        const speciesId = pokemon.species.url.split("/").slice(-2, -1)[0];
        if (!speciesId) {
          throw new Error("Invalid species URL");
        }

        const evolutionChain = await getEvolutionChain(speciesId);
        if (!isMounted) return;

        const tree = await buildEvolutionTree(evolutionChain.chain);
        if (!isMounted) return;

        const flat = flattenEvolutionTree(tree);
        const depth = calculateChainDepth(tree);
        const isComplex = hasMultipleBranches(tree) || depth > 2;

        setEvolutionTree(tree);
        setFlatEvolutions(flat);
        setHasComplexChain(isComplex);
        setChainDepth(depth);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching evolution chain:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load evolution chain"
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchEvolutionChain();

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  return {
    evolutionTree,
    isLoading,
    error,
    flatEvolutions,
    hasComplexChain,
    chainDepth,
  };
}

/**
 * Recursively builds an evolution tree from PokeAPI chain data
 * Handles complex evolution requirements and multiple evolution paths
 */
async function buildEvolutionTree(chainLink: any): Promise<EvolutionNode> {
  try {
    const pokemonId = chainLink.species.url.split("/").slice(-2, -1)[0];
    const pokemon = await getPokemon(pokemonId);

    // Extract evolution requirements from the first evolution detail
    // PokeAPI provides multiple details for different evolution paths
    const evolutionDetails = chainLink.evolution_details?.[0]
      ? {
          minLevel: chainLink.evolution_details[0].min_level || undefined,
          item: chainLink.evolution_details[0].item?.name || undefined,
          trigger: chainLink.evolution_details[0].trigger?.name || undefined,
          timeOfDay: chainLink.evolution_details[0].time_of_day || undefined,
          location: chainLink.evolution_details[0].location?.name || undefined,
          happiness: chainLink.evolution_details[0].min_happiness || undefined,
          beauty: chainLink.evolution_details[0].min_beauty || undefined,
          affection: chainLink.evolution_details[0].min_affection || undefined,
          gender: chainLink.evolution_details[0].gender || undefined,
          heldItem: chainLink.evolution_details[0].held_item?.name || undefined,
          knownMove:
            chainLink.evolution_details[0].known_move?.name || undefined,
          knownMoveType:
            chainLink.evolution_details[0].known_move_type?.name || undefined,
          needsOverworldRain:
            chainLink.evolution_details[0].needs_overworld_rain || undefined,
          partySpecies:
            chainLink.evolution_details[0].party_species?.name || undefined,
          partyType:
            chainLink.evolution_details[0].party_type?.name || undefined,
          relativePhysicalStats:
            chainLink.evolution_details[0].relative_physical_stats || undefined,
          tradeSpecies:
            chainLink.evolution_details[0].trade_species?.name || undefined,
          turnUpsideDown:
            chainLink.evolution_details[0].turn_upside_down || undefined,
        }
      : undefined;

    // Process all possible evolution branches (e.g., Eevee has multiple evolutions)
    const evolvesTo: EvolutionNode[] = [];
    if (chainLink.evolves_to && Array.isArray(chainLink.evolves_to)) {
      for (const evolution of chainLink.evolves_to) {
        try {
          const evolutionNode = await buildEvolutionTree(evolution);
          evolvesTo.push(evolutionNode);
        } catch (err) {
          console.warn("Failed to build evolution branch:", err);

        }
      }
    }

    return {
      pokemon,
      evolvesTo,
      evolutionDetails,
    };
  } catch (err) {
    console.error("Error building evolution tree node:", err);
    throw new Error(
      `Failed to build evolution tree for ${
        chainLink.species?.name || "unknown species"
      }`
    );
  }
}

/**
 * Converts tree structure to flat array for easier iteration
 */
function flattenEvolutionTree(node: EvolutionNode): Pokemon[] {
  const result: Pokemon[] = [node.pokemon];

  for (const evolution of node.evolvesTo) {
    result.push(...flattenEvolutionTree(evolution));
  }

  return result;
}

/**
 * Calculates maximum depth of evolution chain (e.g., Caterpie -> Metapod -> Butterfree = 3)
 */
function calculateChainDepth(node: EvolutionNode): number {
  if (node.evolvesTo.length === 0) {
    return 1;
  }

  return 1 + Math.max(...node.evolvesTo.map(calculateChainDepth));
}

/**
 * Detects branching evolution chains (e.g., Eevee with multiple evolution options)
 */
function hasMultipleBranches(node: EvolutionNode): boolean {
  if (node.evolvesTo.length > 1) {
    return true;
  }

  return node.evolvesTo.some(hasMultipleBranches);
}

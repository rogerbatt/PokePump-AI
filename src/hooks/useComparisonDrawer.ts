import { useState, useEffect } from "react";
import type { ComparisonPokemon, Pokemon } from "@/types/pokemon";

const STORAGE_KEY = "pokemon-comparison";

/**
 * Manages Pokemon comparison state with persistent storage
 * Handles up to 3 Pokemon for side-by-side comparison
 */
export function useComparisonDrawer() {
  const [pokemonList, setPokemonList] = useState<ComparisonPokemon[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore comparison list from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPokemonList(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading comparison data from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist comparison list changes to localStorage (skip initial render)
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemonList));
    } catch (error) {
      console.error("Error saving comparison data to localStorage:", error);
    }
  }, [pokemonList, isInitialized]);

  const addPokemon = (pokemon: Pokemon) => {
    // Enforce maximum of 3 Pokemon for comparison
    if (pokemonList.length >= 3) {
      return false;
    }

    // Prevent duplicate Pokemon in comparison
    if (pokemonList.some((p) => p.id === pokemon.id)) {
      return false;
    }

    // Extract only necessary data for comparison to reduce memory usage
    const comparisonPokemon: ComparisonPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      types: pokemon.types,
      stats: pokemon.stats,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities,
    };

    setPokemonList((prev) => [...prev, comparisonPokemon]);
    return true;
  };

  const removePokemon = (pokemonId: number) => {
    setPokemonList((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  const clearComparison = () => {
    setPokemonList([]);
    setIsOpen(false);
  };

  const isPokemonInComparison = (pokemonId: number) => {
    return pokemonList.some((p) => p.id === pokemonId);
  };

  const canAddMore = () => {
    return pokemonList.length < 3;
  };

  // Convenience method for add/remove toggle behavior
  const togglePokemon = (pokemon: Pokemon) => {
    if (isPokemonInComparison(pokemon.id)) {
      removePokemon(pokemon.id);
      return true;
    } else {
      return addPokemon(pokemon);
    }
  };

  return {
    pokemonList,
    addPokemon,
    removePokemon,
    togglePokemon,
    clearComparison,
    isPokemonInComparison,
    canAddMore,
    isOpen,
    setIsOpen,
  };
}

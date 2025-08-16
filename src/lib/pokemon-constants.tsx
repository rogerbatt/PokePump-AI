import React from "react";
import { Swords, Zap, Shield } from "lucide-react";

/**
 * Pokemon type color mappings for consistent theming
 */
export const typeColors: Record<string, string> = {
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

/**
 * Move damage class color mappings
 */
export const damageClassColors: Record<string, string> = {
  physical: "text-red-600",
  special: "text-blue-600",
  status: "text-gray-600",
};

/**
 * Move damage class icon mappings
 */
export const damageClassIcons: Record<string, React.ReactNode> = {
  physical: <Swords className="w-4 h-4" />,
  special: <Zap className="w-4 h-4" />,
  status: <Shield className="w-4 h-4" />,
};

/**
 * Move learn method priority for sorting
 */
export const moveLearnMethodPriority: Record<string, number> = {
  "level-up": 1,
  machine: 2,
  tutor: 3,
  egg: 4,
};

/**
 * Utility function to get learn method label translation key
 */
export const getLearnMethodTranslationKey = (method: string): string => {
  const keys: Record<string, string> = {
    "level-up": "pokemon.moves.level",
    machine: "pokemon.moves.machine",
    tutor: "pokemon.moves.tutor",
    egg: "pokemon.moves.egg",
  };
  return keys[method] || method;
};
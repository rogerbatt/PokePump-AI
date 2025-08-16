import React from "react";
import { motion } from "@/lib/optimized-imports";
import { cn } from "@/lib/utils";

interface PokemonIconProps {
  name: string;
  sprite?: string;
  pokemonId?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  fallbackLetter?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
};

const imageSizes = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-18 h-18",
  xl: "w-20 h-20",
};

export const PokemonIcon: React.FC<PokemonIconProps> = ({
  name,
  sprite,
  pokemonId = 1,
  size = "md",
  className,
  animated = true,
  fallbackLetter = true,
}) => {
  const spriteUrl =
    sprite ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const iconContent = (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner transition-shadow duration-300",
        sizeClasses[size],
        "group-hover:shadow-lg",
        className
      )}
    >
      <img
        src={spriteUrl}
        alt={name}
        className={cn(
          "drop-shadow-sm transition-all duration-300",
          imageSizes[size],
          "group-hover:drop-shadow-md"
        )}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (fallbackLetter) {
            target.style.display = "none";
            const fallback = document.createElement("div");
            fallback.className = "text-3xl font-bold text-blue-500";
            fallback.textContent = name.charAt(0).toUpperCase();
            target.parentElement?.appendChild(fallback);
          }
        }}
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {iconContent}
      </motion.div>
    );
  }

  return iconContent;
};

export default PokemonIcon;

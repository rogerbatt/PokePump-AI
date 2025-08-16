import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 hover:bg-gray-500",
  fire: "bg-red-500 hover:bg-red-600",
  water: "bg-blue-500 hover:bg-blue-600",
  electric: "bg-yellow-400 hover:bg-yellow-500",
  grass: "bg-green-500 hover:bg-green-600",
  ice: "bg-blue-300 hover:bg-blue-400",
  fighting: "bg-red-700 hover:bg-red-800",
  poison: "bg-purple-500 hover:bg-purple-600",
  ground: "bg-yellow-600 hover:bg-yellow-700",
  flying: "bg-indigo-400 hover:bg-indigo-500",
  psychic: "bg-pink-500 hover:bg-pink-600",
  bug: "bg-green-400 hover:bg-green-500",
  rock: "bg-yellow-800 hover:bg-yellow-900",
  ghost: "bg-purple-700 hover:bg-purple-800",
  dragon: "bg-indigo-700 hover:bg-indigo-800",
  dark: "bg-gray-800 hover:bg-gray-900",
  steel: "bg-gray-500 hover:bg-gray-600",
  fairy: "bg-pink-300 hover:bg-pink-400",
};

const sizeClasses = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2",
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  size = "md",
  className,
}) => {
  const typeColor = typeColors[type.toLowerCase()] || typeColors.normal;

  return (
    <Badge
      className={cn(
        typeColor,
        "text-white font-semibold capitalize border-0 shadow-sm transition-all duration-200",
        sizeClasses[size],
        className
      )}
    >
      {type}
    </Badge>
  );
};

export default TypeBadge;

import React from "react";
import { cn } from "@/lib/utils";

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
  showValue?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const statNames: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

const sizeClasses = {
  sm: {
    container: "gap-2",
    label: "w-16 text-xs",
    bar: "h-2",
    value: "w-8 text-xs",
  },
  md: {
    container: "gap-3",
    label: "w-20 text-sm",
    bar: "h-3",
    value: "w-12 text-sm",
  },
  lg: {
    container: "gap-4",
    label: "w-24 text-base",
    bar: "h-4",
    value: "w-16 text-base",
  },
};

export const StatBar: React.FC<StatBarProps> = ({
  name,
  value,
  maxValue = 255,
  showValue = true,
  className,
  size = "md",
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const statColor =
    value >= 100
      ? "bg-green-500"
      : value >= 70
      ? "bg-yellow-500"
      : "bg-red-500";

  const displayName = statNames[name] || name;
  const classes = sizeClasses[size];

  return (
    <div className={cn("flex items-center", classes.container, className)}>
      <div
        className={cn(
          "font-medium text-gray-700 dark:text-gray-300",
          classes.label
        )}
      >
        {displayName}
      </div>
      <div
        className={cn(
          "flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
          classes.bar
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out",
            statColor
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div
          className={cn(
            "font-bold text-gray-800 dark:text-gray-200",
            classes.value
          )}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default StatBar;
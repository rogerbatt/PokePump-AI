import { useTranslation } from "react-i18next";
import type { Pokemon } from "@/types/pokemon";

interface PhysicalInfoSectionProps {
  height: Pokemon["height"];
  weight: Pokemon["weight"];
}

function PhysicalInfoSection({ height, weight }: PhysicalInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-2 text-center backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {height / 10} m
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {t("pokemon.details.height")}
        </div>
      </div>
      <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-2 text-center backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {weight / 10} kg
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {t("pokemon.details.weight")}
        </div>
      </div>
    </div>
  );
}

export { PhysicalInfoSection };

import { useTranslation } from "react-i18next";
import { Progress } from "@/components/atoms";
import type { Pokemon } from "@/types/pokemon";

interface StatsCardProps {
  stats: Pokemon["stats"];
}

function StatsCard({ stats }: StatsCardProps) {
  const { t } = useTranslation();

  const getStatColor = (value: number) => {
    if (value >= 120)
      return {
        bg: "bg-emerald-500",
        text: "text-emerald-600",
      };
    if (value >= 80) return { bg: "bg-yellow-500", text: "text-yellow-600" };
    if (value >= 50) return { bg: "bg-orange-500", text: "text-orange-600" };
    return { bg: "bg-red-500", text: "text-red-600" };
  };

  const statNames: { [key: string]: string } = {
    hp: t("pokemon.stats.hp"),
    attack: t("pokemon.stats.attack"),
    defense: t("pokemon.stats.defense"),
    "special-attack": t("pokemon.stats.specialAttack"),
    "special-defense": t("pokemon.stats.specialDefense"),
    speed: t("pokemon.stats.speed"),
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-200 dark:border-gray-700 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("pokemon.details.stats")}
        </h3>
      </div>

      <div className="bg-white/70 dark:bg-gray-700/70 p-4 rounded-md grid gap-2">
        {stats.map((stat) => {
          const percentage = Math.min((stat.base_stat / 255) * 100, 100);
          const colors = getStatColor(stat.base_stat);

          return (
            <div
              key={stat.stat.name}
              className="rounded-sm mt-1 transition-all duration-300"
            >
              <div className="flex space-y-2 justify-between items-center">
                <span className="text-sm col-span-1 font-bold text-gray-700 dark:text-gray-300">
                  {statNames[stat.stat.name] ||
                    stat.stat.name.replace("-", " ")}
                </span>
                <span
                  className={`font-semibold ${colors.text} dark:text-gray-200`}
                >
                  {stat.base_stat}
                </span>
              </div>

              <Progress className={`${colors.bg}`} value={percentage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { StatsCard };

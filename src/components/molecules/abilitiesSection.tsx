import { useTranslation } from "react-i18next";
import type { Pokemon } from "@/types/pokemon";
import { Badge } from "@/components/atoms/";

interface AbilitiesSectionProps {
  abilities: Pokemon["abilities"];
}

function AbilitiesSection({ abilities }: AbilitiesSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="col-span-1">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center lg:text-left">
        {t("pokemon.details.abilities")}
      </h2>
      <div className="grid gap-2">
        {abilities.map((ability) => (
          <div
            key={ability.ability.name}
            className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 hover:scale-101 ${
              ability.is_hidden
                ? "bg-gradient-to-r from-primary/90 text-primary-foreground to-primary/60"
                : "bg-muted-foreground/20 dark:muted/70 border-muted dark:border-muted"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold capitalize text-lg">
                {ability.ability.name.replace("-", " ")}
              </h3>
              {ability.is_hidden && (
                <Badge variant={"secondary"} className="font-bold">
                  {t("pokemon.details.hidden")}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { AbilitiesSection };

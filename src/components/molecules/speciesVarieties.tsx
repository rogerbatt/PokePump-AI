import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PokemonSpecies } from "@/types/pokemon";

interface SpeciesVarietiesProps {
  species: PokemonSpecies;
  currentPokemonName: string;
}

function SpeciesVarieties({
  species,
  currentPokemonName,
}: SpeciesVarietiesProps) {
  const { t } = useTranslation();

  if (!species.varieties || species.varieties.length <= 1) {
    return null;
  }

  const formatVarietyName = (name: string): string => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        {t("pokemon.details.varieties.title")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {species.varieties.map((variety) => {
          const isCurrentVariety = variety.pokemon.name === currentPokemonName;

          return (
            <Link
              key={variety.pokemon.name}
              to={`/p/${variety.pokemon.name}`}
              className={`
                inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isCurrentVariety
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ring-2 ring-blue-500"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
              aria-label={`${t(
                "pokemon.details.varieties.switchTo"
              )} ${formatVarietyName(variety.pokemon.name)}`}
            >
              {variety.is_default && (
                <span
                  className="mr-1.5 text-xs"
                  aria-label={t("pokemon.details.varieties.default")}
                >
                  ⭐
                </span>
              )}
              {formatVarietyName(variety.pokemon.name)}
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {t("pokemon.details.varieties.description")}
      </p>
    </div>
  );
}

export { SpeciesVarieties };

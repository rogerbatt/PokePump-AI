import { useTranslation } from "react-i18next";
import type { Pokemon } from "@/types/pokemon";
import { Badge } from "@/components/atoms";

interface PokemonMainCardProps {
  pokemon: Pokemon;
  typeColors: Record<string, string>;
}

function PokemonMainCard({ pokemon, typeColors }: PokemonMainCardProps) {
  const { t } = useTranslation();

  return (
    <div className="col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-200 dark:border-gray-700 shadow-xl">
      <div className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="relative">
            <div className="w-48 h-48 bg-white/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-600">
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default ||
                  ""
                }
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-lg"
                loading="eager"
              />
            </div>
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-secondary to-secondary/80 text-white px-3 py-1 rounded-full font-bold shadow-lg">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center flex-col">
            <h1 className="text-4xl font-bold capitalize text-gray-800 dark:text-gray-100 mb-4 text-center">
              {pokemon.name}
            </h1>

            <div className="flex lg:justify-start gap-3 mb-6">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  className={`text-sm font-bold shadow-lg transform hover:scale-105 transition-transform cursor-default select-none ${
                    typeColors[type.type.name] || "bg-gray-400"
                  }`}
                >
                  {type.type.name.toUpperCase()}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-2 text-center backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {pokemon.height / 10} m
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t("pokemon.details.height")}
                </div>
              </div>
              <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-2 text-center backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {pokemon.weight / 10} kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t("pokemon.details.weight")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PokemonMainCard };

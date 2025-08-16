import { useTranslation } from "react-i18next";
import type { Pokemon } from "@/types/pokemon";

interface SpritesCardProps {
  sprites: Pokemon['sprites'];
  pokemonName: string;
}

function SpritesCard({ sprites, pokemonName }: SpritesCardProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-purple-200 dark:border-gray-700 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Sprites
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {sprites.front_default && (
          <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-4 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 group">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={sprites.front_default}
                  alt={`${pokemonName} normal front`}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </div>
              <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Normal
              </div>
            </div>
          </div>
        )}

        {sprites.front_shiny && (
          <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-4 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 group">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:bg-gradient-to-br dark:from-yellow-800 dark:to-yellow-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-yellow-300 dark:border-yellow-600">
                <img
                  src={sprites.front_shiny}
                  alt={`${pokemonName} shiny front`}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </div>
              <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                Shiny ✨
              </div>
            </div>
          </div>
        )}

        {sprites.back_default && (
          <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-4 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 group">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={sprites.back_default}
                  alt={`${pokemonName} normal back`}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </div>
              <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {t("pokemon.details.sprites.back")}
              </div>
            </div>
          </div>
        )}

        {sprites.back_shiny && (
          <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-4 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 group">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:bg-gradient-to-br dark:from-yellow-800 dark:to-yellow-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-yellow-300 dark:border-yellow-600">
                <img
                  src={sprites.back_shiny}
                  alt={`${pokemonName} shiny back`}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </div>
              <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                {t("pokemon.details.sprites.shinyBack")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { SpritesCard };

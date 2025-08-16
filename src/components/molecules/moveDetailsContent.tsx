import { Target, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { PokeBallIcon } from "@/components/atoms/pokeballIcon";
import { useMove } from "@/hooks/useMove";
import {
  typeColors,
  damageClassColors,
  damageClassIcons,
} from "@/lib/pokemon-constants";
import { useTranslation } from "react-i18next";

interface MoveDetailsContentProps {
  moveId: string | null;
}

/**
 * Component that displays detailed information about a Pokemon move
 * Includes stats, effects, descriptions and additional metadata
 */
export function MoveDetailsContent({ moveId }: MoveDetailsContentProps) {
  const { t } = useTranslation();
  const { data: move, isLoading, error } = useMove(moveId);

  if (!moveId) return null;

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <PokeBallIcon className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{t("common.loading")}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8">{t("common.error")}</div>
      )}

      {move && (
        <>
          {/* Move type and damage class badges */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  typeColors[move.type.name] || "bg-gray-400"
                }`}
              >
                {move.type.name.toUpperCase()}
              </span>
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  damageClassColors[move.damage_class.name] || "text-gray-600"
                } bg-gray-100`}
              >
                {damageClassIcons[move.damage_class.name]}
                {move.damage_class.name.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Move statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                {t("pokemon.details.stats")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {move.power || "—"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("pokemon.moves.power")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {move.accuracy || "—"}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("pokemon.moves.accuracy")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {move.pp || "—"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("pokemon.moves.pp")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {move.priority || "0"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("pokemon.moves.priority")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Move effect */}
          {move.effect_entries && move.effect_entries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {t("pokemon.moves.effect")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {move.effect_entries.find(
                    (entry) => entry.language.name === "en"
                  )?.effect ||
                    move.effect_entries[0]?.effect ||
                    t("common.noData")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Flavor Text */}
          {move.flavor_text_entries && move.flavor_text_entries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("pokemon.moves.description")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {move.flavor_text_entries.find(
                      (entry) => entry.language.name === "en"
                    )?.flavor_text ||
                      move.flavor_text_entries[0]?.flavor_text ||
                      t("common.noData")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
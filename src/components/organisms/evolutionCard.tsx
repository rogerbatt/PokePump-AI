import { useTranslation } from "react-i18next";
import type { EvolutionChain } from "@/types/pokemon";

interface EvolutionCardProps {
  chain: EvolutionChain | null | undefined;
  EvolutionTree: React.ComponentType<{ chain: any }>;
}

function EvolutionCard({ chain, EvolutionTree }: EvolutionCardProps) {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-2 w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-purple-200 dark:border-gray-700 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        {t("pokemon.details.evolution")}
      </h3>
      {chain ? (
        <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-6 backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
          <EvolutionTree chain={chain.chain} />
        </div>
      ) : (
        <div className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-6 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t("common.loading")}
          </p>
        </div>
      )}
    </div>
  );
}

export { EvolutionCard };

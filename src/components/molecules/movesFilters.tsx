import { Search, Filter } from "lucide-react";
import { Input } from "@/components/atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { useTranslation } from "react-i18next";

interface MovesFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedLearnMethod: string;
  onLearnMethodChange: (method: string) => void;
  selectedVersionGroup: string;
  onVersionGroupChange: (group: string) => void;
  availableLearnMethods: string[];
  availableVersionGroups: string[];
}

export function MovesFilters({
  searchTerm,
  onSearchChange,
  selectedLearnMethod,
  onLearnMethodChange,
  selectedVersionGroup,
  onVersionGroupChange,
  availableLearnMethods,
  availableVersionGroups,
}: MovesFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={t("pokemon.moves.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Learn Method Filter */}
      <Select value={selectedLearnMethod} onValueChange={onLearnMethodChange}>
        <SelectTrigger className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder={t("pokemon.moves.allMethods")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("pokemon.moves.allMethods")}</SelectItem>
          {availableLearnMethods.map((method) => (
            <SelectItem key={method} value={method}>
              {t(`pokemon.moves.${method.replace("-", "")}`, method)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Version Group Filter */}
      <Select value={selectedVersionGroup} onValueChange={onVersionGroupChange}>
        <SelectTrigger className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder={t("pokemon.moves.allVersions")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("pokemon.moves.allVersions")}</SelectItem>
          {availableVersionGroups.map((group) => (
            <SelectItem key={group} value={group}>
              {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

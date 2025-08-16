import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="group w-auto border-none bg-transparent hover:bg-muted dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-white group-hover:text-secondary" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export type { LanguageToggle as LanguageToggleType };

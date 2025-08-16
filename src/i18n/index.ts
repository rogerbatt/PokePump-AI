import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem("pokepump-language") || "pt";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
  lng: savedLanguage, // use saved language or default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Save language to localStorage whenever it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("pokepump-language", lng);
});

export default i18n;

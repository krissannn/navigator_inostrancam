import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru/translation.json";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";

export const SUPPORTED_LANGUAGES = ["ru", "en", "zh"] as const;

const savedLanguage = localStorage.getItem("language");
const initialLanguage =
  savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as (typeof SUPPORTED_LANGUAGES)[number])
    ? savedLanguage
    : "ru";

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initialLanguage,
  fallbackLng: "ru",
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;

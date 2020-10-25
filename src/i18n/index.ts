import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationUA from "./locales/ua.json";

const setLanguage = () => {
  const language = localStorage.getItem("language");
  switch (language) {
    case "en":
      return "en";
    case "ua":
      return "ua";
    default:
      return "en";
  }
};

export const defaultLanguage: string = setLanguage();

const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  resources,
});

export default i18n;

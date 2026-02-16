import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

const savedLanguage = localStorage.getItem("minory-lang") as "en" | "tr" | null;
const initialLang = savedLanguage && (savedLanguage === "en" || savedLanguage === "tr") ? savedLanguage : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

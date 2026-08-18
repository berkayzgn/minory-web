import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

// Prerender sırasında Node'da çalıştığı için localStorage/document erişimi korumalı
const isBrowser = typeof window !== "undefined";

const savedLanguage = isBrowser
  ? (localStorage.getItem("minory-lang") as "en" | "tr" | null)
  : null;
const initialLang = savedLanguage && (savedLanguage === "en" || savedLanguage === "tr") ? savedLanguage : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function setDocumentLang(lng: string) {
  if (!isBrowser) return;
  document.documentElement.lang = lng === "tr" ? "tr" : "en";
}
setDocumentLang(initialLang);
i18n.on("languageChanged", setDocumentLang);

export default i18n;

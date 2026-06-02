import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEY } from "./languages";
import am from "./locales/am.json";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import so from "./locales/so.json";
import ti from "./locales/ti.json";

const resources = {
  en: { translation: en },
  am: { translation: am },
  ti: { translation: ti },
  ar: { translation: ar },
  es: { translation: es },
  fr: { translation: fr },
  so: { translation: so },
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && resources[saved] ? saved : DEFAULT_LANGUAGE;
};

const supportedLngs = LANGUAGES.map((lang) => lang.code);

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: true,
  });
}

export const changeLanguage = (code) => {
  i18n.changeLanguage(code);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, code);
  }
};

export default i18n;

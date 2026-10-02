import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEY } from "./languages";
import en from "./locales/en.json";
import siteEn from "./site/en.json";

// English ships with every page. The other six languages are fetched only when
// a visitor picks one, so nobody downloads all seven. Each language is the
// shared app/demo strings (locales/<lng>.json) plus the marketing-site copy
// (site/<lng>.json, checked against en.json by scripts/check-site-locales.js)
// under `site.*`. A missing key falls back to English.
const LazyLocaleBackend = {
  type: "backend",
  init() {},
  read(language, namespace, callback) {
    Promise.all([import(`./locales/${language}.json`), import(`./site/${language}.json`)])
      .then(([base, site]) => callback(null, { ...base.default, site: site.default }))
      .catch((error) => callback(error, null));
  },
};

const supportedLngs = LANGUAGES.map((lang) => lang.code);

// The static HTML is rendered in English, so the client must hydrate in English
// too; the saved language is applied right after mount (see LanguageEffect).
export const getSavedLanguage = () => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && supportedLngs.includes(saved) ? saved : null;
  } catch {
    return null;
  }
};

if (!i18n.isInitialized) {
  i18n
    .use(LazyLocaleBackend)
    .use(initReactI18next)
    .init({
      resources: { en: { translation: { ...en, site: siteEn } } },
      partialBundledLanguages: true,
      lng: DEFAULT_LANGUAGE,
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
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Private mode — the choice just won't persist.
    }
  }
};

export default i18n;

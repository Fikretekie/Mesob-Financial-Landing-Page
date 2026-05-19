export const LANGUAGES = [
  { code: "en", label: "ENGLISH", nativeLabel: "ENGLISH", flag: "🇺🇸", dir: "ltr" },
  { code: "am", label: "Amharic", nativeLabel: "አማርኛ", flag: "🇪🇹", dir: "ltr" },
  { code: "ti", label: "Tigrinya", nativeLabel: "ትግርኛ", flag: "🇪🇷", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "es", label: "Spanish", nativeLabel: "ESPAÑOL", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "FRANÇAIS", flag: "🇫🇷", dir: "ltr" },
  { code: "so", label: "Somali", nativeLabel: "SOOMAALI", flag: "🇸🇴", dir: "ltr" },
];

export const DEFAULT_LANGUAGE = "en";
export const STORAGE_KEY = "meksova-locale";

export const getLanguage = (code) =>
  LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0];

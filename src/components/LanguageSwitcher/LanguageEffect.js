import { getLanguage } from "@/i18n/languages";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageEffect = () => {
  const { i18n } = useTranslation();
  const lang = getLanguage(i18n.language);

  useEffect(() => {
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
    document.body.classList.toggle("rtl-layout", lang.dir === "rtl");
  }, [lang.code, lang.dir]);

  return null;
};

export default LanguageEffect;

import i18n from "@/i18n";
import LanguageEffect from "@/components/LanguageSwitcher/LanguageEffect";
import { I18nextProvider } from "react-i18next";
// Marketing site design system (scoped to .ks)
import "@/styles/site.css";
// Demo page styles (scoped to .demo-app class)
import "@/styles/demo.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageEffect />
      <Component {...pageProps} />
    </I18nextProvider>
  );
};

export default MyApp;

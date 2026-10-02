import i18n from "@/i18n";
import LanguageEffect from "@/components/LanguageSwitcher/LanguageEffect";
import { I18nextProvider } from "react-i18next";
import { Geist, Geist_Mono, Instrument_Serif, Inter, JetBrains_Mono, Noto_Sans_Arabic, Noto_Sans_Ethiopic } from "next/font/google";
// Marketing site design system (scoped to .ks)
import "@/styles/site.css";
// Demo page styles (scoped to .demo-app class)
import "@/styles/demo.css";

// Self-hosted at build time: no render-blocking request to Google on page load.
// Ethiopic and Arabic are only downloaded when a page shows those scripts.
const geist = Geist({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const ethiopic = Noto_Sans_Ethiopic({ subsets: ["ethiopic"], display: "swap", preload: false });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], display: "swap", preload: false });
// The demo (app look-alike) uses the app's fonts; not preloaded on marketing pages.
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false });
const jbMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", preload: false });

const fontVars = `:root{--font-geist:${geist.style.fontFamily};--font-geist-mono:${geistMono.style.fontFamily};--font-serif:${serif.style.fontFamily};--font-ethiopic:${ethiopic.style.fontFamily};--font-arabic:${arabic.style.fontFamily};--font-inter:${inter.style.fontFamily};--font-jbmono:${jbMono.style.fontFamily}}`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <style dangerouslySetInnerHTML={{ __html: fontVars }} />
      <LanguageEffect />
      <Component {...pageProps} />
    </I18nextProvider>
  );
};

export default MyApp;

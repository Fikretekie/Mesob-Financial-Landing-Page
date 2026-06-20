import i18n from "@/i18n";
import ContextProvider from "@/context/ContextProvider";
import LanguageEffect from "@/components/LanguageSwitcher/LanguageEffect";
import { I18nextProvider } from "react-i18next";
import "@/vendors/animate/animate.min.css";
import "@/vendors/animate/custom-animate.css";
import "@/vendors/fontawesome/css/all.min.css";
import "@/vendors/oslim-icons/style.css";
import "@/vendors/reey-font/stylesheet.css";
import "@/vendors/the-sayinistic-font/stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "node_modules/swiper/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.css";
import "jarallax/dist/jarallax.css";
import "tiny-slider/dist/tiny-slider.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// extra css
import "@/styles/style.css";
import "@/styles/responsive.css";

// Demo page styles (scoped to .demo-app class)
import "@/styles/demo.css";

import Script from "next/script";
const GA_ADS_ID = "AW-18245722845";

const MyApp = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ContextProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ADS_ID}');
          `}
        </Script>
        <LanguageEffect />
        <Component {...pageProps} />
      </ContextProvider>
    </I18nextProvider>
  );
};

export default MyApp;

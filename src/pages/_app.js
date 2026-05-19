import "@/i18n";
import ContextProvider from "@/context/ContextProvider";
import LanguageEffect from "@/components/LanguageSwitcher/LanguageEffect";
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

const MyApp = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <LanguageEffect />
      <Component {...pageProps} />
    </ContextProvider>
  );
};

export default MyApp;

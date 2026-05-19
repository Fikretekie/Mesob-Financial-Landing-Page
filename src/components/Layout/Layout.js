import Preloader from "@/components/Preloader/Preloader";
import useScroll from "@/hooks/useScroll";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import MobileMenu from "../Header/MobileMenu";
import SearchPopup from "../Header/SearchPopup";
import SiteFooter from "../SiteFooter/SiteFooter";

const Layout = ({
  children,
  pageTitle = "",
  pageDescription,
  footerClassName = "",
  navItems,
  onePage = false,
}) => {
  const { t } = useTranslation();
  const defaultDescription = t("common.meta.defaultDescription");
  const [loading, setLoading] = useState(true);
  const { scrollTop } = useScroll(100);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={pageDescription ?? defaultDescription}
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription ?? defaultDescription} />
        <meta property="og:image" content="https://meksova.com/ICON.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content={t("common.meta.ogImageAlt")} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription ?? defaultDescription} />
        <meta name="twitter:image" content="https://meksova.com/ICON.png" />
        
        {/* Additional SEO */}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://meksova.com'} />
      </Head>
      <Preloader loading={loading} />
      <main
        id="wrapper"
        style={{ opacity: loading ? 0 : 1 }}
        className="page-wrapper animated fadeIn"
      >
        {children}
        <SiteFooter footerClassName={footerClassName} />
      </main>
      <MobileMenu navItems={navItems} onePage={onePage} />
      <SearchPopup />
      {scrollTop && (
        <ScrollLink
          to="wrapper"
          smooth={true}
          duration={500}
          id="backToTop"
          style={{ cursor: "pointer" }}
          className="scroll-to-target scroll-to-top d-inline-block fadeIn animated"
        >
          <i className="fa fa-angle-up"></i>
        </ScrollLink>
      )}
    </>
  );
};

export default Layout;

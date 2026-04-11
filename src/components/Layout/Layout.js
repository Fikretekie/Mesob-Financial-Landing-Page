import Preloader from "@/components/Preloader/Preloader";
import useScroll from "@/hooks/useScroll";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import MobileMenu from "../Header/MobileMenu";
import SearchPopup from "../Header/SearchPopup";
import SiteFooter from "../SiteFooter/SiteFooter";

const DEFAULT_META_DESCRIPTION =
  "Meksova helps small businesses track receipts, income, and expenses with simple, tax-ready bookkeeping.";

const Layout = ({
  children,
  pageTitle = "",
  pageDescription,
  footerClassName = "",
  navItems,
  onePage = false,
}) => {
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
          content={pageDescription ?? DEFAULT_META_DESCRIPTION}
        />
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

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SITE_URL } from "@/data/site";
import { captureAttribution } from "@/utils/demoTracking";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

// Shell for every marketing page: meta tags, nav, footer, scroll reveals.
// `jsonLd` is an optional structured-data object (or array) for the page.
export default function SiteLayout({ title, description, image, jsonLd, noindex = false, children }) {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/brand/og.png`;

  useEffect(() => {
    captureAttribution();
  }, []);

  // Fade sections in as they enter the viewport. Anything already on screen,
  // or anything left after 2.5s (e.g. a stalled observer), is shown regardless.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".ks-reveal:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    nodes.forEach((node) => observer.observe(node));
    const fallback = setTimeout(() => nodes.forEach((node) => node.classList.add("is-in")), 2500);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [path]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        {noindex && <meta name="robots" content="noindex" />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Meksova" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div className="ks">
        <a className="ks-skip" href="#main">{t("site.nav.skip")}</a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}

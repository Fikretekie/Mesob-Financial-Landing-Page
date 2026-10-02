import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Cta } from "@/components/site/ui";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <SiteLayout title={t("site.notFound.metaTitle")} description={t("site.notFound.lede")} noindex>
      <header className="ks-pagehead ks-pad-b">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-reveal">
            <p className="ks-kicker">404</p>
            <h1 className="ks-display ks-display--md">{t("site.notFound.title")}</h1>
            <p className="ks-lede">{t("site.notFound.lede")}</p>
            <div className="ks-actions">
              <Cta href="/">{t("site.notFound.home")}</Cta>
              <Cta href="/demo/" variant="ghost">{t("site.common.tryDemo")}</Cta>
            </div>
          </div>
        </div>
      </header>
    </SiteLayout>
  );
}

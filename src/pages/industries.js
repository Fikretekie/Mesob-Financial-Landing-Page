import Link from "next/link";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Eyebrow, IndustryGlyph, Section } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { INDUSTRIES } from "@/data/site";

export default function Industries() {
  const { t } = useTranslation();
  return (
    <SiteLayout title={t("site.industriesPage.metaTitle")} description={t("site.industriesPage.metaDescription")}>
      <header className="ks-pagehead">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-reveal">
            <Eyebrow>{t("site.industriesPage.eyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md ks-gap">{t("site.industriesPage.title")}</h1>
            <p className="ks-lede">{t("site.industriesPage.lede")}</p>
          </div>
        </div>
      </header>
      <Section tight>
        <ul className="ks-ilist">
          {INDUSTRIES.map((industry, index) => (
            <li key={industry.id} className="ks-tile ks-tile--plain ks-reveal" data-delay={index % 3}>
              <span className="ks-tile__ic"><IndustryGlyph icon={industry.icon} /></span>
              <h2 className="ks-tile__title">
                <Link href={`/for/${industry.slug}/`}>{t(`site.industries.${industry.id}.name`)}</Link>
              </h2>
              <p className="ks-tile__text">{t(`site.industries.${industry.id}.lede`)}</p>
              <div className="ks-tile__links">
                <Link href={`/for/${industry.slug}/`}>{t("site.industriesPage.learn")}</Link>
                <Link href={`/demo/${industry.demo}/`}>{t("site.industriesPage.demo")}</Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="industries" />
    </SiteLayout>
  );
}

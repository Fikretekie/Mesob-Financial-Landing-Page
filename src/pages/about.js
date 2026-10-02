import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Eyebrow, Section } from "@/components/site/ui";
import { CtaBand, LanguageStrip, TrustRow } from "@/components/site/sections";

export default function About() {
  const { t } = useTranslation();
  const story = t("site.about.story", { returnObjects: true });
  const values = t("site.about.values", { returnObjects: true });
  return (
    <SiteLayout title={t("site.about.metaTitle")} description={t("site.about.metaDescription")}>
      <header className="ks-pagehead">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-reveal">
            <Eyebrow>{t("site.about.eyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md ks-gap">
              {t("site.about.title")} <span className="ks-em ks-accent">{t("site.about.em")}</span>
            </h1>
            <p className="ks-lede">{t("site.about.lede")}</p>
          </div>
        </div>
      </header>
      <Section line>
        <div className="ks-split">
          <div className="ks-reveal">
            <h2 className="ks-h2 ks-h2--sm">{t("site.about.storyTitle")}</h2>
            <div className="ks-prose ks-gap">
              {Array.isArray(story) && story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="ks-reveal" data-delay="1">
            <h2 className="ks-h2 ks-h2--sm">{t("site.about.valuesTitle")}</h2>
            <div className="ks-values ks-gap">
              {Array.isArray(values) &&
                values.map((value) => (
                  <div key={value.title} className="ks-card ks-value">
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Section>
      <section className="ks-section--flush ks-pad-b">
        <LanguageStrip />
      </section>
      <Section line>
        <TrustRow />
      </Section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="about" />
    </SiteLayout>
  );
}

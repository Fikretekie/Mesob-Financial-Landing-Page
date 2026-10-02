import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Eyebrow, Section } from "@/components/site/ui";
import { CtaBand, Faq, PricingCard, Reviews, faqJsonLd } from "@/components/site/sections";

export default function Pricing() {
  const { t } = useTranslation();
  const faq = t("site.pricing.faq", { returnObjects: true });
  return (
    <SiteLayout title={t("site.pricing.metaTitle")} description={t("site.pricing.metaDescription")} jsonLd={faqJsonLd(faq)}>
      <header className="ks-pagehead">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-head--center ks-reveal">
            <Eyebrow>{t("site.pricing.eyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md ks-gap">{t("site.pricing.title")}</h1>
            <p className="ks-lede">{t("site.pricing.lede")}</p>
          </div>
        </div>
      </header>
      <section className="ks-section--flush">
        <div className="ks-wrap">
          <PricingCard source="pricing_page" />
        </div>
      </section>
      <Section labelledBy="faq-title">
        <div className="ks-head ks-reveal">
          <h2 className="ks-h2" id="faq-title">{t("site.pricing.faqTitle")}</h2>
        </div>
        <Faq items={faq} />
      </Section>
      <Section line labelledBy="reviews-title">
        <Reviews />
      </Section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="pricing_footer" />
    </SiteLayout>
  );
}

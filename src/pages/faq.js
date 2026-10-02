import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Eyebrow, Section } from "@/components/site/ui";
import { CtaBand, Faq, faqJsonLd } from "@/components/site/sections";

// All the common questions in one place (home + pricing).
export default function FaqPage() {
  const { t } = useTranslation();
  const general = t("site.home.faq", { returnObjects: true });
  const pricing = t("site.pricing.faq", { returnObjects: true });
  const all = [...(Array.isArray(general) ? general : []), ...(Array.isArray(pricing) ? pricing : [])];
  return (
    <SiteLayout title={t("site.faqPage.metaTitle")} description={t("site.faqPage.metaDescription")} jsonLd={faqJsonLd(all)}>
      <header className="ks-pagehead">
        <div className="ks-wrap ks-wrap--narrow">
          <div className="ks-head ks-rise">
            <Eyebrow>{t("site.home.faqEyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md ks-gap">{t("site.faqPage.title")}</h1>
          </div>
        </div>
      </header>
      <section className="ks-section--flush">
        <div className="ks-wrap ks-wrap--narrow">
          <Faq items={general} idPrefix="general" />
          <h2 className="ks-h2 ks-h2--sm ks-gap-xl">{t("site.pricing.faqTitle")}</h2>
          <Faq items={pricing} idPrefix="pricing" />
        </div>
      </section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="faq" />
    </SiteLayout>
  );
}

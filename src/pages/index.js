import Link from "next/link";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Arrow, Cta, Eyebrow, FeatureGlyph, IndustryGlyph, Section } from "@/components/site/ui";
import {
  AppPreview,
  CtaBand,
  Faq,
  LanguageStrip,
  PricingCard,
  ProductTour,
  ProofLine,
  Reviews,
  TrustRow,
  faqJsonLd,
} from "@/components/site/sections";
import { CONTACT, IFTA_SAMPLE, INDUSTRIES, PRICES, SITE_URL, SOCIALS } from "@/data/site";

const SIDE_FEATURES = ["sync", "ifta"];
const ROW_FEATURES = ["reports", "accountant", "multi"];

export default function Home() {
  const { t } = useTranslation();
  const steps = t("site.home.steps", { returnObjects: true });
  const faq = t("site.home.faq", { returnObjects: true });
  const tags = t("site.home.scanTags", { returnObjects: true });
  const [truck, ...rest] = INDUSTRIES;
  // Households and "other" are covered by the wide closing tile.
  const others = rest.filter((industry) => !["other", "households"].includes(industry.id));
  const maxMiles = Math.max(...IFTA_SAMPLE.map((row) => row.miles));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Meksova",
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      email: CONTACT.email,
      telephone: "+1-614-966-5005",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3130 Westerville Rd",
        addressLocality: "Columbus",
        addressRegion: "OH",
        postalCode: "43224",
        addressCountry: "US",
      },
      sameAs: SOCIALS.map((social) => social.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Meksova",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://app.meksova.com",
      offers: [
        { "@type": "Offer", price: PRICES.monthly.slice(1), priceCurrency: "USD", name: "Monthly" },
        { "@type": "Offer", price: PRICES.yearly.slice(1), priceCurrency: "USD", name: "Yearly" },
      ],
    },
    faqJsonLd(faq),
  ].filter(Boolean);

  return (
    <SiteLayout title={t("site.home.metaTitle")} description={t("site.home.metaDescription")} jsonLd={jsonLd}>
      {/* Hero */}
      <section className="ks-hero">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-orb ks-glow-b ks-hero__orb-b" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-hero__grid">
            <div className="ks-hero__copy">
              <div className="ks-rise">
                <Eyebrow>{t("site.home.eyebrow")}</Eyebrow>
              </div>
              <h1 className="ks-display ks-rise" data-delay="1">
                {t("site.home.titleA")} <span className="ks-em ks-accent">{t("site.home.titleEm")}</span> {t("site.home.titleB")}
              </h1>
              <p className="ks-lede ks-rise" data-delay="2">{t("site.home.lede")}</p>
              <div className="ks-actions ks-rise" data-delay="3">
                <Cta href="/demo/" track="hero_demo">{t("site.common.tryDemo")}</Cta>
                <Cta signup track="hero_trial" variant="ghost">{t("site.common.startTrial")}</Cta>
              </div>
              <div className="ks-rise" data-delay="3">
                <ProofLine />
              </div>
            </div>
            <AppPreview />
          </div>
        </div>
      </section>

      <LanguageStrip />

      {/* Industries */}
      <Section id="industries" labelledBy="industries-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.home.industriesEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="industries-title">{t("site.home.industriesTitle")}</h2>
          <p className="ks-lede">{t("site.home.industriesLede")}</p>
        </div>
        <div className="ks-bento">
          <Link href={`/for/${truck.slug}/`} className="ks-tile ks-tile--feature ks-reveal">
            <span className="ks-tile__ic"><IndustryGlyph icon={truck.icon} /></span>
            <span className="ks-tile__title">{t(`site.industries.${truck.id}.name`)}</span>
            <span className="ks-tile__text">{t("site.home.featuredText")}</span>
            <span className="ks-ifta-mini" aria-hidden>
              {IFTA_SAMPLE.slice(0, 4).map((row) => (
                <span key={row.state} className="ks-ifta-mini__row">
                  <span className="ks-mono">{row.state}</span>
                  <span className="ks-ifta-mini__bar"><i style={{ width: `${(row.miles / maxMiles) * 100}%` }} /></span>
                  <span className="ks-mono">{row.miles} mi</span>
                </span>
              ))}
            </span>
            <span className="ks-tile__go">
              {t("site.home.seePage", { name: t(`site.industries.${truck.id}.name`) })} <Arrow />
            </span>
          </Link>
          {others.map((industry, index) => (
            <Link key={industry.id} href={`/for/${industry.slug}/`} className="ks-tile ks-reveal" data-delay={index % 4}>
              <span className="ks-tile__ic"><IndustryGlyph icon={industry.icon} /></span>
              <span className="ks-tile__title">{t(`site.industries.${industry.id}.name`)}</span>
              <span className="ks-tile__text">{t(`site.industries.${industry.id}.short`)}</span>
            </Link>
          ))}
          <Link href="/industries/" className="ks-tile ks-tile--wide ks-reveal">
            <span className="ks-tile__ic"><IndustryGlyph icon="other" /></span>
            <span>
              <span className="ks-tile__title ks-block">{t("site.home.moreTitle")}</span>
              <span className="ks-tile__text">{t("site.home.moreText")}</span>
            </span>
            <span className="ks-tile__go">{t("site.common.allIndustries")} <Arrow /></span>
          </Link>
        </div>
      </Section>

      {/* How it works */}
      <Section line labelledBy="steps-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.home.stepsEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="steps-title">{t("site.home.stepsTitle")}</h2>
        </div>
        <ol className="ks-steps">
          {Array.isArray(steps) &&
            steps.map((step, index) => (
              <li key={step.title} className="ks-card ks-step ks-reveal" data-delay={index}>
                <span className="ks-step__n">0{index + 1}</span>
                <h3 className="ks-h3">{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
        </ol>
      </Section>

      {/* Real product screens */}
      <Section id="tour" line labelledBy="tour-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.tour.eyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="tour-title">{t("site.tour.title")}</h2>
          <p className="ks-lede">{t("site.tour.lede")}</p>
        </div>
        <ProductTour />
      </Section>

      {/* Features */}
      <Section id="features" line labelledBy="features-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.home.featuresEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="features-title">{t("site.home.featuresTitle")}</h2>
        </div>
        <div className="ks-feat">
          <div className="ks-feat__item ks-feat__item--lg ks-shell ks-reveal">
            <div className="ks-core ks-scan">
              <div className="ks-scan__copy">
                <p className="ks-kicker">{t("site.home.scanKicker")}</p>
                <h3 className="ks-h2 ks-h2--sm">{t("site.home.scanTitle")}</h3>
                <p>{t("site.home.scanText")}</p>
                <div className="ks-tagrow">
                  {Array.isArray(tags) &&
                    tags.map((tag, index) => (
                      <span key={tag} className={`ks-tag${index === 3 ? " ks-tag--ok" : ""}`}>{tag}</span>
                    ))}
                </div>
              </div>
              <div className="ks-receipt" aria-hidden>
                <span className="ks-receipt__scan" />
                <div className="ks-receipt__head">{t("site.home.receipt.store")}</div>
                <div className="ks-receipt__sub">{t("site.home.receipt.place")}</div>
                <div className="ks-receipt__rule" />
                <div className="ks-receipt__line"><span>{t("site.home.receipt.item")}</span><span>$372.84</span></div>
                <div className="ks-receipt__line"><span>@ $3.789</span><span /></div>
                <div className="ks-receipt__rule" />
                <div className="ks-receipt__line ks-receipt__total"><span>{t("site.home.receipt.total")}</span><span>$372.84</span></div>
              </div>
            </div>
          </div>
          {SIDE_FEATURES.map((id, index) => (
            <FeatureCard key={id} id={id} delay={index + 1} />
          ))}
          {ROW_FEATURES.map((id, index) => (
            <FeatureCard key={id} id={id} delay={index} />
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" line labelledBy="pricing-title">
        <div className="ks-head ks-head--center ks-reveal">
          <Eyebrow>{t("site.pricing.eyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="pricing-title">{t("site.pricing.title")}</h2>
          <p className="ks-lede">{t("site.pricing.lede")}</p>
        </div>
        <PricingCard source="home" />
      </Section>

      {/* Reviews + trust */}
      <Section line labelledBy="reviews-title">
        <Reviews />
        <TrustRow />
      </Section>

      {/* FAQ */}
      <Section line labelledBy="faq-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.home.faqEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="faq-title">{t("site.home.faqTitle")}</h2>
        </div>
        <Faq items={faq} />
      </Section>

      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="home_footer" />
    </SiteLayout>
  );
}

function FeatureCard({ id, delay }) {
  const { t } = useTranslation();
  return (
    <div className="ks-feat__item ks-card ks-reveal" data-delay={delay}>
      <div className="ks-feat__body">
        <span className="ks-feat__ic"><FeatureGlyph id={id} /></span>
        <h3 className="ks-h3">{t(`site.features.${id}.title`)}</h3>
        <p>{t(`site.features.${id}.text`)}</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Fuel } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import { Arrow, Cta, Eyebrow, FeatureGlyph, IndustryGlyph, Section, money } from "@/components/site/ui";
import { CtaBand, Faq, ProofLine, faqJsonLd } from "@/components/site/sections";
import { IFTA_SAMPLE, INDUSTRIES, PRICES, SITE_URL, getIndustry } from "@/data/site";
import { getDemoIndustry } from "@/data/demoIndustries";

export default function IndustryPage({ slug }) {
  const { t } = useTranslation();
  const industry = getIndustry(slug);
  const key = `site.industries.${industry.id}`;
  const name = t(`${key}.name`);
  const pains = t(`${key}.pains`, { returnObjects: true });
  const week = t(`${key}.week`, { returnObjects: true });
  const faq = t(`${key}.faq`, { returnObjects: true });
  const demoHref = `/demo/${industry.demo}/`;
  const others = INDUSTRIES.filter((item) => item.id !== industry.id);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Meksova", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: t("site.nav.industries"), item: `${SITE_URL}/industries/` },
        { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/for/${slug}/` },
      ],
    },
    faqJsonLd(faq),
  ].filter(Boolean);

  return (
    <SiteLayout title={t(`${key}.metaTitle`)} description={t(`${key}.metaDescription`)} jsonLd={jsonLd}>
      <section className="ks-hero">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <nav className="ks-crumbs ks-reveal" aria-label="Breadcrumb">
            <Link href="/">{t("site.common.home")}</Link>
            <span aria-hidden>/</span>
            <Link href="/industries/">{t("site.nav.industries")}</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{name}</span>
          </nav>
          <div className="ks-hero__grid">
            <div className="ks-hero__copy">
              <div className="ks-reveal">
                <Eyebrow>{t(`${key}.eyebrow`)}</Eyebrow>
              </div>
              <h1 className="ks-display ks-display--md ks-reveal" data-delay="1">
                {t(`${key}.title`)} <span className="ks-em ks-accent">{t(`${key}.em`)}</span>
              </h1>
              <p className="ks-lede ks-reveal" data-delay="2">{t(`${key}.lede`)}</p>
              <div className="ks-actions ks-reveal" data-delay="3">
                <Cta href={demoHref} track={`industry_${industry.id}_hero_demo`}>
                  {t("site.industryPage.openDemo", { name })}
                </Cta>
                <Cta signup industry={industry.demo} track={`industry_${industry.id}_hero_trial`} variant="ghost">
                  {t("site.common.startTrial")}
                </Cta>
              </div>
              <div className="ks-reveal" data-delay="3">
                <ProofLine />
              </div>
            </div>
            <IndustryPreview industry={industry} />
          </div>
        </div>
      </section>

      {/* Pain → fix */}
      <Section line labelledBy="pains-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.industryPage.painsEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="pains-title">{t("site.industryPage.painsTitle")}</h2>
        </div>
        <div className="ks-pains">
          {Array.isArray(pains) &&
            pains.map((pain, index) => (
              <div key={pain.title} className="ks-card ks-pain ks-reveal" data-delay={index}>
                <span className="ks-pain__was">{pain.was}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </div>
            ))}
        </div>
      </Section>

      {/* A week */}
      <Section line labelledBy="week-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.industryPage.weekEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="week-title">{t("site.industryPage.weekTitle")}</h2>
        </div>
        <ol className="ks-week">
          {Array.isArray(week) &&
            week.map((day, index) => (
              <li key={`${day.day}-${index}`} className="ks-card ks-week__day ks-reveal" data-delay={index}>
                <span className="ks-week__d">{day.day}</span>
                <h3>{day.title}</h3>
                <p>{day.text}</p>
              </li>
            ))}
        </ol>
      </Section>

      {/* Features */}
      <Section line labelledBy="features-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.industryPage.featuresEyebrow", { name })}</Eyebrow>
          <h2 className="ks-h2" id="features-title">{t("site.industryPage.featuresTitle")}</h2>
        </div>
        <div className="ks-flist">
          {industry.features.map((id, index) => (
            <div key={id} className="ks-card ks-fcell ks-reveal" data-delay={index % 4}>
              <span className="ks-feat__ic"><FeatureGlyph id={id} /></span>
              <h3>{t(`site.features.${id}.title`)}</h3>
              <p>{t(`site.features.${id}.text`)}</p>
            </div>
          ))}
        </div>

        <div className="ks-shell ks-reveal ks-gap-lg">
          <div className="ks-core ks-pricestrip">
            <div>
              <p className="ks-kicker">{t("site.pricing.stripTitle")}</p>
              <p className="ks-pricestrip__amt">
                <b>{PRICES.yearlyPerMonth}</b> <span className="ks-muted">{t("site.common.perMonth")}</span>
              </p>
              <p className="ks-faint ks-small">
                {t("site.common.billedYearly", { price: PRICES.yearly })} · {t("site.common.orMonthly", { price: PRICES.monthly })}
              </p>
            </div>
            <div className="ks-pricestrip__cta">
              <Cta signup industry={industry.demo} track={`industry_${industry.id}_price_trial`}>
                {t("site.common.startTrial")}
              </Cta>
              <Link className="ks-link" href="/pricing/">{t("site.nav.pricing")} <Arrow /></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section line labelledBy="faq-title">
        <div className="ks-head ks-reveal">
          <Eyebrow>{t("site.industryPage.faqEyebrow")}</Eyebrow>
          <h2 className="ks-h2" id="faq-title">{t("site.industryPage.faqTitle")}</h2>
        </div>
        <Faq items={faq} />
      </Section>

      <CtaBand
        title={t("site.industryPage.ctaTitle")}
        text={t("site.industryPage.ctaText", { name })}
        demoHref={demoHref}
        demoLabel={t("site.industryPage.openDemo", { name })}
        industry={industry.demo}
        source={`industry_${industry.id}_footer`}
      />

      {/* Cross-links help visitors and search engines find the other trades */}
      <Section line tight labelledBy="others-title">
        <h2 className="ks-kicker" id="others-title">{t("site.industryPage.otherIndustries")}</h2>
        <div className="ks-tagrow ks-gap">
          {others.map((item) => (
            <Link key={item.id} className="ks-tag ks-tag--link" href={`/for/${item.slug}/`}>
              {t(`site.industries.${item.id}.name`)}
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

function IndustryPreview({ industry }) {
  if (industry.preview === "ifta") return <IftaPreview />;
  if (industry.preview === "miles") return <MilesPreview />;
  return <BooksPreview industry={industry} />;
}

function IftaPreview() {
  const { t } = useTranslation();
  const miles = IFTA_SAMPLE.reduce((sum, row) => sum + row.miles, 0);
  const gallons = IFTA_SAMPLE.reduce((sum, row) => sum + (row.gallons ?? 0), 0);
  return (
    <div className="ks-hero__visual ks-reveal" data-delay="2">
      <div className="ks-shell">
        <div className="ks-core ks-app">
          <div className="ks-app__top">
            <div className="ks-app__biz">{t("site.industryPage.iftaTitle")}</div>
            <span className="ks-app__pill">{t("site.industryPage.iftaQuarter")}</span>
          </div>
          <table className="ks-table">
            <thead>
              <tr>
                <th scope="col">{t("site.industryPage.state")}</th>
                <th scope="col">{t("site.industryPage.miles")}</th>
                <th scope="col">{t("site.industryPage.gallons")}</th>
              </tr>
            </thead>
            <tbody>
              {IFTA_SAMPLE.map((row) => (
                <tr key={row.state}>
                  <td>{row.state}</td>
                  <td>{row.miles.toFixed(1)}</td>
                  <td>{row.gallons == null ? "—" : row.gallons.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>{t("site.industryPage.total")}</td>
                <td>{miles.toFixed(1)}</td>
                <td>{gallons.toFixed(1)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="ks-chip ks-chip--a" aria-hidden>
        <span className="ks-chip__ic"><Fuel strokeWidth={1.5} /></span>
        <span>{t("site.industryPage.fuelChip")}<small>$372.84 · 98.4 gal → IN</small></span>
      </div>
    </div>
  );
}

// Matches the rideshare demo's sample trips.
const TRIPS = [
  { miles: 112.3, business: true },
  { miles: 86.4, business: true },
  { miles: 12.1, business: false },
  { miles: 64.8, business: true },
];

function MilesPreview() {
  const { t } = useTranslation();
  const days = t("site.industryPage.days", { returnObjects: true });
  const business = TRIPS.filter((trip) => trip.business).reduce((sum, trip) => sum + trip.miles, 0);
  return (
    <div className="ks-hero__visual ks-reveal" data-delay="2">
      <div className="ks-shell">
        <div className="ks-core ks-app">
          <div className="ks-app__top">
            <div className="ks-app__biz">{t("site.industryPage.milesTitle")}</div>
            <span className="ks-app__pill">{t("site.common.sample")}</span>
          </div>
          <div className="ks-app__hero">
            <div className="ks-app__label">{t("site.industryPage.business")} · {t("site.industryPage.miles")}</div>
            <div className="ks-app__big">{business.toFixed(1)}</div>
          </div>
          <div className="ks-app__rows">
            {TRIPS.map((trip, index) => (
              <div key={index} className="ks-app__row">
                <span>
                  {Array.isArray(days) ? days[index] : ""} · {trip.business ? t("site.industryPage.business") : t("site.industryPage.personal")}
                </span>
                <span className="ks-app__amt">{trip.miles.toFixed(1)} mi</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BooksPreview({ industry }) {
  const { t } = useTranslation();
  const demo = getDemoIndustry(industry.demo);
  const labels = t(`site.industries.${industry.id}.preview`, { returnObjects: true });
  const samples = demo?.samples ?? [];
  const totalIn = samples.filter((s) => s.kind === "income").reduce((sum, s) => sum + s.amount, 0);
  const totalOut = samples.filter((s) => s.kind === "expense").reduce((sum, s) => sum + s.amount, 0);
  const owed = samples.filter((s) => s.kind === "payable").reduce((sum, s) => sum + s.amount, 0);
  const sign = { income: "+", expense: "−", payable: "" };
  const tone = { income: "ks-amt--in", expense: "", payable: "ks-amt--owed" };

  return (
    <div className="ks-hero__visual ks-reveal" data-delay="2">
      <div className="ks-shell">
        <div className="ks-core ks-app">
          <div className="ks-app__top">
            <div className="ks-app__biz">
              <span className="ks-app__logo"><IndustryGlyph icon={industry.icon} /></span>
              {t("site.industryPage.sampleBooks")}
            </div>
          </div>
          <div className="ks-app__kpis">
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.industryPage.in")}</span><b className="ks-amt--in">{money(totalIn)}</b></div>
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.industryPage.out")}</span><b>{money(totalOut)}</b></div>
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.industryPage.owed")}</span><b className="ks-amt--owed">{money(owed)}</b></div>
          </div>
          <div className="ks-app__rows">
            {samples.map((sample, index) => (
              <div key={`${sample.purpose}-${index}`} className="ks-app__row">
                <span>{Array.isArray(labels) && labels[index] ? labels[index] : sample.purpose}</span>
                <span className={`ks-app__amt ${tone[sample.kind]}`}>
                  {sign[sample.kind]}
                  {money(sample.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function getStaticPaths() {
  return {
    paths: INDUSTRIES.map(({ slug }) => ({ params: { industry: slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.industry } };
}

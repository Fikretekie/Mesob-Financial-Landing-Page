import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Check, Fuel, Mail, MapPin, Phone, ShieldCheck, Download, RefreshCw, Truck } from "lucide-react";
import { LANGUAGES } from "@/i18n/languages";
import { CONTACT, GOOGLE_REVIEWS, PRICES } from "@/data/site";
import { trackDemoEvent } from "@/utils/demoTracking";
import { Cta, Eyebrow, PlusIcon, Stars } from "./ui";
import { nativeName, pickLanguage } from "./SiteNav";

const S = 1.5;

/* ---------- Product preview (hero) -------------------------------------- */
export function AppPreview() {
  const { t } = useTranslation();
  return (
    <div className="ks-hero__visual ks-reveal" data-delay="2">
      <div className="ks-shell">
        <div className="ks-core ks-app">
          <div className="ks-app__top">
            <div className="ks-app__biz">
              <span className="ks-app__logo"><Truck strokeWidth={S} aria-hidden /></span>
              {t("site.preview.business")}
            </div>
            <span className="ks-app__pill">{t("site.preview.dashboard")}</span>
          </div>
          <div className="ks-app__hero">
            <div className="ks-app__label">{t("site.preview.cash")}</div>
            <div className="ks-app__big">$3,494.00</div>
            <div className="ks-app__split">
              <span>{t("site.preview.moneyIn")} <b className="ks-app__in">$5,490</b></span>
              <span>{t("site.preview.moneyOut")} <b>$2,646</b></span>
            </div>
            <svg className="ks-app__chart" viewBox="0 0 400 74" preserveAspectRatio="none" role="img" aria-label={t("site.preview.chartLabel")}>
              <defs>
                <linearGradient id="ks-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2563EB" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 62 L40 58 L80 60 L120 44 L160 47 L200 36 L240 39 L280 26 L320 30 L360 16 L400 10 L400 74 L0 74 Z" fill="url(#ks-area)" />
              <path d="M0 62 L40 58 L80 60 L120 44 L160 47 L200 36 L240 39 L280 26 L320 30 L360 16 L400 10" fill="none" stroke="#2563EB" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="ks-app__kpis">
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.preview.revenue")}</span><b>$5,490</b></div>
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.preview.payable")}</span><b className="ks-amt--owed">$650</b></div>
            <div className="ks-app__kpi"><span className="ks-app__label">{t("site.preview.tax")}</span><b>$853</b></div>
          </div>
        </div>
      </div>
      <div className="ks-chip ks-chip--a" aria-hidden>
        <span className="ks-chip__ic"><Fuel strokeWidth={S} /></span>
        <span>{t("site.preview.scanned")}<small>{t("site.preview.scannedText")}</small></span>
      </div>
      <div className="ks-chip ks-chip--b" aria-hidden>
        <span className="ks-chip__ic ks-chip__ic--blue"><RefreshCw strokeWidth={S} /></span>
        <span>{t("site.preview.synced")}<small>{t("site.preview.syncedText")}</small></span>
      </div>
    </div>
  );
}

/* ---------- Proof line under hero CTAs ---------------------------------- */
export function ProofLine() {
  const { t } = useTranslation();
  return (
    <p className="ks-proof">
      <a href={GOOGLE_REVIEWS.href} target="_blank" rel="noopener noreferrer">
        <span className="ks-proof__star" aria-hidden>★</span> {t("site.common.googleRating", { rating: GOOGLE_REVIEWS.rating })}
      </a>
      <span className="ks-proof__sep" aria-hidden>·</span>
      <span>{t("site.common.noCard")}</span>
      <span className="ks-proof__sep" aria-hidden>·</span>
      <span>{t("site.common.fromPrice", { price: PRICES.yearlyPerMonth })}</span>
    </p>
  );
}

/* ---------- Language strip ---------------------------------------------- */
export function LanguageStrip() {
  const { t, i18n } = useTranslation();
  return (
    <div className="ks-wrap ks-reveal">
      <p className="ks-kicker ks-center">{t("site.home.langTitle")}</p>
      <div className="ks-langs">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            className="ks-langs__btn"
            aria-pressed={lang.code === i18n.language}
            onClick={() => pickLanguage(lang.code)}
          >
            {nativeName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Pricing ----------------------------------------------------- */
export function PricingCard({ source = "pricing" }) {
  const { t } = useTranslation();
  const [yearly, setYearly] = useState(true);
  const items = t("site.pricing.items", { returnObjects: true });
  const choose = (next) => {
    setYearly(next);
    trackDemoEvent("site_plan_toggle", { cycle: next ? "yearly" : "monthly", source });
  };

  return (
    <div className="ks-shell ks-reveal">
      <div className="ks-core ks-price">
        <div className="ks-price__main">
          <p className="ks-kicker">{t("site.pricing.planName")}</p>
          <div className="ks-toggle ks-gap-sm" role="radiogroup" aria-label={t("site.pricing.planName")}>
            <button type="button" role="radio" aria-checked={!yearly} onClick={() => choose(false)}>
              {t("site.pricing.monthly")}
            </button>
            <button type="button" role="radio" aria-checked={yearly} onClick={() => choose(true)}>
              {t("site.pricing.yearly")} <span className="ks-save">{t("site.pricing.save")}</span>
            </button>
          </div>
          <div className="ks-price__amount" aria-live="polite">
            <b>{yearly ? PRICES.yearlyPerMonth : PRICES.monthly}</b>
            <span>{t("site.common.perMonth")}</span>
          </div>
          <p className="ks-price__note">
            {yearly ? (
              <>
                {t("site.common.billedYearly", { price: PRICES.yearly })}
                <span className="ks-faint"> · {t("site.common.orMonthly", { price: PRICES.monthly })}</span>
              </>
            ) : (
              t("site.common.billedMonthly")
            )}
          </p>
          <div className="ks-actions">
            <Cta signup track={`${source}_${yearly ? "yearly" : "monthly"}`} block>
              {t("site.common.startTrial")}
            </Cta>
          </div>
          <p className="ks-price__fine">{t("site.pricing.fine")}</p>
        </div>
        <div className="ks-price__side">
          <p className="ks-kicker">{t("site.pricing.includes")}</p>
          <ul className="ks-checks ks-checks--2 ks-gap">
            {Array.isArray(items) &&
              items.map((item) => (
                <li key={item}>
                  <Check strokeWidth={2} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reviews ----------------------------------------------------- */
export function Reviews() {
  const { t } = useTranslation();
  const reviews = t("site.home.reviews", { returnObjects: true });
  const starsLabel = t("site.common.googleRating", { rating: "5" });
  return (
    <>
      <div className="ks-head ks-reveal">
        <Eyebrow>{t("site.home.reviewsEyebrow")}</Eyebrow>
        <h2 className="ks-h2" id="reviews-title">{t("site.home.reviewsTitle", { rating: GOOGLE_REVIEWS.rating })}</h2>
        <div className="ks-rating">
          <span className="ks-rating__num">{GOOGLE_REVIEWS.rating}</span>
          <span>
            <Stars label={t("site.common.googleRating", { rating: GOOGLE_REVIEWS.rating })} />
            <span className="ks-rating__count">
              {t("site.home.reviewsCount", { count: GOOGLE_REVIEWS.count })}
            </span>
          </span>
          <a className="ks-btn ks-btn--ghost ks-btn--sm" href={GOOGLE_REVIEWS.href} target="_blank" rel="noopener noreferrer">
            {t("site.common.seeReviews")}
          </a>
        </div>
      </div>
      <div className="ks-reviews">
        {Array.isArray(reviews) &&
          reviews.map((review, index) => (
            <figure key={review.name} className={`ks-card ks-review ks-reveal${index === 0 ? " ks-review--lg" : ""}`} data-delay={index}>
              <Stars label={starsLabel} />
              <blockquote>“{review.quote}”</blockquote>
              <figcaption className="ks-review__who">
                <span className="ks-avatar" aria-hidden>{review.name.charAt(0)}</span>
                <span>
                  <span className="ks-review__name">{review.name}</span>
                  <span className="ks-review__meta">
                    {review.role} · {t("site.home.reviewSource")}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
      </div>
    </>
  );
}

/* ---------- Trust row --------------------------------------------------- */
export function TrustRow() {
  const { t } = useTranslation();
  const items = t("site.home.trust", { returnObjects: true, phone: CONTACT.phone, email: CONTACT.email });
  const icons = [Download, ShieldCheck, MapPin];
  return (
    <div className="ks-trust">
      {Array.isArray(items) &&
        items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.title} className="ks-card ks-trust__item ks-reveal" data-delay={index}>
              <span className="ks-feat__ic"><Icon strokeWidth={S} aria-hidden /></span>
              <div>
                <h3>{item.title}</h3>
                {index === 2 ? (
                  <p>
                    <a href={CONTACT.phoneHref} dir="ltr">{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </p>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

/* ---------- FAQ (also emits FAQPage structured data via faqJsonLd) ------- */
export function Faq({ items, idPrefix = "faq" }) {
  if (!Array.isArray(items)) return null;
  return (
    <div className="ks-faq ks-reveal">
      {items.map((item, index) => (
        <details key={`${idPrefix}-${index}`} open={index === 0}>
          <summary>
            {item.q}
            <span className="ks-faq__plus" aria-hidden><PlusIcon /></span>
          </summary>
          <p className="ks-faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items) =>
  Array.isArray(items) && items.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

/* ---------- Closing call to action -------------------------------------- */
export function CtaBand({ title, text, demoHref = "/demo/", demoLabel, industry, source = "cta" }) {
  const { t } = useTranslation();
  return (
    <section className="ks-section ks-section--tight">
      <div className="ks-wrap">
        <div className="ks-shell ks-reveal">
          <div className="ks-core ks-cta">
            <div className="ks-orb ks-glow-a ks-cta__orb" aria-hidden />
            <div className="ks-cta__body">
              <h2 className="ks-h2">{title}</h2>
              <p className="ks-lede">{text}</p>
              <div className="ks-actions">
                <Cta href={demoHref} track={`${source}_demo`}>{demoLabel ?? t("site.common.tryDemo")}</Cta>
                <Cta signup industry={industry} track={`${source}_trial`} variant="ghost">
                  {t("site.common.startTrialShort")}
                </Cta>
              </div>
              <ProofLineCentered />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofLineCentered() {
  return (
    <div className="ks-cta__proof">
      <ProofLine />
    </div>
  );
}

export function ContactLinks() {
  return (
    <>
      <a href={CONTACT.phoneHref} dir="ltr"><Phone strokeWidth={S} aria-hidden /> {CONTACT.phone}</a>
      <a href={`mailto:${CONTACT.email}`}><Mail strokeWidth={S} aria-hidden /> {CONTACT.email}</a>
    </>
  );
}

export { Link };

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import { Eyebrow } from "@/components/site/ui";
import { CONTACT, GOOGLE_REVIEWS, INDUSTRIES } from "@/data/site";
import { trackDemoEvent } from "@/utils/demoTracking";

const S = 1.5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// There is no form backend on the static site, so the form builds an email in
// the visitor's own mail app instead of pretending to send.
export default function Contact() {
  const { t } = useTranslation();
  const [values, setValues] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = t("site.contact.required");
    if (!EMAIL_RE.test(values.email.trim())) next.email = t("site.contact.invalidEmail");
    if (!values.message.trim()) next.message = t("site.contact.required");
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`c-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    const business = INDUSTRIES.find((item) => item.id === values.business);
    const body = [
      values.message.trim(),
      "",
      `— ${values.name.trim()}`,
      values.email.trim(),
      values.phone.trim(),
      business ? t(`site.industries.${business.id}.name`) : "",
    ]
      .filter((line, index) => index < 3 || line)
      .join("\n");
    trackDemoEvent("site_contact", { business: values.business || "none" });
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      t("site.contact.subject", { name: values.name.trim() })
    )}&body=${encodeURIComponent(body)}`;
  };

  const ways = [
    { icon: Phone, title: t("site.contact.call"), text: CONTACT.phone, href: CONTACT.phoneHref, ltr: true },
    { icon: Mail, title: t("site.contact.email"), text: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, title: t("site.contact.visit"), text: CONTACT.address, href: CONTACT.mapsHref, external: true },
    {
      icon: Star,
      title: t("site.contact.reviews"),
      text: t("site.common.googleRating", { rating: GOOGLE_REVIEWS.rating }),
      href: GOOGLE_REVIEWS.href,
      external: true,
    },
  ];

  return (
    <SiteLayout title={t("site.contact.metaTitle")} description={t("site.contact.metaDescription")}>
      <header className="ks-pagehead">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-rise">
            <Eyebrow>{t("site.contact.eyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md">{t("site.contact.title")}</h1>
            <p className="ks-lede">{t("site.contact.lede")}</p>
          </div>
        </div>
      </header>
      <section className="ks-section--flush">
        <div className="ks-wrap ks-contact">
          <div className="ks-contact__ways">
            {ways.map(({ icon: Icon, title, text, href, ltr, external }, index) => (
              <a
                key={title}
                className="ks-card ks-way ks-reveal"
                data-delay={index}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="ks-feat__ic"><Icon strokeWidth={S} aria-hidden /></span>
                <div>
                  <h2>{title}</h2>
                  <p dir={ltr ? "ltr" : undefined}>{text}</p>
                </div>
              </a>
            ))}
          </div>

          <form className="ks-shell ks-reveal" data-delay="1" onSubmit={submit} noValidate>
            <div className="ks-core ks-form">
              <h2 className="ks-h3">{t("site.contact.formTitle")}</h2>
              <div className="ks-form__row">
                <Field id="c-name" label={t("site.contact.name")} error={errors.name}>
                  <input id="c-name" autoComplete="name" value={values.name} onChange={update("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
                </Field>
                <Field id="c-email" label={t("site.contact.emailField")} error={errors.email}>
                  <input id="c-email" type="email" autoComplete="email" value={values.email} onChange={update("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} />
                </Field>
              </div>
              <div className="ks-form__row">
                <Field id="c-phone" label={t("site.contact.phoneField")}>
                  <input id="c-phone" type="tel" autoComplete="tel" value={values.phone} onChange={update("phone")} />
                </Field>
                <Field id="c-business" label={t("site.contact.business")}>
                  <select id="c-business" value={values.business} onChange={update("business")}>
                    <option value="">{t("site.contact.businessPick")}</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry.id} value={industry.id}>{t(`site.industries.${industry.id}.name`)}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field id="c-message" label={t("site.contact.message")} error={errors.message}>
                <textarea id="c-message" value={values.message} onChange={update("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} />
              </Field>
              <button type="submit" className="ks-btn ks-btn--primary ks-btn--block">{t("site.contact.send")}</button>
              <p className="ks-form__note">{t("site.contact.formNote")}</p>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className="ks-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="ks-field__err" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

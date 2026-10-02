import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CONTACT, INDUSTRIES, SOCIALS } from "@/data/site";
import { Brand } from "./ui";

const SOCIAL_PATHS = {
  facebook: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8Z",
  instagram: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-1.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  tiktok: "M15.5 3c.3 2.3 1.7 3.8 4 4v3.2c-1.5 0-2.8-.4-4-1.2v6.2A5.8 5.8 0 1 1 9.7 9.4v3.3a2.6 2.6 0 1 0 2.6 2.6V3h3.2Z",
};

export default function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const footerIndustries = INDUSTRIES.slice(0, 6);

  return (
    <footer className="ks-footer">
      <div className="ks-wrap">
        <div className="ks-footer__grid">
          <div className="ks-footer__about">
            <Link href="/" className="ks-brand" aria-label={t("site.nav.home")}>
              <Brand />
            </Link>
            <p>{t("site.footer.tagline")}</p>
            <div className="ks-socials">
              {SOCIALS.map((social) => (
                <a key={social.id} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={SOCIAL_PATHS[social.id]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2>{t("site.footer.product")}</h2>
            <ul>
              <li><Link href="/demo/">{t("site.footer.demo")}</Link></li>
              <li><Link href="/pricing/">{t("site.nav.pricing")}</Link></li>
              <li><Link href="/#features">{t("site.nav.features")}</Link></li>
              <li><Link href="/blog/">{t("site.nav.blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t("site.nav.industries")}</h2>
            <ul>
              {footerIndustries.map((industry) => (
                <li key={industry.id}>
                  <Link href={`/for/${industry.slug}/`}>{t(`site.industries.${industry.id}.name`)}</Link>
                </li>
              ))}
              <li><Link href="/industries/">{t("site.common.allIndustries")}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t("site.footer.company")}</h2>
            <ul>
              <li><Link href="/about/">{t("site.nav.about")}</Link></li>
              <li><Link href="/contact/">{t("site.nav.contact")}</Link></li>
              <li><a href={CONTACT.phoneHref} dir="ltr">{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><Link href="/privacy-policy/">{t("site.footer.privacy")}</Link></li>
              <li><Link href="/terms-of-use/">{t("site.footer.terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="ks-footer__bottom">
          <span>{t("site.footer.rights", { year })}</span>
          <span>{CONTACT.address}</span>
        </div>
      </div>
    </footer>
  );
}

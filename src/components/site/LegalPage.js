import { useTranslation } from "react-i18next";
import SiteLayout from "./SiteLayout";

// Privacy and terms. The wording comes unchanged from legal.<namespace> in the
// shared locale files; only the presentation is new.
export default function LegalPage({ namespace }) {
  const { t } = useTranslation();
  const base = `legal.${namespace}`;
  const sections = t(`${base}.sections`, { returnObjects: true });

  return (
    <SiteLayout title={t(`${base}.metaTitle`)} description={t(`${base}.intro`).slice(0, 155)}>
      <header className="ks-pagehead">
        <div className="ks-wrap ks-wrap--narrow">
          <h1 className="ks-display ks-display--sm">{t(`${base}.title`)}</h1>
          <p className="ks-article__meta">{t(`${base}.effectiveDate`)}</p>
        </div>
      </header>
      <div className="ks-wrap ks-wrap--narrow ks-pad-b">
        <div className="ks-prose">
          <p>{t(`${base}.intro`)}</p>
          {Array.isArray(sections) &&
            sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          <p className="ks-prewrap">{t(`${base}.contactBlock`)}</p>
        </div>
      </div>
    </SiteLayout>
  );
}

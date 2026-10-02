import Link from "next/link";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Arrow, Cta, Eyebrow } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { SITE_URL } from "@/data/site";
import { POSTS, formatDate, getPost } from "@/data/blogPosts";

function Block({ block }) {
  if (block.h2) return <h2>{block.h2}</h2>;
  if (block.p) return <p>{block.p}</p>;
  if (block.ul) return <ul>{block.ul.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.ol) return <ol>{block.ol.map((item) => <li key={item}>{item}</li>)}</ol>;
  if (block.callout) return <p className="ks-callout">{block.callout}</p>;
  if (block.table) {
    return (
      <div className="ks-tablewrap">
        <table className="ks-table">
          <thead>
            <tr>{block.table.head.map((cell, index) => <th key={index} scope="col">{cell}</th>)}</tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function BlogPost({ slug }) {
  const { t, i18n } = useTranslation();
  const post = getPost(slug);
  const url = `${SITE_URL}/blog/${slug}/`;
  const others = POSTS.filter((item) => item.slug !== slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Meksova" },
    publisher: { "@type": "Organization", name: "Meksova", logo: { "@type": "ImageObject", url: `${SITE_URL}/android-chrome-512x512.png` } },
  };

  return (
    <SiteLayout title={`${post.title} — Meksova`} description={post.description} jsonLd={jsonLd}>
      <article lang="en">
        <header className="ks-pagehead">
          <div className="ks-wrap ks-wrap--narrow">
            <nav className="ks-crumbs" aria-label="Breadcrumb">
              <Link href="/blog/">{t("site.blog.back")}</Link>
            </nav>
            <Eyebrow>{t("site.blog.eyebrow")}</Eyebrow>
            {i18n.language !== "en" && (
              <p className="ks-notice" lang={i18n.language}>{t("site.blog.englishOnly")}</p>
            )}
            <h1 className="ks-display ks-display--sm">{post.title}</h1>
            <p className="ks-lede">{post.description}</p>
            <p className="ks-article__meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{t("site.common.minRead", { count: post.minutes })}</span>
              <span>Meksova</span>
            </p>
          </div>
        </header>
        <div className="ks-wrap ks-wrap--narrow ks-pad-b">
          <div className="ks-prose">
            {post.body.map((block, index) => <Block key={index} block={block} />)}
          </div>
          <p className="ks-disclaimer">{t("site.blog.disclaimer")}</p>
          <div className="ks-actions">
            <Cta href={`/demo/${post.demo}/`} track={`blog_${slug}_demo`}>{t("site.common.tryDemo")}</Cta>
            <Link className="ks-link" href={`/for/${post.industry}/`}>{t("site.blog.related")} <Arrow /></Link>
          </div>
        </div>
      </article>
      <section className="ks-section ks-section--line ks-section--tight">
        <div className="ks-wrap ks-wrap--narrow">
          <h2 className="ks-kicker">{t("site.blog.back")}</h2>
          <ul className="ks-posts ks-posts--2 ks-gap">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}/`} className="ks-card ks-post ks-tile" lang="en">
                  <h3>{item.title}</h3>
                  <span className="ks-tile__go">{t("site.common.readGuide")} <Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source={`blog_${slug}`} />
    </SiteLayout>
  );
}

export function getStaticPaths() {
  return { paths: POSTS.map(({ slug }) => ({ params: { slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

import Link from "next/link";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/site/SiteLayout";
import { Arrow, Eyebrow, Section } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { POSTS, formatDate } from "@/data/blogPosts";

export default function Blog() {
  const { t } = useTranslation();
  return (
    <SiteLayout title={t("site.blog.metaTitle")} description={t("site.blog.metaDescription")}>
      <header className="ks-pagehead">
        <div className="ks-orb ks-glow-a ks-hero__orb-a" aria-hidden />
        <div className="ks-wrap">
          <div className="ks-head ks-rise">
            <Eyebrow>{t("site.blog.eyebrow")}</Eyebrow>
            <h1 className="ks-display ks-display--md">{t("site.blog.title")}</h1>
            <p className="ks-lede">{t("site.blog.lede")}</p>
          </div>
        </div>
      </header>
      <Section tight>
        <ul className="ks-posts">
          {POSTS.map((post, index) => (
            <li key={post.slug} className="ks-reveal" data-delay={index}>
              <Link href={`/blog/${post.slug}/`} className="ks-card ks-post ks-tile" lang="en">
                <span className="ks-post__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{t("site.common.minRead", { count: post.minutes })}</span>
                </span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <span className="ks-tile__go">{t("site.common.readGuide")} <Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title={t("site.home.ctaTitle")} text={t("site.home.ctaText")} source="blog" />
    </SiteLayout>
  );
}

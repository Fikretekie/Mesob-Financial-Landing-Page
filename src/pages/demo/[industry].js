import '@/i18n'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import DemoApp from '@/components/demo/DemoApp'
import { useIndustryCopy } from '@/components/demo/IndustryIntro'
import { DEMO_INDUSTRIES, getDemoIndustry } from '@/data/demoIndustries'

const SITE_URL = 'https://meksova.com'

export default function IndustryDemoPage({ slug }) {
  const { t } = useTranslation()
  const industry = getDemoIndustry(slug)
  const { title, text } = useIndustryCopy(industry.localeId)
  const pageTitle = t('demo.industry.metaTitle', { industry: title })
  const url = `${SITE_URL}/demo/${slug}/`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={text} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={text} />
        <meta property="og:image" content={`${SITE_URL}/android-chrome-512x512.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={text} />
      </Head>
      <DemoApp key={slug} industry={industry} />
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: DEMO_INDUSTRIES.map(({ slug }) => ({ params: { industry: slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  return { props: { slug: params.industry } }
}

import '@/i18n'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import headerData from '@/data/headerData'
import { DemoLanguageSwitcher } from '@/components/demo/DemoLanguageSwitcher'
import { useIndustryCopy } from '@/components/demo/IndustryIntro'
import { DEMO_INDUSTRIES } from '@/data/demoIndustries'
import { IndustryIcon } from '@/components/demo/IndustryIcon'
import { captureAttribution, trackDemoEvent } from '@/utils/demoTracking'

const { logo } = headerData

function IndustryCard({ industry }) {
  const { t } = useTranslation()
  const { title, text } = useIndustryCopy(industry.localeId)

  return (
    <li>
      <Link
        href={`/demo/${industry.slug}/`}
        onClick={() => trackDemoEvent('demo_industry_select', { industry: industry.slug })}
        className="mk-card demo-picker__card"
      >
        <span className="mk-chip" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
          <IndustryIcon slug={industry.slug} />
        </span>
        <span className="demo-picker__name">{title}</span>
        {text && <span className="demo-picker__text">{text}</span>}
        <span className="demo-picker__open">{t('demo.picker.open')} →</span>
      </Link>
    </li>
  )
}

export default function DemoPickerPage() {
  const { t } = useTranslation()

  useEffect(() => {
    captureAttribution()
    trackDemoEvent('demo_picker_view')
  }, [])

  return (
    <>
      <Head>
        <title>{t('demo.picker.metaTitle')}</title>
        <meta name="description" content={t('demo.picker.subtitle')} />
        <link rel="canonical" href="https://meksova.com/demo/" />
      </Head>

      <div className="demo-picker">
        <header className="demo-picker__bar">
          <Link href="/" aria-label="Meksova home" style={{ display: 'flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="Meksova" width={132} style={{ height: 'auto' }} />
          </Link>
          <DemoLanguageSwitcher />
        </header>

        <main className="demo-picker__main">
          <span className="mk-eyebrow">{t('demo.industry.eyebrow')}</span>
          <h1 className="dash-overview__title" style={{ marginTop: 10 }}>{t('demo.picker.title')}</h1>
          <p className="dash-overview__sub" style={{ maxWidth: 640 }}>{t('demo.picker.subtitle')}</p>

          <ul className="demo-picker__grid">
            {DEMO_INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </ul>
        </main>
      </div>
    </>
  )
}

'use client'

import { STORAGE_KEY } from '@/i18n/languages'
import { getLanguage, LANGUAGES } from '@/i18n/languages'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Language pill styled like the app navbar's .language-toggle.
export function DemoLanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = getLanguage(i18n.language)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Storage blocked — the language still switches for this visit.
    }
    setOpen(false)
  }

  return (
    <div className="dm-lang" ref={ref}>
      <button
        type="button"
        className="dm-lang__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="dm-lang__code" aria-hidden>{current.code.toUpperCase()}</span>
        <span>{current.nativeLabel}</span>
        <span className="dm-lang__caret" aria-hidden>▾</span>
      </button>
      {open && (
        <ul className="dm-lang__menu" role="listbox" aria-label="Languages">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === i18n.language}>
              <button
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`dm-lang__item${lang.code === i18n.language ? ' is-active' : ''}`}
              >
                <span className="dm-lang__code" aria-hidden>{lang.code.toUpperCase()}</span>
                <span>{lang.nativeLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

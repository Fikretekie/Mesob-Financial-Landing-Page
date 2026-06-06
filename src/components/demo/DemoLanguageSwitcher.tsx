'use client'

import { STORAGE_KEY } from '@/i18n/languages'
import { getLanguage, LANGUAGES } from '@/i18n/languages'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function DemoLanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = getLanguage(i18n.language)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code)
    }
    setOpen(false)
  }

  return (
    <div className="relative w-fit flex-shrink-0" data-demo-lang-switcher ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        className={`inline-flex items-center gap-1.5 md:gap-2 h-9 px-2 md:px-3 rounded-lg border-0 text-xs md:text-sm font-semibold text-white transition-colors ${
          open
            ? 'bg-[#1859b5]'
            : 'bg-[#1d6bd4] hover:bg-[#1859b5]'
        }`}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden sm:inline uppercase tracking-wide">{current.nativeLabel}</span>
        <span
          className={`text-[10px] opacity-80 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open && (
        <ul
          data-demo-lang-menu
          className="absolute left-0 lg:left-auto lg:right-0 top-[calc(100%+6px)] z-[200] min-w-[200px] w-max m-0 p-1.5 list-none bg-[#1a2332] border border-slate-600/80 rounded-lg shadow-xl shadow-black/40"
          role="listbox"
          aria-label="Languages"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === i18n.language}>
              <button
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  lang.code === i18n.language
                    ? 'bg-[#1d6bd4]/30 text-white'
                    : 'text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {lang.flag}
                </span>
                <span>{lang.nativeLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

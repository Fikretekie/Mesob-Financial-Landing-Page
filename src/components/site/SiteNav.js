import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Globe, Moon, Sun } from "lucide-react";
import { changeLanguage } from "@/i18n";
import { LANGUAGES } from "@/i18n/languages";
import { LOGIN_URL, NAV } from "@/data/site";
import { trackDemoEvent } from "@/utils/demoTracking";
import { Brand, Cta } from "./ui";

const THEME_KEY = "meksova-theme";

function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode — the choice just won't persist.
    }
    setTheme(next);
  };
  return [theme, toggle];
}

export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, toggle] = useTheme();
  const label = theme === "light" ? t("site.nav.themeToDark") : t("site.nav.themeToLight");
  return (
    <button type="button" className="ks-iconbtn ks-theme" onClick={toggle} aria-label={label} title={label}>
      {theme === "light" ? <Moon strokeWidth={1.5} aria-hidden /> : <Sun strokeWidth={1.5} aria-hidden />}
    </button>
  );
}

export function pickLanguage(code) {
  changeLanguage(code);
  trackDemoEvent("site_language", { language: code });
}

function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((lang) => lang.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "mousedown" && ref.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div className="ks-lang" ref={ref}>
      <button
        type="button"
        className="ks-lang__btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("site.nav.language")}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe strokeWidth={1.5} aria-hidden />
        <span>{current.code.toUpperCase()}</span>
      </button>
      {open && (
        <div className="ks-lang__menu" role="menu">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="menuitemradio"
              aria-checked={lang.code === current.code}
              className="ks-lang__opt"
              lang={lang.code}
              onClick={() => {
                pickLanguage(lang.code);
                setOpen(false);
              }}
            >
              <span>{nativeName(lang)}</span>
              <span>{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// The shared language list stores some native names in capitals; show them
// in normal case on the site.
export const nativeName = (lang) =>
  ({ en: "English", es: "Español", fr: "Français", so: "Soomaali" }[lang.code] ?? lang.nativeLabel);

export default function SiteNav() {
  const { t, i18n } = useTranslation();
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const path = asPath.split(/[?#]/)[0];

  useEffect(() => {
    setOpen(false);
  }, [asPath]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href) => href !== "/" && !href.includes("#") && path.startsWith(href);

  return (
    <>
      <header className="ks-nav">
        <nav className="ks-nav__bar" aria-label="Main">
          <Link href="/" className="ks-brand" aria-label={t("site.nav.home")}>
            <Brand />
          </Link>
          <div className="ks-nav__links">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="ks-nav__link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {t(`site.nav.${item.key}`)}
              </Link>
            ))}
          </div>
          <div className="ks-nav__tools">
            <LanguageMenu />
            <ThemeToggle />
            <a className="ks-nav__login" href={LOGIN_URL}>{t("site.nav.login")}</a>
            <Cta
              className="ks-nav__trial"
              size="sm"
              signup
              track="nav"
              knob={false}
            >
              {t("site.nav.trial")}
            </Cta>
            <button
              ref={burgerRef}
              type="button"
              className="ks-iconbtn ks-burger"
              aria-expanded={open}
              aria-controls="ks-menu"
              aria-label={open ? t("site.nav.close") : t("site.nav.menu")}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div id="ks-menu" className={`ks-menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={open ? undefined : ""}>
        <nav className="ks-menu__links" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} onClick={() => setOpen(false)}>
              {t(`site.nav.${item.key}`)}
            </Link>
          ))}
          <Link href="/contact/" onClick={() => setOpen(false)}>{t("site.nav.contact")}</Link>
        </nav>
        <div>
          <p className="ks-kicker ks-menu__label">{t("site.nav.language")}</p>
          <div className="ks-menu__langs">
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
        <div className="ks-menu__cta">
          <Cta signup track="mobile_menu" block>{t("site.common.startTrial")}</Cta>
          <a className="ks-btn ks-btn--ghost ks-btn--block" href={LOGIN_URL}>{t("site.nav.login")}</a>
          <div className="ks-menu__theme">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

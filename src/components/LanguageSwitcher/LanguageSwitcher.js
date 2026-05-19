import { changeLanguage } from "@/i18n";
import { getLanguage, LANGUAGES } from "@/i18n/languages";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./languageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = getLanguage(i18n.language);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className={styles.flag} aria-hidden>
          {current.flag}
        </span>
        <span className={styles.label}>{current.nativeLabel}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`} aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Languages">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === i18n.language}>
              <button
                type="button"
                className={`${styles.option} ${
                  lang.code === i18n.language ? styles.optionActive : ""
                }`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className={styles.flag} aria-hidden>
                  {lang.flag}
                </span>
                <span>{lang.nativeLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;

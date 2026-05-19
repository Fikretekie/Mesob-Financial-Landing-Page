import { useRootContext } from "@/context/context";
import React from "react";
import { useTranslation } from "react-i18next";

const SearchPopup = () => {
  const { t } = useTranslation();
  const { openSearch, toggleSearch } = useRootContext();

  const handleToggleSearch = () => {
    toggleSearch();
    document.body.classList.toggle("locked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("search"));
    handleToggleSearch();
  };

  return (
    <div className={`search-popup${openSearch ? " active" : ""}`}>
      <div
        onClick={handleToggleSearch}
        className="search-popup__overlay search-toggler"
      ></div>
      <div className="search-popup__content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="sr-only">
            {t("search.label")}
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder={t("search.placeholder")}
            required
          />
          <button type="submit" aria-label={t("search.submitAria")} className="thm-btn">
            <i className="icon-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPopup;

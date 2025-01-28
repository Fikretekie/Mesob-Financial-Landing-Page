import { useRootContext } from "@/context/context";
import React from "react";

const SearchPopup = () => {
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
            search here
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Here..."
            required
          />
          <button type="submit" aria-label="search submit" className="thm-btn">
            <i className="icon-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPopup;

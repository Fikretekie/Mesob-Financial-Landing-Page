import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useRootContext } from "@/context/context";
import headerData from "@/data/headerData";
import useScroll from "@/hooks/useScroll";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Button } from "react-bootstrap";
import Link from "../Reuseable/Link";
import MenuList from "./MenuList";

const { logo, navItems: items, loginButton, signupButton } = headerData;

const Header = ({ mainMenuClass = "", navItems = items, onePage = false }) => {
  const { t } = useTranslation();
  const { scrollTop } = useScroll(100);
  const { toggleMenu, toggleSearch } = useRootContext();

  const translatedNavItems = navItems.map((item) => {
    const keyMap = { Home: "home", Services: "services", About: "about", Contact: "contact" };
    const navKey = keyMap[item.name];
    return navKey
      ? { ...item, name: t(`header.nav.${navKey}`) }
      : item;
  });

  const handleToggleSearch = () => {
    toggleSearch();
    toggleMenu(false);
    document.body.classList.toggle("locked");
  };

  const handleToggleMenu = () => {
    document.body.classList.toggle("locked");
    toggleMenu();
  };
  const handleLogin = () => {
    window.location.href = loginButton.href;
  };

  const handleSignup = () => {
    window.location.href = signupButton.href;
  };
  return (
    <header className="main-header clearfix">
      <nav
        className={`${
          scrollTop
            ? "stricky-header stricked-menu stricky-fixed slideInDown"
            : "slideIn"
        } main-menu ${mainMenuClass} animated clearfix`}
      >
        <div
          className={`main-menu-wrapper clearfix${
            scrollTop ? " sticky-header__content" : ""
          }`}
        >
          <div className="main-menu-wrapper__left">
            <div className="main-menu-wrapper__logo">
              <Link href="/">
                <Image src={logo.src} alt="" />
              </Link>
            </div>
            <div className="main-menu-wrapper__main-menu">
              <a onClick={handleToggleMenu} className="mobile-nav__toggler">
                <i className="fa fa-bars"></i>
              </a>
              <MenuList navItems={translatedNavItems} onePage={onePage} />
            </div>
          </div>
          <div className="main-menu-wrapper__right">
            <div className="main-menu-wrapper__search-cat">
              <a
                onClick={handleToggleSearch}
                className="main-menu-wrapper__search search-toggler icon-magnifying-glass cursor-pointer"
              ></a>
            </div>
            <div className="main-menu-wrapper__login" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <LanguageSwitcher />
              <a
                href={loginButton.href}
                onClick={(e) => { e.preventDefault(); handleLogin(); }}
                style={{
                  color: "#ffffff",
                  fontWeight: "500",
                  fontSize: "15px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => e.target.style.color = "#1D6BD4"}
                onMouseOut={(e) => e.target.style.color = "#ffffff"}
              >
                {t("header.login")}
              </a>
              <Button
                onClick={handleSignup}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#1D6BD4",
                  color: "white",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "15px",
                  transition: "background-color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#1558b0"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#1D6BD4"}
              >
                {t("header.signup")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

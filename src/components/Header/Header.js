import { useRootContext } from "@/context/context";
import headerData from "@/data/headerData";
import useScroll from "@/hooks/useScroll";
import React from "react";
import { Image, Button } from "react-bootstrap";
import Link from "../Reuseable/Link";
import MenuList from "./MenuList";

const { logo, navItems: items, loginButton } = headerData;

const Header = ({ mainMenuClass = "", navItems = items, onePage = false }) => {
  const { scrollTop } = useScroll(100);
  const { toggleMenu, toggleSearch } = useRootContext();

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
  return (
    <header className="main-header clearfix">
      <nav
        className={`${scrollTop
          ? "stricky-header stricked-menu stricky-fixed slideInDown"
          : "slideIn"
          } main-menu ${mainMenuClass} animated clearfix`}
      >
        <div
          className={`main-menu-wrapper clearfix${scrollTop ? " sticky-header__content" : ""
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
              <MenuList navItems={navItems} onePage={onePage} />
            </div>
          </div>
          <div className="main-menu-wrapper__right">
            <div className="main-menu-wrapper__login">
              <Button
                onClick={handleLogin}
                style={{
                  marginRight: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#ff613c",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {loginButton.text}
              </Button>
            </div>
            <div className="main-menu-wrapper__search-cat">
              <a
                onClick={handleToggleSearch}
                className="main-menu-wrapper__search search-toggler icon-magnifying-glass cursor-pointer"
              ></a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

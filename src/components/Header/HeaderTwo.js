import { useRootContext } from "@/context/context";
import headerData from "@/data/headerData";
import useScroll from "@/hooks/useScroll";
import React from "react";
import { Container, Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import MenuList from "./MenuList";

const {
  logo,
  navItems: items,
  callText,
  phone,
  phoneHref,
  socials,
} = headerData;

const HeaderTwo = ({ navItems = items, onePage = false }) => {
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

  return (
    <header className="main-header-two clearfix">
      <div className="main-header-two__top clearfix">
        <div className="container clearfix">
          <div className="main-header-two__top-inner clearfix">
            <div className="main-header-two__top-left">
              <div className="main-header-two__logo">
                <Link href="/">
                  <Image src={logo.src} alt="" />
                </Link>
              </div>
              <div className="main-header-two__top-social">
                {socials.map(({ id, icon, href }) => (
                  <a key={id} href={href}>
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="main-header-two__top-right">
              <div className="main-header-two__top__call">
                <div className="main-header-two__top-icon">
                  <span className="icon-phone-call"></span>
                </div>
                <div className="main-header-two__top-call-number">
                  <p>{callText}</p>
                  <h5>
                    <a href={`tel:${phoneHref}`}>{phone}</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`${
          scrollTop
            ? "stricky-header stricked-menu stricky-fixed slideInDown"
            : "slideIn"
        } main-menu main-menu-two animated clearfix`}
      >
        <div
          className={`main-menu-two-wrapper clearfix${
            scrollTop ? " sticky-header__content" : ""
          }`}
        >
          <Container className="clearfix">
            <div className="main-menu-two-wrapper__inner clearfix">
              <div className="main-menu-two-wrapper__left">
                <div className="main-menu-two-wrapper__main-menu">
                  <a onClick={handleToggleMenu} className="mobile-nav__toggler">
                    <i className="fa fa-bars"></i>
                  </a>
                  <MenuList navItems={navItems} onePage={onePage} />
                </div>
              </div>
              <div className="main-menu-two-wrapper__right">
                <div className="main-menu-two-wrapper__search-box">
                  <a
                    onClick={handleToggleSearch}
                    className="main-menu-two-wrapper__search search-toggler icon-magnifying-glass cursor-pointer"
                  ></a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </header>
  );
};

export default HeaderTwo;

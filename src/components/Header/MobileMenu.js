// import { useRootContext } from "@/context/context";
// import headerData from "@/data/headerData";
// import React from "react";
// import { Image } from "react-bootstrap";
// import Link from "../Reuseable/Link";
// import MenuList from "./MenuList";

// const { logo, navItems: items, phone, phoneHref, email, socials } = headerData;

// const MobileMenu = ({ navItems = items, onePage = false }) => {
//   const { menuStatus, toggleMenu } = useRootContext();

//   const handleToggleMenu = () => {
//     document.body.classList.toggle("locked");
//     toggleMenu();
//   };

//   return (
//     <div className={`mobile-nav__wrapper${menuStatus ? " expanded" : ""}`}>
//       <div
//         onClick={handleToggleMenu}
//         className="mobile-nav__overlay mobile-nav__toggler"
//       ></div>
//       <div className="mobile-nav__content">
//         <span
//           onClick={handleToggleMenu}
//           className="mobile-nav__close mobile-nav__toggler"
//         >
//           <i className="fa fa-times"></i>
//         </span>
//         <div className="logo-box">
//           <Link href="/" aria-label="logo image">
//             <Image src={logo.src} width={155} alt="" />
//           </Link>
//         </div>
//         <div className="mobile-nav__container">
//           <MenuList navItems={navItems} mobile onePage={onePage} />
//         </div>
//         <ul className="mobile-nav__contact list-unstyled">
//           <li>
//             <i className="fa fa-envelope"></i>
//             <a href={`mailto:${email}`}>{email}</a>
//           </li>
//           <li>
//             <i className="fa fa-phone-alt"></i>
//             <a href={`tel:${phoneHref}`}>{phone}</a>
//           </li>
//         </ul>
//         <div className="mobile-nav__top">
//           <div className="mobile-nav__social">
//             {socials.map(({ id, href, icon }) => (
//               <a key={id} href={href} className={icon}></a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useRootContext } from "@/context/context";
import headerData from "@/data/headerData";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import MenuList from "./MenuList";

const { logo, navItems: items, phone, phoneHref, email, socials } = headerData;

const MobileMenu = ({ navItems = items, onePage = false }) => {
  const { t } = useTranslation();
  const { menuStatus, toggleMenu } = useRootContext();

  const translatedNavItems = navItems.map((item) => {
    const keyMap = { Home: "home", Services: "services", About: "about", Contact: "contact" };
    const navKey = keyMap[item.name];
    return navKey ? { ...item, name: t(`header.nav.${navKey}`) } : item;
  });

  const handleToggleMenu = () => {
    document.body.classList.toggle("locked");
    toggleMenu();
  };

  return (
    <div className={`mobile-nav__wrapper${menuStatus ? " expanded" : ""}`}>
      <div
        onClick={handleToggleMenu}
        className="mobile-nav__overlay mobile-nav__toggler"
      ></div>
      <div className="mobile-nav__content">
        <span
          onClick={handleToggleMenu}
          className="mobile-nav__close mobile-nav__toggler"
        >
          <i className="fa fa-times"></i>
        </span>
        <div className="logo-box">
          <Link href="/" aria-label="logo image">
            <Image src={logo.src} width={155} alt="" />
          </Link>
        </div>
        <div className="mobile-nav__container">
          <MenuList navItems={translatedNavItems} mobile onePage={onePage} />
          <div style={{ padding: "0 15px", marginTop: "16px" }}>
            <LanguageSwitcher />
          </div>
          <div className="mobile-nav__buttons" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px", padding: "0 15px" }}>
            <Link 
              href="https://app.meksova.com/login" 
              style={{
                color: "#ffffff",
                fontWeight: "500",
                fontSize: "16px",
                textDecoration: "none",
                textAlign: "center",
                padding: "12px 20px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
            >
              {t("header.login")}
            </Link>
            <Link 
              href="https://app.meksova.com/signup" 
              style={{
                backgroundColor: "#1D6BD4",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
                textDecoration: "none",
                textAlign: "center",
                padding: "12px 20px",
                borderRadius: "50px",
                border: "none",
                transition: "background-color 0.3s ease",
              }}
            >
              {t("header.signup")}
            </Link>
          </div>
        </div>
        <ul className="mobile-nav__contact list-unstyled">
          <li>
            <i onClick={() => window.location.href = `mailto:${email}`} className="fa fa-envelope"></i>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
          <li>
            <i onClick={() => window.location.href = `tel:${phoneHref}`} className="fa fa-phone-alt"></i>
            <a href={`tel:${phoneHref}`}>{phone}</a>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
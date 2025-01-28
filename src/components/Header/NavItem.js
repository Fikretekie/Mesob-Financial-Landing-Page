import { useRootContext } from "@/context/context";
import useToggle from "@/hooks/useToggle";
import { useRouter } from "next/router";
import React from "react";
import Link from "../Reuseable/Link";

const SubItem = ({ subItem = {}, mobile = false, handleToggleMenu }) => {
  const [active, toggleActive] = useToggle(false);
  const { subItems, href, name } = subItem;
  const { pathname } = useRouter();

  const handleActive = (e) => {
    e.preventDefault();
    toggleActive();
  };

  return (
    <li
      className={`${subItems?.length ? "dropdown" : ""} ${
        pathname === href ? "current" : ""
      }`}
    >
      <Link
        onClick={handleToggleMenu}
        href={href}
        className={mobile && active ? "expanded" : ""}
      >
        {name}{" "}
        {mobile && subItems?.length > 0 && (
          <button
            aria-label="dropdown toggler"
            onClick={handleActive}
            className={active ? "expanded" : ""}
          >
            <i className="fa fa-angle-down"></i>
          </button>
        )}
      </Link>
      <ul className={mobile && !active ? "d-none" : "d-block"}>
        {subItems?.map((item) => (
          <li key={item.id}>
            <Link onClick={handleToggleMenu} href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const NavItem = ({ navItem = {}, mobile = false, onePage = false }) => {
  const [active, toggleActive] = useToggle(false);
  const { pathname } = useRouter();
  const { currentActive, toggleMenu } = useRootContext();

  const handleToggleMenu = () => {
    if (mobile) {
      toggleMenu(false);
      document.body.classList.remove("locked");
    }
  };

  const handleActive = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleActive();
  };

  const { name, href, subNavItems = [] } = navItem;

  let current = onePage ? currentActive === href : pathname === href;
  if (!current && !onePage) {
    current = subNavItems.find((item) =>
      item.href === pathname
        ? true
        : item.subItems?.find((it) => it.href === pathname)
    );
  }

  return (
    <li
      className={`${subNavItems.length ? "dropdown" : ""}${
        current ? " current" : ""
      }`}
    >
      <Link
        onClick={handleToggleMenu}
        href={href}
        className={mobile && active ? "expanded" : ""}
      >
        {name}{" "}
        {mobile && subNavItems.length > 0 && (
          <button
            aria-label="dropdown toggler"
            onClick={handleActive}
            className={active ? "expanded" : ""}
          >
            <i className="fa fa-angle-down"></i>
          </button>
        )}
      </Link>
      <ul className={mobile && !active ? "d-none" : "d-block"}>
        {subNavItems.map((subItem) => (
          <SubItem
            key={subItem.id}
            subItem={subItem}
            mobile={mobile}
            handleToggleMenu={handleToggleMenu}
          />
        ))}
      </ul>
    </li>
  );
};

export default NavItem;

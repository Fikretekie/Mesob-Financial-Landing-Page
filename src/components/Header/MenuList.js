import React from "react";
import NavItem from "./NavItem";

const MenuList = ({ navItems = [], mobile = false, onePage = false }) => {
  return (
    <ul className="main-menu__list">
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.id}
          navItem={navItem}
          mobile={mobile}
          onePage={onePage}
        />
      ))}
    </ul>
  );
};

export default MenuList;

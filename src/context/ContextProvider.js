import useToggle from "@/hooks/useToggle";
import React, { useState } from "react";
import context from "./context";

const ContextProvider = ({ children }) => {
  const [menuStatus, toggleMenu] = useToggle(false);
  const [openSearch, toggleSearch] = useToggle(false);
  const [currentActive, setCurrentActive] = useState("#home");

  const value = {
    menuStatus,
    toggleMenu,
    currentActive,
    setCurrentActive,
    openSearch,
    toggleSearch,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;

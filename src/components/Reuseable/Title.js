import React from "react";
import { useTranslation } from "react-i18next";

/**
 * @param {{title?:string;tagline?:string;children?:React.ReactNode}&React.HTMLAttributes<HTMLDivElement>} props
 */

const Title = ({ title = "", tagline = "", children, className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className={`section-title ${className}`} {...props}>
      {tagline && <span className="section-title__tagline" style={{marginTop:20}}>{tagline}</span>}
      <h2 className="section-title__title">{title || children}</h2>
      <p style={{color:'#dbdbdeff'}}>{t("common.titleSubtitle")}</p>
    </div>
  );
};

export default Title;

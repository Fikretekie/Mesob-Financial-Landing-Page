import bg from "../../assets/images/backgrounds/bac.PNG";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import Link from "./Link";

const PageHeader = ({
  page = "",
  title = "",
  parent = "",
  parentHref = "/",
}) => {
  const { t } = useTranslation();
  return (
    <section className="page-header">
      <div
        className="page-header-bg"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="page-header-shape-1 float-bob-x-6"></div>
      <div className="page-header-shape-2 float-bob-x-7"></div>
      <Container>
        <div className="page-header__inner">
          <ul className="thm-breadcrumb list-unstyled">
            <li>
              <Link href="/">{t("common.breadcrumb.home")}</Link>
            </li>{" "}
            <li>
              <span>/</span>
            </li>{" "}
            {parent && (
              <>
                <li>
                  <Link href={parentHref}>{parent}</Link>
                </li>{" "}
                <li>
                  <span>/</span>
                </li>{" "}
              </>
            )}
            <li>{page || title}</li>
          </ul>
          <h2>{title}</h2>
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;

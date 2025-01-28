import bg from "@/images/backgrounds/page-header-bg.jpg";
import React from "react";
import { Container } from "react-bootstrap";
import Link from "./Link";

const PageHeader = ({
  page = "",
  title = "",
  parent = "",
  parentHref = "/",
}) => {
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
              <Link href="/">Home</Link>
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

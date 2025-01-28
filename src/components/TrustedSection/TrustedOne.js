import { trustedOne } from "@/data/trustedSection";
import React from "react";
import { Container } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { title, items } = trustedOne;

const TrustedOne = () => {
  return (
    <section className="trusted-one">
      <Container>
        <div className="trusted-one__inner">
          <div className="trusted-one__left">
            <h3 className="trusted-one__content">{title}</h3>
          </div>
          <div className="trusted-one__right">
            <ul className="list-unstyled trusted-one__content-box">
              {items.map(({ id, title, text, icon, href }) => (
                <li
                  key={id}
                  className="trusted one__single animated fadeInLeft"
                >
                  <div className="trusted-one__icon">
                    <span className={icon}></span>
                  </div>
                  <h3 className="trusted-one__title">
                    <Link href={href}>{title}</Link>
                  </h3>
                  <p className="trusted-one__text">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustedOne;

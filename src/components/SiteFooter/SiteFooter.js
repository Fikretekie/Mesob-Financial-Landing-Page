import footerData from "@/data/siteFooter";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const {
  bg,
  text,
  aboutText,
  author,
  year,
  links,
  socials,
  phone,
  phoneHref,
  email,
} = footerData;

const SiteFooter = ({ footerClassName = "" }) => {
  return (
    <footer className={`site-footer ${footerClassName}`}>
      <div className="site-footer__top">
        <div
          className="site-footer-shape-1"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <Container>
          <Row>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__about">
                <div className="footer-widget__logo">
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "26px",
                    }}
                    href="/"
                  >
                    {text}
                  </Link>
                </div>
                <div className="footer-widget__about-text-box">
                  <p className="footer-widget__about-text">{aboutText}</p>
                </div>
                <div className="site-footer__social">
                  {socials.map(({ id, href, icon }) => (
                    <a key={id} href={href} target="_blank" rel="noopener noreferrer">
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__explore clearfix">
                <h3 className="footer-widget__title">Explore</h3>
                <ul className="footer-widget__explore-list list-unstyled clearfix">
                  {links.slice(0, 5).map(({ id, href, text }) => (
                    <li key={id}>
                      <Link href={href}>{text}</Link>
                    </li>
                  ))}
                </ul>
                <ul className="footer-widget__explore-list footer-widget__explore-list-two list-unstyled clearfix">
                  {links.slice(5).map(({ id, href, text }) => (
                    <li key={id}>
                      <Link href={href}>{text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__contact clearfix">
                <h3 className="footer-widget__title">Contact</h3>
                <h4 className="footer-widget__contact-info">
                  <a
                    href={`tel:${phoneHref}`}
                    className="footer-widget__contact-number"
                  >
                    {phone}
                  </a>{" "}
                  <a
                    href={`mailto:${email}`}
                    className="footer-widget__contact-email"
                  >
                    {email}
                  </a>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="site-footer__bottom">
        <Container>
          <Row>
            <Col xl={12}>
              <div className="site-footer__bottom-inner">
                <p className="site-footer__bottom-text">
                  © Copyright {year} by <a href="#">{author}</a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default SiteFooter;

import footerData from "@/data/siteFooter";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import styles from "./sitefooter.module.css";
const {
  bg,
  author,
  year,
  socials,
  phone,
  phoneHref,
  email,
} = footerData;

const footerLinkKeys = ["about", "terms", "privacy", "content"];
const footerHrefs = ["/about", "/terms-of-use", "/privacy-policy", "/content"];

const SiteFooter = ({ footerClassName = "" }) => {
  const { t } = useTranslation();
  const links = footerLinkKeys.map((key, index) => ({
    id: index + 1,
    href: footerHrefs[index],
    text: t(`footer.links.${key}`),
  }));

  return (
    <footer className={`site-footer ${footerClassName}`}>
      <div className="site-footer__top">
        <div
          className="site-footer-shape-1"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <Container className={styles.customContainer}>
          <Row>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__about">
                <div className="footer-widget__logo">
                  <Link href="/" className="footer-widget__logo-link">
                    <span className="footer-widget__logo-mesob">Meksova</span>{" "}
                  </Link>
                </div>
                <p className="footer-widget__tagline">{t("footer.tagline")}</p>
                <div className="site-footer__social">
                  {socials.map(({ id, href, icon }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__explore">
                <h3 className="footer-widget__title">{t("footer.explore")}</h3>
                <ul className="footer-widget__explore-list list-unstyled">
                  {links.map(({ id, href, text }) => (
                    <li key={id}>
                      <Link href={href}>{text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
              <div className="footer-widget__column footer-widget__contact clearfix">
                <h3 className="footer-widget__title">{t("footer.contact")}</h3>
                <div className="footer-widget__contact-info">
                  <a
                    href={`tel:${phoneHref}`}
                    className="footer-widget__contact-number"
                  >
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="footer-widget__contact-email"
                  >
                    {email}
                  </a>
                </div>
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
                  {t("footer.copyright", { year, author: t("footer.author") })}
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

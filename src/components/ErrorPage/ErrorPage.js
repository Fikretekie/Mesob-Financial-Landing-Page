import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Link from "../Reuseable/Link";

const ErrorPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("search"));
  };

  return (
    <section className="error-page">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="error-page__inner">
              <div className="error-page__title-box">
                <h2 className="error-page__title">{t("error.code")}</h2>
                <h2 className="error-page__title-2">{t("error.code")}</h2>
              </div>
              <h3 className="error-page__tagline">{t("error.tagline")}</h3>
              <p className="error-page__text">{t("error.text")}</p>
              <form onSubmit={handleSubmit} className="error-page__form">
                <div className="error-page__form-input">
                  <input
                    type="search"
                    placeholder={t("error.searchPlaceholder")}
                    name="search"
                    required
                  />
                  <button type="submit">
                    <i className="icon-magnifying-glass"></i>
                  </button>
                </div>
              </form>
              <Link href="/" className="thm-btn error-page__btn">
                {t("error.backHome")}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ErrorPage;

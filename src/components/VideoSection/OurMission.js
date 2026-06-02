import { ourMission } from "@/data/ourMission";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Link from "../Reuseable/Link";

const { buttonHref } = ourMission;

const OurMission = () => {
  const { t } = useTranslation();

  return (
    <section className="our-mission">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-white leading-snug pt-3 pb-3">
        {t("ourMission.trustedHeading")}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          {t("ourMission.trustedHighlight")}
        </span>
      </h2>
      <div className="our-mission-container">
        <div className="our-mission-watermark">{t("ourMission.watermark")}</div>
        <Container>
          <Row>
            <Col xl={12}>
              <div className="our-mission__inner">
                <h2 className="our-mission__title">
                  {t("ourMission.title")}{" "}
                  <span className="our-mission__title-highlight">
                    {t("ourMission.titleHighlight")}
                  </span>
                </h2>
                <p style={{ color: "white", marginBottom: 15 }}>
                  {t("ourMission.testimonial")}
                </p>
                <Link href={buttonHref} className="our-mission__btn">
                  {t("ourMission.cta")}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default OurMission;

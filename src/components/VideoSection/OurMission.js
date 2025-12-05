import { ourMission } from "@/data/ourMission";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { bg, title, titleHighlight, buttonText, buttonHref, watermarkText } = ourMission;

const OurMission = () => {
  return (
  
    <section className="our-mission">
    <div className="our-mission-container">
  
      <div className="our-mission-watermark">{watermarkText}</div>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="our-mission__inner">
              <h2 className="our-mission__title">
                {title} <span className="our-mission__title-highlight">{titleHighlight}</span>
              </h2>
              <Link href={buttonHref} className="our-mission__btn">
                {buttonText}
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

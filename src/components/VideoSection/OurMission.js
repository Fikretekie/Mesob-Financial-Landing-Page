import { ourMission } from "@/data/ourMission";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { bg, title, titleHighlight, buttonText, buttonHref, watermarkText } = ourMission;

const OurMission = () => {
  return (
  
    <section className="our-mission">
      
<h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-white leading-snug pt-3 pb-3">
          Trusted by hundreds of{" "}small business owners

        </h2>
    <div className="our-mission-container">
  
      <div className="our-mission-watermark">{watermarkText}</div>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="our-mission__inner">
              <h2 className="our-mission__title">
                {title} <span className="our-mission__title-highlight">{titleHighlight}</span>
              </h2>
              <p style={{color:'white', marginBottom:15}}>Meksova is a great app and super easy to use. It keeps all your receipts in one place, which makes tracking expenses and dealing with the IRS stress-free. I highly recommend it!</p>
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

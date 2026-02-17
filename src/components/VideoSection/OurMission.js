import { ourMission } from "@/data/ourMission";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { bg, title, titleHighlight, buttonText, buttonHref, watermarkText } = ourMission;

const OurMission = () => {
  return (
  
    <section className="our-mission">
      
      <p style={{ textAlign: 'center', width: '100%', marginBottom: '20px', fontSize: '20px', fontWeight: 'semi-bold' }}>Trusted by hundreds of small business owners to manage finances effortlessly.</p>
    <div className="our-mission-container">
  
      <div className="our-mission-watermark">{watermarkText}</div>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="our-mission__inner">
              <h2 className="our-mission__title">
                {title} <span className="our-mission__title-highlight">{titleHighlight}</span>
              </h2>
              <p style={{color:'white', marginBottom:15}}>Mesob Financial is a great app and super easy to use. It keeps all your receipts in one place, which makes tracking expenses and dealing with the IRS stress-free. I highly recommend it!</p>
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

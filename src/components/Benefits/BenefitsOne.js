import { benefitsOne } from "@/data/benefits";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";

const { tagline, title, images, points, rightText, faqs } = benefitsOne;

const faqsLength = faqs.length;

const BenefitsOne = () => {
  const [faqActive, setFaqsActive] = useState(1);

  return (
    <section className="benefits-one">
      <Container>
        <Row>
          <Col xl={6} lg={6}>
            <div className="benefits-one__left">
              <Title title={title} tagline={tagline} className="text-left" />
              <div className="benefits-one__img-box">
                <Row>
                  {images.map((image, i) => (
                    <Col key={i} xl={6} lg={6} md={6}>
                      <div className="benefits-one__img-single">
                        <Image
                          src={
                            require(`@/images/resources/${image}`).default.src
                          }
                          alt=""
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <ul className="list-unstyled benefits-one__points">
                {points.map(({ id, title, text, icon }) => (
                  <li key={id}>
                    <div className="icon">
                      <span className={icon}></span>
                      <p>{title}</p>
                    </div>
                    <div className="text">
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={6} lg={6}>
            <div className="benefits-one__rihgt">
              <p className="benefits-one__right-text">{rightText}</p>
              <div className="accrodion-grp faq-one-accrodion">
                {faqs.map(({ id, title, text }) => (
                  <div
                    key={id}
                    className={`accrodion overflow-hidden${
                      faqActive === id ? " active" : ""
                    }${id === faqsLength ? " last-chiled" : ""}`}
                  >
                    <div
                      onClick={() => setFaqsActive(id)}
                      className="accrodion-title"
                    >
                      <h4>{title}</h4>
                    </div>
                    <div
                      className={`accrodion-content animated ${
                        faqActive === id
                          ? "slideInUp d-block"
                          : "slideInDown d-none"
                      }`}
                    >
                      <div className="inner">
                        <p>{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BenefitsOne;

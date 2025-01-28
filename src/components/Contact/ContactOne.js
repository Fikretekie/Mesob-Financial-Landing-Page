import { contactOne } from "@/data/contact";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import ContactForm from "./ContactForm";

const { bg, tagline, title, text, timeRange, inputs, bottomTitle, contacts } =
  contactOne;

const ContactOne = ({ id = "" }) => {
  const ref = useActive(id, 150);

  return (
    <section ref={ref} className="contact-one" id={id}>
      <div
        className="contact-one-shape"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <Container>
        <div className="contact-one__top">
          <Row>
            <Col xl={5} lg={5}>
              <div className="contact-one__top-left">
                <Title title={title} tagline={tagline} className="text-left" />
                <p className="contact-one__text">{text}</p>
                <div className="contact-one__timings">
                  <h5 className="contact-one__timings-title">Timings</h5>
                  <p className="contact-one__timings__text">{timeRange}</p>
                </div>
              </div>
            </Col>
            <Col xl={7} lg={7}>
              <div className="contact-one__top-right">
                <ContactForm
                  inputs={inputs}
                  formClassName="contact-one__form"
                  inputClassName="contact-form__input-box"
                  messageClassName="contact-form__input-message-box"
                  btnBoxClassName="contact-form__input-btn-box"
                  btnClassName="contact-form__btn"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="contact-one__bottom">
          <h2 className="contact-one__bottom-title">{bottomTitle}</h2>
          <Row>
            {contacts.map(({ id, title, text, email, phone, phoneHref }) => (
              <Col key={id} xl={3} lg={6} md={6} className="animated fadeInUp">
                <div className="contact-one__single">
                  <h3 className="contact-one__title">{title}</h3>
                  <p className="contact-one__text-2">{text}</p>
                  <h4 className="contact-one__contact-info">
                    <a href={`mailto:${email}`} className="contact-one__email">
                      {email}
                    </a>
                    <a href={`tel:${phoneHref}`} className="contact-one__phone">
                      {phone}
                    </a>
                  </h4>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ContactOne;

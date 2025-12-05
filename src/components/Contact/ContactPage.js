import { contactPage } from "@/data/contact";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import ContactForm from "./ContactForm";

const { tagline, title, inputs, title2, buttonText } = contactPage;

const ContactPage = ({ isTitleTwo = false }) => {
  const newTitle = isTitleTwo ? title2 : title;

  return (
    <section className="contact-page">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="contact-page__form">
              <div className="contact-page__title-wrapper">
                <span className="contact-page__tagline">{tagline}</span>
                <Title title={newTitle} className="text-left" />
              </div>
              <ContactForm inputs={inputs} btnText={buttonText} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;

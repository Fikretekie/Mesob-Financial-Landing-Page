import { contactPage } from "@/data/contact";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import ContactForm from "./ContactForm";

const { tagline, title, inputs, title2 } = contactPage;

const ContactPage = ({ isTitleTwo = false }) => {
  const newTitle = isTitleTwo ? title2 : title;

  return (
    <section className="contact-page">
      <Container>
        <Title title={newTitle} tagline={tagline} className="text-center" />
        <Row>
          <Col xl={12}>
            <div className="contact-page__form">
              <ContactForm inputs={inputs} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;

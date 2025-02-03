import { contactDetails } from "@/data/contact";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const { phone, phoneHref, email, title, text, address, contactIcon } =
  contactDetails;

const ContactDetails = () => {
  return (
    <section className="contact-details">
      <Container>
        <Row>
          <Col xl={12}>
            <div
              className="contact-details__inner"
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <div className="contact-details__content">
                <div className="contact-details__title-box">
                  <h4 className="contact-details__title">{title}</h4>
                  <p className="contact-details__text">{text}</p>
                </div>
                <p className="contact-details__address">{address}</p>
                <div className="contact-details__contact-info">
                  <div className="contact-details__contact-icon">
                    <span className={contactIcon}></span>
                  </div>
                  <h4 className="contact-details__contact-number-email">
                    <a
                      href={`tel:${phoneHref}`}
                      className="contact-details__contact-number"
                    >
                      {phone}
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="contact-details__contact-email"
                    >
                      {email}
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactDetails;

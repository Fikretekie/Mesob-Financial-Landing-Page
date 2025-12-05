import { contactDetails } from "@/data/contact";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./contact.module.css"
const { phone, phoneHref, email, title, text, address, addressLabel, phoneIcon, locationIcon } =
  contactDetails;

const ContactDetails = () => {
  return (
    <section className="contact-details">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="contact-details__inner">
              <div className={`contact-details__content ${styles.contactDetailsContent}`}>
                <div className={`contact-details__title-box ${styles.contactDetailsTitleBox}`}>
                  <h4 className={`contact-details__title ${styles.contactDetailsTitle}`}>
                    {title}
                  </h4>
                  <p className="contact-details__text">{text}</p>
                </div>
                
                {/* Phone and Email Section */}
                <div className={`contact-details__contact-info ${styles.contactDetailsInfo}`}>
                  <div className={`contact-details__contact-icon ${styles.contactDetailsIcon}`}>
                    <span className={phoneIcon}></span>
                  </div>
                  <div className="contact-details__contact-number-email">
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
                  </div>
                </div>

                {/* Address Section */}
                {address && (
                  <div className="contact-details__address-info">
                    <div className="contact-details__address-icon">
                      <span className={locationIcon}></span>
                    </div>
                    <div className="contact-details__address-content">
                      <h5 className="contact-details__address-label">{addressLabel}</h5>
                      <p className="contact-details__address">{address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactDetails;

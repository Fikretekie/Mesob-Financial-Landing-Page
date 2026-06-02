import { contactPage } from "@/data/contact";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import ContactForm from "./ContactForm";

const { inputs } = contactPage;

const ContactPage = ({ isTitleTwo = false }) => {
  const { t } = useTranslation();
  const newTitle = isTitleTwo ? t("contact.form.titleAlt") : t("contact.form.title");
  const translatedInputs = inputs.map((input) => ({
    ...input,
    placeholder: t(`contact.form.fields.${input.name === "name" ? "fullName" : input.name}`),
  }));

  return (
    <section className="contact-page">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="contact-page__form">
              <div className="contact-page__title-wrapper">
                <span className="contact-page__tagline">{t("contact.form.tagline")}</span>
                <Title title={newTitle} className="text-left" />
              </div>
              <ContactForm inputs={translatedInputs} btnText={t("contact.form.submit")} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;

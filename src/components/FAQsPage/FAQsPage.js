import fAQsPage from "@/data/fAQsPage";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Faqs from "./Faqs";

const FAQsPage = () => {
  return (
    <section className="faq-page">
      <Container>
        <Row>
          {fAQsPage.map((faqs, i) => (
            <Col key={i} xl={6} lg={6}>
              <div className="faq-page__single">
                <Faqs faqs={faqs} className={`faq-one-accrodion-${i + 1}`} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FAQsPage;

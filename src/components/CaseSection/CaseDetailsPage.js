import { caseDetailsPage } from "@/data/caseSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CaseDetailsContent from "./CaseDetailsContent";
import CaseDetailsImg from "./CaseDetailsImg";
import CaseDetailsPagination from "./CaseDetailsPagination";

const { image, clientName, category, date, ...content } = caseDetailsPage;

const CaseDetailsPage = () => {
  return (
    <section className="case-details">
      <Container>
        <Row>
          <Col xl={12}>
            <CaseDetailsImg
              image={image}
              clientName={clientName}
              category={category}
              date={date}
            />
            <CaseDetailsContent {...content} />
            <Row>
              <Col xl={12}>
                <CaseDetailsPagination />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CaseDetailsPage;

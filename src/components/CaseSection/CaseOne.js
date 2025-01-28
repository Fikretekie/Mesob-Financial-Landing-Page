import { caseOne } from "@/data/caseSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleCaseOne from "./SingleCaseOne";

const { tagline, title, cases } = caseOne;

const CaseOne = ({ className = "", smallImage = false, id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className={`case-one ${className}`} id={id}>
      <Container>
        <Title title={title} tagline={tagline} className="text-center" />
        <Row>
          {cases.slice(0, 3).map((singleCase) => (
            <Col
              key={singleCase.id}
              xl={4}
              lg={4}
              className="animated fadeInUp"
            >
              <SingleCaseOne singleCase={singleCase} smallImage={smallImage} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CaseOne;

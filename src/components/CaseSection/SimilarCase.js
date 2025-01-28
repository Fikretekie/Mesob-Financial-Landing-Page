import { similarCase } from "@/data/caseSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleCaseOne from "./SingleCaseOne";

const { title, tagline, cases } = similarCase;

const SimilarCase = () => {
  return (
    <section className="simialr-case">
      <Container>
        <Title title={title} tagline={tagline} className="text-center" />
        <Row>
          {cases.map((singleCase) => (
            <Col key={singleCase.id} xl={4} lg={4} className="wow fadeInUp">
              <SingleCaseOne singleCase={singleCase} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SimilarCase;

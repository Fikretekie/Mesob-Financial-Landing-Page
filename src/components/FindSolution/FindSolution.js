import { findSolution } from "@/data/findSolution";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { text, linkText, href } = findSolution;

const FindSolution = () => {
  return (
    <section className="find-solution">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="find-solution__inner">
              <p className="find-solutions__text">
                {text} <Link href={href}>{linkText}</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FindSolution;

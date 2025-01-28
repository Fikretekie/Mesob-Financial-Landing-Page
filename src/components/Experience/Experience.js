import { experience } from "@/data/experience";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const { title } = experience;

const Experience = () => {
  return (
    <section className="experience">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="experience__inner">
              <h2 className="experience__title">
                <TextSplit text={title} />
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;

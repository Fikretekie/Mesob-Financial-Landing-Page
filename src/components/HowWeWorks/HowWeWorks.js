import { howWeWorks } from "@/data/howWeWorks";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleHowWeWork from "./SingleHowWeWork";

const { tagline, title, works } = howWeWorks;

const HowWeWorks = () => {
  return (
    <section className="how-we-works">
      <Container>
        <Title title={title} tagline={tagline} className="text-center" />
        <Row>
          <Col xl={12}>
            <ul className="list-unstyled how-we-works__list-box">
              {works.map((work) => (
                <SingleHowWeWork work={work} key={work.id} />
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HowWeWorks;

import { servicesTwo } from "@/data/servicesSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleServiceTwo from "./SingleServiceTwo";

const { title, tagline, text, services } = servicesTwo;

const ServicesTwo = ({ id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className="services-two" id={id}>
      <Container>
        <div className="services-two__top">
          <Row>
            <Col xl={6} lg={6}>
              <div className="services-two__top-left">
                <Title title={title} tagline={tagline} className="text-left" />
              </div>
            </Col>
            <Col xl={6} lg={6}>
              <div className="services-two__top-right">
                <p className="services-two__top-text">{text}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="services-two__bottom">
          <Row>
            {services.slice(0, 4).map((service) => (
              <SingleServiceTwo key={service.id} service={service} />
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ServicesTwo;

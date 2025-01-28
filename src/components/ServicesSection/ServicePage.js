import { servicesTwo } from "@/data/servicesSection";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SingleServiceTwo from "./SingleServiceTwo";

const { services } = servicesTwo;

const ServicePage = () => {
  return (
    <section className="service-page">
      <Container>
        <Row>
          {services.map((service) => (
            <SingleServiceTwo key={service.id} service={service} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServicePage;

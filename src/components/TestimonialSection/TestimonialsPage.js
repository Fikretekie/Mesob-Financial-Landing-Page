import { testimonialThree } from "@/data/testimonialSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleTestimonialThree from "./SingleTestimonialThree";

const { testimonials } = testimonialThree;

const TestimonialsPage = () => {
  return (
    <section className="testimonials-page">
      <Container>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={6}>
              <SingleTestimonialThree testimonial={testimonial} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsPage;

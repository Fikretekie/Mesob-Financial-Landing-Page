import { testimonialOne } from "@/data/testimonialSection";
import useActive from "@/hooks/useActive";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleTestimonialOne from "./SingleTestimonialOne";

const TinySlider = dynamic(() => import("../TinySlider/TinySlider"), {
  ssr: false,
});

const options = {
  container: ".my-slider-1",
  loop: true,
  lazyload: true,
  nav: true,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controls: false,
  gutter: 0,
  autoplayButton: false,
  autoplayButtonOutput: false,
};

const TestimonialOne = ({ className = "", id = "" }) => {
  const ref = useActive(id, 170);

  return (
    <section ref={ref} className={`testimonial-one ${className}`} id={id}>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="testimonial-one__carousel">
              <TinySlider options={options}>
                {testimonialOne.map((testimonial) => (
                  <SingleTestimonialOne
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </TinySlider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialOne;

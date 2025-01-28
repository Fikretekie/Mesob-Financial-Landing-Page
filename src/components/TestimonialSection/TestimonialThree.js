import { testimonialThree } from "@/data/testimonialSection";
import useActive from "@/hooks/useActive";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleTestimonialThree from "./SingleTestimonialThree";

const TinySlider = dynamic(() => import("../TinySlider/TinySlider"), {
  ssr: false,
});

const options = {
  container: ".testimonial-three-1",
  loop: true,
  lazyload: true,
  nav: false,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controls: true,
  controlsContainer: ".tns-controls",
  gutter: 0,
  autoplayButton: false,
  autoplayButtonOutput: false,
  responsive: {
    600: {
      items: 1,
      gutter: 30,
    },
    800: {
      items: 2,
      gutter: 30,
    },
    1024: {
      items: 2,
      gutter: 30,
    },
    1200: {
      items: 1.33334,
      gutter: 30,
    },
  },
};

const { tagline, title, testimonials } = testimonialThree;

const TestimonialThree = ({ id = "" }) => {
  const ref = useActive(id, 160);

  return (
    <section ref={ref} className="testimonial-three" id={id}>
      <div className="testimonial-three-shape-1 float-bob-x-5"></div>
      <Container>
        <Row>
          <Col xl={4}>
            <div className="testimonial-three__left">
              <Title title={title} tagline={tagline} className="text-left" />
            </div>
          </Col>
          <Col xl={8}>
            <div className="testimonial-three__right">
              <div className="testimonial-three__carousel position-relative">
                <TinySlider options={options}>
                  {testimonials.slice(0, 4).map((testimonial) => (
                    <SingleTestimonialThree
                      key={testimonial.id}
                      testimonial={testimonial}
                    />
                  ))}
                </TinySlider>
                <div className="tns-controls">
                  <button type="button" className="tns-prev">
                    <span className="icon-right-arrow"></span>
                  </button>
                  <button type="button" className="tns-next">
                    <span className="icon-right-arrow"></span>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialThree;

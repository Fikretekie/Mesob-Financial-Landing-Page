import { caseOne } from "@/data/caseSection";
import useActive from "@/hooks/useActive";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleCaseOne from "./SingleCaseOne";

const TinySlider = dynamic(() => import("../TinySlider/TinySlider"), {
  ssr: false,
});

const options = {
  container: ".my-slider-case-two",
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
  responsive: {
    600: {
      items: 2,
      gutter: 30,
    },
    800: {
      items: 3,
      gutter: 30,
    },
    1024: {
      items: 4,
      gutter: 30,
    },
    1200: {
      items: 4,
      gutter: 30,
    },
  },
};

const { tagline, title, cases } = caseOne;

const CaseTwo = ({ id = "" }) => {
  const ref = useActive(id, 130);

  return (
    <section
      ref={ref}
      style={{ marginBottom: 90 }}
      className="case-two"
      id={id}
    >
      <Container>
        <Title title={title} tagline={tagline} className="text-left" />
        <Row>
          <Col xl={12}>
            <div className="case-two__carousel">
              <TinySlider options={options}>
                {cases.map((singleCase) => (
                  <SingleCaseOne key={singleCase.id} singleCase={singleCase} />
                ))}
              </TinySlider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CaseTwo;

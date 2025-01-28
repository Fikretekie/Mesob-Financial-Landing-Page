import { ctaOne } from "@/data/ctaSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const { title, href } = ctaOne;

const CtaOne = ({ className = "" }) => {
  return (
    <section className={`cta-one ${className}`}>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="cta-one__inner">
              <div className="cta-one__inner-content">
                <div className="cta-one-shape-1 float-bob-x"></div>
                <div className="cta-one-shape-2 float-bob-x-2"></div>
                <h3 className="cta-one__title">
                  <TextSplit text={title} />
                </h3>
                <Link href={href} className="thm-btn cta-one__btn">
                  Discover More
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaOne;

import { whyChooseOne } from "@/data/whyChoose";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import ProgressWhyChose from "./ProgressWhyChose";

const { image, tagline, title, text, points, progresses } = whyChooseOne;

const WhyChooseOne = () => {
  return (
    <section className="why-choose-one">
      <div className="why-choose-one-shape-1 float-bob-x-3"></div>
      <div className="why-choose-one-shape-2 float-bob-x-4"></div>
      <Container>
        <Row>
          <Col xl={5}>
            <div className="why-choose-one__left animated slideInLeft">
              <div className="why-choose-one__img">
                <Image src={image.src} alt="" />
              </div>
            </div>
          </Col>
          <Col xl={7}>
            <div className="why-choose-one__right">
              <Title title={title} tagline={tagline} className="text-left" />
              <p className="why-choose-one__text">{text}</p>
              <ul className="list-unstyled why-choose-one__points">
                {points.map((point, i) => (
                  <li key={i}>
                    <div className="icon">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="text">
                      <p>{point}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="why-choose-one__progress">
                {progresses.map((progress) => (
                  <ProgressWhyChose key={progress.id} progress={progress} />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseOne;

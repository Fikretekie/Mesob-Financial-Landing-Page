import { workTogetherTwo } from "@/data/workTogether";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link"
import Title from "../Reuseable/Title";

const { image, tagline, title, icon, text, text2 } = workTogetherTwo;

const WorkTogetherTwo = () => {
  return (
    <section className="work-together-two">
      <Container>
            <div className="work-together-tow__right">
              <Title title={title} tagline={tagline} className="text-left" />
              <div className="work-together-tow__content">
                <div className="work-together-tow__icon">
                  <span className={icon}></span>
                </div>
                <h3
                  style={{ color: "black" }}
                  className="work-together-tow__text"
                >
                  {text}
                </h3>
              </div>
              <p className="work-together-tow__text-2">{text2}</p>
            </div>
      </Container>
    </section>
  );
};

export default WorkTogetherTwo;

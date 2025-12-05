import { workTogetherTwo } from "@/data/workTogether";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import Title from "../Reuseable/Title";

const { image, tagline, title, title2, icon, text, text2 } = workTogetherTwo;

const WorkTogetherTwo = () => {
  // Split title to highlight "your Business"
  const titleParts = title ? title.split("your Business") : [];
  const hasHighlight = titleParts.length > 1;

  return (
    <section className="work-together-two">
      <Container>
        <div className="work-together-tow__right">
          <div className="work-together-tow__title-wrapper">
            {tagline && (
              <span className="work-together-tow__tagline">{tagline}</span>
            )}
            <h2 className="work-together-tow__title">
              {hasHighlight ? (
                <>
                  {titleParts[0]}
                  <span className="work-together-tow__title-highlight">your Business</span>
                  {titleParts[1]}
                </>
              ) : (
                title
              )}
            </h2>
          </div>
          <div className="work-together-tow__content">
            <p className="work-together-tow__text">
              {text}
            </p>
          </div>
          {text2 && (
            <p className="work-together-tow__text-2">{text2}</p>
          )}
          {title2 && (
            <div className="work-together-tow__title-2-wrapper">
              <Title title={title2} className="text-left" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default WorkTogetherTwo;

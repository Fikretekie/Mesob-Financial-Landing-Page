import { welcomeTwo } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import Title from "../Reuseable/Title";

const { image, tagline, title, text1, text2, points, iconText } = welcomeTwo;

const WelcomeTwo = ({ id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className="welcome-two" id={id}>
      <Container>
        <Row>
          <Col xl={5}>
            <div className="welcome-two__left animated slideInLeft">
              <div className="welcome-two__img">
                <Image src={image.src} alt="" />
              </div>
            </div>
          </Col>
          <Col xl={7}>
            <div className="welcome-two__right">
              <Title title={title} tagline={tagline} className="text-left" />
              <p className="welcome-two__text-1">{text1}</p>
              <div className="welcome-two__content">
                <ul className="list-unstyled welcome-two__points">
                  {points.map((point, i) => (
                    <li key={i}>
                      <div className="icon">
                        <i className="fa fa-arrow-right"></i>
                      </div>
                      <div className="text">
                        <p>{point}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="welcome-two__icon-box">
                  <span className="icon-help"></span>
                  <p className="welcome-two__icon-box-text">
                    <TextSplit text={iconText} />
                  </p>
                </div>
              </div>
              <p className="welcome-two__text-2">{text2}</p>
              <Link href="/about" className="thm-btn welcome-two__btn">
                Discover More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WelcomeTwo;

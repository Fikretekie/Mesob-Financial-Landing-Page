import { ourMission } from "@/data/ourMission";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const { bg, title } = ourMission;

const OurMission = () => {
  return (
    <section className="our-mission">
      <div className="our-mission-bg-box">
        <Jarallax className="our-mission-bg" speed={0.2} imgPosition="50% 0%">
          <JarallaxImage src={bg.src} />
        </Jarallax>
      </div>
      <div className="our-mission-shape-1 shapemover2"></div>
      <div className="our-mission-shape-2 shapemover2"></div>
      <div className="our-mission-shape-3 shapemover2"></div>
      <Container>
        <Row>
          <Col xl={12}>
            <div className="our-mission__inner">
              <h2 className="our-mission__title">
                <TextSplit text={title} />
              </h2>
              <Link href="/about" className="thm-btn our-mission__btn">
                Discover More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurMission;

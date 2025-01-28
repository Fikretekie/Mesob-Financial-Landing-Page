import { ourMissionTwo } from "@/data/ourMission";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import VideoModal from "../Reuseable/VideoModal";

const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const { bg, title, videoId, videoText } = ourMissionTwo;

const OurMissionTwo = ({ className = "", shape = 2 }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className={`our-mission-two ${className}`}>
        <div className="our-mission-two-bg-box">
          <Jarallax
            className="our-mission-two-bg"
            speed={0.2}
            imgPosition="50% 0%"
          >
            <JarallaxImage src={bg.src} />
          </Jarallax>
        </div>
        {Array.from(Array(3)).map((_, i) => (
          <div
            key={i}
            className={`our-mission${shape === 2 ? "-two" : ""}-shape-${
              i + 1
            } shapemover2`}
          ></div>
        ))}
        <Container>
          <Row>
            <Col xl={8} lg={8}>
              <div className="our-mission-two__left">
                <h2 className="our-mission-two__title">
                  <TextSplit text={title} />
                </h2>
                <Link href="/about" className="thm-btn our-mission-two__btn">
                  Discover More
                </Link>
              </div>
            </Col>
            <Col xl={4} lg={4}>
              <div className="our-mission-two__right">
                <div className="our-mission-two__video-link">
                  <a
                    onClick={() => setOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="video-popup"
                  >
                    <div className="our-mission-two__video-icon">
                      <span className="fa fa-play"></span>
                      <i className="ripple"></i>
                    </div>
                  </a>
                  <h3 className="our-mission-two__video-text">{videoText}</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <VideoModal isOpen={isOpen} setOpen={setOpen} videoId={videoId} />
    </>
  );
};

export default OurMissionTwo;

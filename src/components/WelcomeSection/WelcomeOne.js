import { welcomeOne } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";
import VisibilityCountUp from "../Reuseable/VisibilityCountUp";
import SingleFeatureOne from "./SingleFeatureOne";

const { tagline, title, counter, bg, videoBg, videoId, bottomText, features } =
  welcomeOne;

const WelcomeOne = ({ id = "" }) => {
  const [isOpen, setOpen] = useState(false);

  const ref = useActive(id);

  return (
    <>
      <section ref={ref} className="welcome-one" id={id}>
        <div
          className="welcome-one-shape"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <Container>
          <div className="welcome-one__top">
            <Row>
              <Col xl={6} lg={6}>
                <div className="welcome-one__top-left">
                  <Title
                    tagline={tagline}
                    title={title}
                    className="text-left"
                  />
                </div>
              </Col>
              <Col xl={6} lg={6}>
                <div className="welcome-one__top-right">
                  <div className="welcome-one__counter">
                    <ul className="welcome-one__counter-list list-unstyled">
                      {counter.map(({ id, text, count }) => (
                        <li
                          key={id}
                          className="welcome-one__counter-single animated fadeInUp"
                        >
                          <h3 className="odometer">
                            <VisibilityCountUp count={count} />
                          </h3>
                          <p className="welcome-one__counter-text">{text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="welcome-one__video-link animated fadeInRight"
                    style={{ backgroundImage: `url(${videoBg.src})` }}
                  >
                    <a onClick={() => setOpen(true)} className="video-popup">
                      <div className="welcome-one__video-icon">
                        <span className="fas fa-play"></span>
                      </div>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="welcome-one__bottom">
            <ul className="list-unstyled welcome-one__feature">
              {features.map((feature) => (
                <SingleFeatureOne key={feature.id} feature={feature} />
              ))}
            </ul>
          </div>
          <div className="welcome-one__find-solutions">
            <p className="welcome-one__find-solutions-text">
              {bottomText} <Link href="/about">Find Your Solution</Link>
            </p>
          </div>
        </Container>
      </section>
      <VideoModal isOpen={isOpen} setOpen={setOpen} videoId={videoId} />
    </>
  );
};

export default WelcomeOne;

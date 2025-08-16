import { welcomeOne } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";
import SingleFeatureOne from "./SingleFeatureOne";

const { tagline, title, bg, videoBg, videoId, bottomText, features } =
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
                <div className="welcome-one__top-right"

                >
                  <div className="welcome-one__counter"
                  >

                  </div>
                  <div
                    className="welcome-one__video-link animated fadeInRight"
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      style={{ width: 550 }}
                      playsInline
                      className="w-3/4 rounded-2xl shadow-lg" // smaller width & styled
                    >
                      <source src="/videos/introvideo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
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
        </Container>
      </section>
      <VideoModal isOpen={isOpen} setOpen={setOpen} videoId={videoId} />
    </>
  );
};

export default WelcomeOne;

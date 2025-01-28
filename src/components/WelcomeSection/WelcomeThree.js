import { welcomeThree } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";

const {
  title,
  tagline,
  points,
  text,
  videoBg,
  percent,
  videoText,
  experienceText,
  images,
  videoId,
} = welcomeThree;

const WelcomeThree = ({ id = "" }) => {
  const [countStart, setCountStart] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const ref = useActive(id);

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setCountStart(true);
    }
  };

  return (
    <>
      <section ref={ref} className="welcome-three" id={id}>
        <Container>
          <Row>
            <Col xl={6}>
              <div className="welcome-three__left">
                <Title title={title} tagline={tagline} className="text-left" />
                <ul className="list-unstyled welcome-three__points">
                  {points.map(({ id, title }) => (
                    <li key={id}>
                      <div className="icon">
                        <i className="fa fa-arrow-right"></i>
                      </div>
                      <div className="text">
                        <p>{title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="list-unstyled welcome-three__points-content">
                  {points.map(({ id, text }) => (
                    <li key={id}>
                      <p className="welcome-three__points-text">
                        <TextSplit text={text} />
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="welcome-three__text">{text}</p>
                <div className="welcome-three__progress">
                  <div className="welcome-three__progress-single">
                    <h4 className="welcome-three__progress-title">
                      Consulting
                    </h4>
                    <VisibilitySensor
                      offset={{ top: 10 }}
                      delayedCall={true}
                      onChange={onVisibilityChange}
                    >
                      <div className="bar">
                        <div
                          className="bar-inner count-bar"
                          style={{ width: `${countStart ? percent : 0}%` }}
                        >
                          <div
                            className="count-text"
                            style={{ opacity: countStart ? 1 : 0 }}
                          >
                            <CountUp
                              start={0}
                              end={countStart ? percent : 0}
                              duration={1}
                            />
                            %
                          </div>
                        </div>
                      </div>
                    </VisibilitySensor>
                  </div>
                </div>
                <div className="welcome-three__bottom">
                  <Link href="/about" className="thm-btn welcome-three__btn">
                    Discover More
                  </Link>
                  <div className="welcome-three__video">
                    <a
                      onClick={() => setOpen(true)}
                      className="video-popup cursor-pointer"
                    >
                      <div
                        className="video-one__video-icon"
                        style={{ backgroundImage: `url(${videoBg.src})` }}
                      >
                        <span className="fa fa-play"></span>
                      </div>
                    </a>
                    <h5 className="welcome-three__video-text">{videoText}</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={6}>
              <div className="welcome-three__right animated slideInRight">
                <div className="welcome-three__img-box">
                  {images.map((image, i) => (
                    <div key={i} className={`welcome-three__img-${i + 1}`}>
                      <Image
                        src={require(`@/images/resources/${image}`).default.src}
                        alt=""
                      />
                    </div>
                  ))}
                  <div className="welcome-three__experience">
                    <p>{experienceText}</p>
                  </div>
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

export default WelcomeThree;

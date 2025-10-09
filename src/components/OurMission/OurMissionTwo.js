import { ourMissionTwo } from "@/data/ourMission";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import VideoModal from "../Reuseable/VideoModal";
import styles from "./ourmissiontwo.module.css"
const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const { title, videoId, videoText, thumbnail } = ourMissionTwo; // Assuming thumbnail is added to ourMissionTwo data

console.log("Thumbnail URL:", thumbnail); // Debugging line to check thumbnail URL
const OurMissionTwo = ({ className = "", shape = 2 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start with muted
  const videoRef = useRef(null);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <section className={`our-mission-two ${className}`}>
        <div className="our-mission-two-bg-box">
          <video
            ref={videoRef}
            loop
            muted={isMuted}
            playsInline
            className={`our-mission-two-bg-video ${styles.OurMissionTwo_vedio}`}
            style={{
              height: "auto",
              objectFit: "cover",
              display: isPlaying ? "block" : "none",
            }}
          >
            <source src="/videos/introvideo.mp4" type="video/mp4" />
          </video>
          {!isPlaying && thumbnail && (
            <div
              className="our-mission-two-thumbnail"
              style={{
                width: "100%",
                height: "auto",
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></div>
          )}
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
          <Row className="align-items-center">
            <Col xl={12} lg={12} className="text-center">
              <div className="our-mission-two__left">
                <h2 className="our-mission-two__title">
                  <TextSplit text={title} />
                </h2>
              </div>
            </Col>
            <Col xl={4} lg={4} className="offset-xl-8 offset-lg-8 text-right">
              <div className="our-mission-two__right">
                <div className="our-mission-two__video-link">
                  <a
                    onClick={handleTogglePlay}
                    style={{ cursor: "pointer" }}
                    className="video-popup"
                  >
                    <div
                      className={`our-mission-two__video-icon ${styles.OurMissionTwo_vedioicon}`}
                    >
                      <span
                        className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}
                      ></span>
                      <i className="ripple"></i>
                    </div>
                  </a>
                  <button
                    onClick={handleToggleMute}
                    className= {`our-mission-two__mute-btn ${styles.our_mission_two__mute_btn}`}
                    style={{
                     
                      background: "none",
                      border: "none",
                      marginTop: "40px",
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "#fff",
                    }}
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                  {isPlaying === false ? (
                    <h3 className="our-mission-two__video-text">{videoText}</h3>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OurMissionTwo;

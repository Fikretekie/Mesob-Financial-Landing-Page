import { ourMissionTwo } from "@/data/ourMission";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import VideoModal from "../Reuseable/VideoModal";
import styles from "./ourmissiontwo.module.css";
const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const { title, videoId, videoText, thumbnail } = ourMissionTwo;

console.log("Thumbnail URL:", thumbnail);

const AboutVideo = ({ className = "", shape = 2 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
          {/* Thumbnail - shown when not playing */}
          {!isPlaying && thumbnail && (
            <div
              className={`our-mission-two-thumbnail ${styles.thumbnail}`}
              style={{
                backgroundImage: `url(${thumbnail})`,
              }}
            ></div>
          )}

          {/* Video - always rendered but visibility controlled */}
          <video
            ref={videoRef}
            loop
            muted={isMuted}
            playsInline
            className={`our-mission-two-bg-video ${styles.OurMissionTwo_vedio}`}
            style={{

              display: isPlaying ? "block" : "none",
            }}
          >
            <source src="/videos/final.mp4" type="video/mp4" />
          </video>

          {/* Play button and text - shown when not playing */}
          {!isPlaying && (
            <div className={styles.videoOverlay}>
              <div className="our-mission-two__video-link">
                <a
                  onClick={handleTogglePlay}
                  style={{ cursor: "pointer" }}
                  className="video-popup"
                >
                  <div
                    className={`our-mission-two__video-icon ${styles.OurMissionTwo_vedioicon}`}
                  >
                    <span className="fa fa-play"></span>
                    <i className="ripple"></i>
                  </div>
                </a>
                <h3
                  className={`our-mission-two__video-text ${styles.videoText}`}
                >
                  {videoText}
                </h3>
              </div>
            </div>
          )}
        </div>

        {Array.from(Array(3)).map((_, i) => (
          <div
            key={i}
            className={`our-mission${shape === 2 ? "-two" : ""}-shape-${i + 1
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

            {/* Controls moved below when playing */}
            {isPlaying && (
              <Col xl={4} lg={4} className="offset-xl-8 offset-lg-8 text-right">
                <div className="our-mission-two__right">
                  <div className={styles.playingControls}>
                    <a
                      onClick={handleTogglePlay}
                      style={{ cursor: "pointer" }}
                      className="video-popup"
                    >
                      <div
                        className={`our-mission-two__video-icon ${styles.OurMissionTwo_vedioicon}`}
                      >
                        <span className="fa fa-pause"></span>
                        <i className="ripple"></i>
                      </div>
                    </a>
                    <button
                      onClick={handleToggleMute}
                      className={`our-mission-two__mute-btn ${styles.our_mission_two__mute_btn}`}
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </button>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutVideo;

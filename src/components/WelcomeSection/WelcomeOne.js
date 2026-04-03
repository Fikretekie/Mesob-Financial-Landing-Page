import { welcomeOne } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";
import SingleFeatureOne from "./SingleFeatureOne";
import styles from "./singlefeature.module.css";
import Link from "next/link";

const { tagline, title, bg, videoId, features } = welcomeOne;

const WelcomeOne = ({ id = "" }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useActive(id);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlaying = () => setIsPlaying(!video.paused);
    const syncMuted = () => setIsMuted(video.muted);

    video.addEventListener("play", syncPlaying);
    video.addEventListener("pause", syncPlaying);
    video.addEventListener("volumechange", syncMuted);

    video.muted = false;
    const attempt = video.play();
    if (attempt !== undefined) {
      attempt
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
        });
    }

    return () => {
      video.removeEventListener("play", syncPlaying);
      video.removeEventListener("pause", syncPlaying);
      video.removeEventListener("volumechange", syncMuted);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p !== undefined) p.catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "16px",
                      alignItems: "center",
                      marginTop: "30px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Link href="/demo" className="welcome-one__demo-btn">
                      Try Demo — No Signup
                    </Link>
                    <Link
                      href="https://app.meksova.com/signup"
                      className="welcome-one__trial-btn"
                    >
                      Start 30-Day Free Trial
                    </Link>
                  </div>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "13px",
                      color: "rgba(231, 230, 230, 1)",
                    }}
                  >
                    No credit card required. Full access for 30 days.
                  </p>
                </div>
              </Col>
              <Col xl={6} lg={6}>
                <div className="welcome-one__top-right">
                  <div className="welcome-one__video-link animated fadeInRight">
                    <div className={styles.heroVideo}>
                      <video
                        ref={videoRef}
                        autoPlay
                        loop
                        playsInline
                        className={`rounded-2xl shadow-lg ${styles.welcome_one_vedio}`}
                      >
                        <source src="/videos/final.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div
                        className={styles.heroVideoControls}
                        role="group"
                        aria-label="Video playback"
                      >
                        <button
                          type="button"
                          className={styles.heroVideoBtn}
                          onClick={togglePlay}
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? "❚❚" : "▶"}
                        </button>
                        <button
                          type="button"
                          className={styles.heroVideoBtn}
                          onClick={toggleMute}
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? "🔇" : "🔊"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="welcome-one__bottom">
            <h2 className="welcome-one__business-type-title">
              Select Your Business Type
            </h2>
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

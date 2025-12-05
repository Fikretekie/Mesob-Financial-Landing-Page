import { welcomeOne } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React, { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";
import SingleFeatureOne from "./SingleFeatureOne";
import styles from "./singlefeature.module.css"
const { tagline, title, bg, videoId, features } = welcomeOne;

const WelcomeOne = ({ id = "" }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useActive(id);

  // 🎥 video control states
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // ✅ start with sound ON

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false; // try to start with sound
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // Autoplay with sound failed, fallback to muted
            videoRef.current.muted = true;
            setIsMuted(true);
          });
      }
    }
  }, []);

  // ✅ Play / Pause toggle function
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // ✅ Mute / Unmute toggle function
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

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
                  <div
                    className="welcome-one__video-link animated fadeInRight relative inline-block"
                  >

                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      playsInline

                      className={` rounded-2xl shadow-lg ${styles.welcome_one_vedio}`}

                    >
                      <source src="/videos/introvideo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* 🎛 Overlay Video Controls */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-2 bg-black/60 text-white rounded-lg hover:bg-black/80"
                      >
                        {isPlaying ? "❚❚" : "▶"}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2 bg-black/60 text-white rounded-lg hover:bg-black/80"
                      >
                        {isMuted ? "🔇" : "🔊"}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="welcome-one__bottom">
            <h2 className="welcome-one__business-type-title">Select Your Business Type</h2>
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

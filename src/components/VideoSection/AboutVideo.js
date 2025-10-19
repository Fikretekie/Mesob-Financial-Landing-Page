import React, { useState, useRef } from "react";
import styles from "./ourmissiontwo.module.css";
import thumbnail from "../../assets/videothumbnail.png"

const AboutVideo = ({ className = "" }) => {
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
      <section className={`${className}`}>
        <div className={styles.aboutVideoWrapper} style={{ maxWidth: "100%", marginBottom: 30, padding: "0" }}>
          {/* Video Container with Thumbnail Background */}
          <div
            className={styles.videoContainerAbout}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "880px",
              maxHeight: "480px",
              margin: "0 auto",
              height: "auto",
              aspectRatio: "16/9",
              overflow: "hidden",
              borderRadius: "20px",
              backgroundColor: "#000",
            }}
          >
            {/* Thumbnail - shown when not playing */}
            {!isPlaying && thumbnail && (
              <div
                className={styles.thumbnailAbout}
                style={{
                  backgroundImage: `url(${thumbnail?.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  borderRadius: "20px",
                }}
              />
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              loop
              muted={isMuted}
              playsInline
              className={styles.videoAbout}
              style={{
                display: isPlaying ? "block" : "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 2,
                borderRadius: "20px",
              }}
            >
              <source src="/videos/introvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Central Play/Pause Button */}
            <div
              className={styles.centerPlayButton}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <a
                onClick={handleTogglePlay}
                style={{ cursor: "pointer" }}
                className="video-popup"
              >
                <div
                  className={`our-mission-two__video-icon ${styles.OurMissionTwo_vedioicon}`}
                >
                  <span className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}></span>
                  <i className="ripple"></i>
                </div>
              </a>
            </div>

            {/* Controls Bottom Bar - shown when playing */}
            {isPlaying && (
              <div
                className={styles.controlsBar}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  zIndex: 9,
                  backdropFilter: "blur(4px)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >


                {/* Mute Button */}
                <button
                  onClick={handleToggleMute}
                  className={styles.muteBtn}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "2px solid rgba(255, 255, 255, 0.6)",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(29, 107, 212, 0.8)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.6)";
                  }}
                >
                  <i className={`fa ${isMuted ? "fa-volume-off" : "fa-volume-up"}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutVideo;
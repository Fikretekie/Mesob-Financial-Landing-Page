import { welcomeOne } from "@/data/welcomeSection";
import useActive from "@/hooks/useActive";
import React, { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import VideoModal from "../Reuseable/VideoModal";
import SingleFeatureOne from "./SingleFeatureOne";
import styles from "./singlefeature.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
const { tagline, title, bg, videoId, features } = welcomeOne;

const WelcomeOne = ({ id = "" }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useActive(id);
  const router = useRouter();

  // 🎥 video control states
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // ✅ start with sound ON

    // 🔹 Demo Dialog States
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [otherBusinessType, setOtherBusinessType] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    // 🔹 Handle Try Demo Click
  const handleTryDemoClick = (e) => {
    e.preventDefault();
    setShowDemoDialog(true);
  };

  // 🔹 Handle Business Type Change
  const handleBusinessTypeChange = (value) => {
    setSelectedBusinessType(value);
    if (value !== "Other") {
      setOtherBusinessType("");
    }
  };


    // 🔹 Handle Next Step
  const handleNextStep = () => {
    const newErrors = {};

    if (!selectedBusinessType) {
      newErrors.businessType = "Please select a business type";
    }

    if (selectedBusinessType === "Other" && !otherBusinessType.trim()) {
      newErrors.otherBusinessType = "Please specify your business type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Store business type in sessionStorage or pass as query param
    const businessType = selectedBusinessType === "Other" ? otherBusinessType : selectedBusinessType;
    sessionStorage.setItem("demoBusinessType", businessType);

    // Navigate to demo page
    setTimeout(() => {
      router.push("/demo");
    }, 500);
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
                  <div className="welcome-one__demo-btn-wrapper">
                    <Link href="#" onClick={handleTryDemoClick}  className="welcome-one__demo-btn">
                      Try Demo
                    </Link>

                  </div>
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


      {/* 🔹 Demo Dialog Modal */}
      {showDemoDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowDemoDialog(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Select Business Type
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <select
                value={selectedBusinessType}
                onChange={(e) => {
                  handleBusinessTypeChange(e.target.value);
                  setErrors((prev) => ({ ...prev, businessType: "" }));
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: errors.businessType ? "2px solid red" : "2px solid #ddd",
                  outline: "none",
                  marginBottom: "8px",
                }}
              >
                <option value="">Select Business Type</option>
                <option value="Trucking">Trucking</option>
                <option value="RIDESHARE DRIVERS/PARTNERS">
                  RIDESHARE DRIVERS/PARTNERS
                </option>
                <option value="Groceries">Groceries</option>
                <option value="Individual/Households">
                  Individual/Households
                </option>
                <option value="Cafe">Restaurant/Cafe</option>
                <option value="Cleaning Services">Cleaning Services</option>
                <option value="⁠Beauty & Grooming">
                  ⁠Beauty & Grooming (Salons, Barbershops)
                </option>
                <option value="E-commerce Sellers">
                  E-commerce Sellers (Shopify, Amazon, Etsy)
                </option>
                <option value="Construction Trades">
                  Construction Trades (Plumbing, Electrical, Painting, etc.)
                </option>
                <option value="Content Creator">Content Creator</option>
                <option value="Other">Other Businesses</option>
              </select>
              {errors.businessType && (
                <p style={{ color: "red", fontSize: "14px", margin: "0" }}>
                  {errors.businessType}
                </p>
              )}
            </div>

            {selectedBusinessType === "Other" && (
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Specify your business type"
                  value={otherBusinessType}
                  onChange={(e) => {
                    setOtherBusinessType(e.target.value);
                    setErrors((prev) => ({ ...prev, otherBusinessType: "" }));
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: errors.otherBusinessType ? "2px solid red" : "2px solid #ddd",
                    outline: "none",
                    marginBottom: "8px",
                  }}
                />
                {errors.otherBusinessType && (
                  <p style={{ color: "red", fontSize: "14px", margin: "0" }}>
                    {errors.otherBusinessType}
                  </p>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowDemoDialog(false)}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                  backgroundColor: "#fff",
                  color: "#333",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isLoading ? "#ccc" : "#3b82f6",
                  color: "#fff",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Loading..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
      <VideoModal isOpen={isOpen} setOpen={setOpen} videoId={videoId} />
    </>
  );
};

export default WelcomeOne;

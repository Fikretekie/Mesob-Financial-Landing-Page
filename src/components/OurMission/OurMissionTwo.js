// import { ourMissionTwo } from "@/data/ourMission";
// import dynamic from "next/dynamic";
// import React, { useState, useRef } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import JarallaxImage from "../Jarallax/JarallaxImage";
// import Link from "../Reuseable/Link";
// import TextSplit from "../Reuseable/TextSplit";
// import VideoModal from "../Reuseable/VideoModal";

// const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

// const { title, videoId, videoText } = ourMissionTwo;

// const OurMissionTwo = ({ className = "", shape = 2 }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   const handleTogglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <>
//       <section className={`our-mission-two ${className}`}>
//         <div className="our-mission-two-bg-box">
//           <video
//             ref={videoRef}
//             className="our-mission-two-bg-video"
//             loop
//             muted
//             playsInline
//             style={{
//               width: '100%',
//               height: 'auto',
//               objectFit: 'cover',
//               display: isPlaying ? 'block' : 'none'
//             }}
//           >
//             <source src="/videos/introvideo.mp4" type="video/mp4" />
//           </video>
//         </div>
//         {Array.from(Array(3)).map((_, i) => (
//           <div
//             key={i}
//             className={`our-mission${shape === 2 ? "-two" : ""}-shape-${i + 1
//               } shapemover2`}
//           ></div>
//         ))}
//         <Container>
//           <Row>
//             <Col xl={8} lg={8}>
//               <div className="our-mission-two__left">
//                 <h2 className="our-mission-two__title">
//                   <TextSplit text={title} />
//                 </h2>
//               </div>
//             </Col>
//             <Col xl={4} lg={4}>
//               <div className="our-mission-two__right">
//                 <div className="our-mission-two__video-link">
//                   <a
//                     onClick={handleTogglePlay}
//                     style={{ cursor: "pointer" }}
//                     className="video-popup"
//                   >
//                     <div className="our-mission-two__video-icon">
//                       <span className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></span>
//                       <i className="ripple"></i>
//                     </div>
//                   </a>
//                   <h3 className="our-mission-two__video-text">{videoText}</h3>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default OurMissionTwo;

import { ourMissionTwo } from "@/data/ourMission";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import JarallaxImage from "../Jarallax/JarallaxImage";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import VideoModal from "../Reuseable/VideoModal";

const Jarallax = dynamic(() => import("../Jarallax/Jarallax"), { ssr: false });

const { title, videoId, videoText } = ourMissionTwo;

const OurMissionTwo = ({ className = "", shape = 2 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <>
      <section className={`our-mission-two ${className}`}>
        <div className="our-mission-two-bg-box">
          <video
            ref={videoRef}
            className="our-mission-two-bg-video"
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: isPlaying ? "block" : "none",
            }}
          >
            <source src="/videos/introvideo.mp4" type="video/mp4" />
          </video>
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
                    <div className="our-mission-two__video-icon">
                      <span
                        className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}
                      ></span>
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
    </>
  );
};

export default OurMissionTwo;

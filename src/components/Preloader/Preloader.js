
const preloaderImageSrc = "/tlogo.png";
import React from "react";
import { Image } from "react-bootstrap";

const Preloader = ({ loading = true }) => {
  return (
    <div
      style={{
        zIndex: loading ? 9999 : -1,
        opacity: loading ? 1 : 0,
        transition: 'opacity 0.5s ease, z-index 0.5s ease',
      }}
      className={`preloader animated${loading ? "" : " fadeOut"}`}
    >
      <Image className="preloader__image" width={60} src={preloaderImageSrc} alt="preloader" />
    </div>
  );
};

export default Preloader;

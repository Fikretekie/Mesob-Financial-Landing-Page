import image from "@/images/loader.png";
import React from "react";
import { Image } from "react-bootstrap";

const Preloader = ({ loading = true }) => {
  return (
    <div
      style={{
        zIndex: loading ? 9999 : -1,
      }}
      className={`preloader animated${loading ? "" : " fadeOut"}`}
    >
      <Image className="preloader__image" width={60} src={image.src} alt="" />
    </div>
  );
};

export default Preloader;

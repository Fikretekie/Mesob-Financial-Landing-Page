import React from "react";
import { Image } from "react-bootstrap";

const SingleTab = ({ tab = {}, current = "solutions" }) => {
  const { id, image, title, text } = tab;

  return (
    <div
      className={`tab animated${current === id ? " active-tab fadeInUp" : ""}`}
      id={id}
    >
      <div className="tab-content__inner">
        <div className="tab-content__img">
          <Image src={image.src} alt="" />
        </div>
        <div className="tab-content__contnet">
          <h4 className="tab-content__title">{title}</h4>
          <p className="tab-content__text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTab;

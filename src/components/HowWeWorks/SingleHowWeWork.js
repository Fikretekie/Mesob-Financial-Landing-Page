import React from "react";

const SingleHowWeWork = ({ work = {} }) => {
  const { icon, title, text } = work;

  return (
    <li className="how-we-works__single animated fadeInUp">
      <div className="how-we-works__icon-box">
        <div className="how-we-works__icon">
          <div className="how-we-works__icon">
            <span className={icon}></span>
            <div className="how-we-works__count"></div>
          </div>
        </div>
      </div>
      <h3 className="how-we-works__title">{title}</h3>
      <p className="how-we-works__text">{text}</p>
    </li>
  );
};

export default SingleHowWeWork;

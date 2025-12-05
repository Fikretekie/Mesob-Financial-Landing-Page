import React from "react";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleServiceOne = ({ service = {} }) => {
  const { title, icon, href, text } = service;

  return (
    <li className="services-one__feature-single animated fadeInUp">
      <div className="services-one__feature-left">
        <div className="services-one__feature-title-row">
          <div className="services-one__feature-icon">
            <span className={icon}></span>
          </div>
          <h3 className="services-one__feature-title">
            <Link href={href}>
              <TextSplit text={title} />
            </Link>
          </h3>
        </div>
        {text && <p className="services-one__feature-text">{text}</p>}
        <div className="services-one__feature-arrow">
          <Link href={href}>
            <span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
      <div className="services-one__feature-right">
        <div className="services-one__feature-count"></div>
      </div>
    </li>
  );
};

export default SingleServiceOne;

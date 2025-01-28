import React from "react";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleFeatureOne = ({ feature = {} }) => {
  const { title, href, icon } = feature;

  return (
    <li className="welcome-one__feature-single animated fadeInUp">
      <div className="welcome-one__feature-content">
        <h3 className="welcome-one__feature-title">
          <Link href={href}>
            <TextSplit text={title} />
          </Link>
        </h3>
        <div className="welcome-one__feature-arrow">
          <Link href={href}>
            <span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
      <div className="welcome-one__feature-icon">
        <span className={icon}></span>
      </div>
      <div className="welcome-one__feature-count"></div>
    </li>
  );
};

export default SingleFeatureOne;

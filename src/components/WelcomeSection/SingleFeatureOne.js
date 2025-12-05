import React from "react";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import styles from "./singlefeature.module.css"
const SingleFeatureOne = ({ feature = {} }) => {
  const { title, href, icon } = feature;

  return (
    <li className= {`welcome-one__feature-single animated fadeInUp ${styles.welcome_one}`}>
      <div className="welcome-one__feature-icon">
        <span className={icon}></span>
      </div>
      <div className="welcome-one__feature-content">
        <h3 className="welcome-one__feature-title">
          <Link href={href}>
            <TextSplit text={title} />
          </Link>
        </h3>
      </div>
      <div className="welcome-one__feature-right">
        <div className="welcome-one__feature-count"></div>
        <div className="welcome-one__feature-arrow">
          <Link href={href}>
            <span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default SingleFeatureOne;

import React from "react";
import { Col } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleServiceTwo = ({ service = {} }) => {
  const { icon, title, href, text } = service;

  return (
    <Col xl={3} lg={6} md={6} className="animated fadeInLeft">
      <div className="services-two__single">
        <div className="services-two__icon">
          <span className={icon}></span>
        </div>
        <h3 className="services-two__title">
          <Link href={href}>
            <TextSplit text={title} />
          </Link>
        </h3>
        <p className="services-two__text">
          <TextSplit text={text} />
        </p>
        <div className="services-two__bottom-box">
          <Link href={href} className="services-two__read-more">
            Read More
          </Link>
          <Link href={href} className="services-two__arrow">
            <span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default SingleServiceTwo;

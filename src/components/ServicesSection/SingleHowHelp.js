import React from "react";
import { Col, Image } from "react-bootstrap";

const SingleHowHelp = ({ howHelp = {} }) => {
  const { id, image, text, points = [] } = howHelp;

  return (
    <Col xl={6}>
      <div className="service-details__how-help-single">
        <div className="service-details__how-help-img">
          <Image
            src={require(`@/images/services/${image}`).default.src}
            alt=""
          />
        </div>
        <div className="service-details__how-help-content">
          <p className={`service-details__how-help-text-${id}`}>{text}</p>
          <ul className="list-unstyled service-details__how-help-points">
            {points.map((text, i) => (
              <li key={i}>
                <div className="icon">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="text">
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default SingleHowHelp;

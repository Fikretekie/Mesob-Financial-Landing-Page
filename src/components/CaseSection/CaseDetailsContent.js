import React from "react";
import { Col, Row } from "react-bootstrap";

const CaseDetailsContent = ({
  title = "",
  text1 = "",
  text2 = "",
  text3 = "",
  text4 = "",
  points = [],
}) => {
  return (
    <div className="case-details__content">
      <Row>
        <Col xl={8} lg={7}>
          <div className="case-details__content-left">
            <h3 className="case-details__content-title">{title}</h3>
            <p className="case-details__content-text-1">{text1}</p>
            <p className="case-details__content-text-2">{text2}</p>
            <p className="case-details__content-text-3">{text3}</p>
          </div>
        </Col>
        <Col xl={4} lg={5}>
          <div className="case-details__content-right">
            <p className="case-details__content-text-4">{text4}</p>
            <ul className="list-unstyled case-details__content-points">
              {points.map((point, i) => (
                <li key={i}>
                  <div className="icon">
                    <i className="fa fa-arrow-right"></i>
                  </div>
                  <div className="text">
                    <p>{point}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CaseDetailsContent;

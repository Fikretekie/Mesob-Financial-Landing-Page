import { qualityWork } from "@/data/qualityWork";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import Title from "../Reuseable/Title";
import SingleTab from "./SingleTab";

const { tagline, title, tabs, points } = qualityWork;

const QualityWork = () => {
  const [current, setCurrent] = useState("solutions");

  return (
    <section className="quality-work">
      <div className="quality-work-shape-1 float-bob-x-2"></div>
      <div className="quality-work-shape-2 float-bob-x-2"></div>
      <Container>
        <Row>
          <Col xl={7} lg={7}>
            <div className="quality-work__left">
              <Title tagline={tagline} className="text-left">
                <TextSplit text={title} />
              </Title>
              <div className="quality-work__tab-box tabs-box">
                <ul className="tab-buttons clearfix list-unstyled">
                  {tabs.map(({ id, tagline }) => (
                    <li
                      onClick={() => setCurrent(id)}
                      key={id}
                      className={`tab-btn${
                        current === id ? " active-btn" : ""
                      }`}
                    >
                      <span>{tagline}</span>
                    </li>
                  ))}
                </ul>
                <div className="tabs-content">
                  {tabs.map((tab) => (
                    <SingleTab key={tab.id} tab={tab} current={current} />
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col xl={5} lg={5}>
            <div className="quality-work__right">
              <ul className="quality-work__points list-unstyled">
                {points.map(({ id, icon, title, text }) => (
                  <li key={id}>
                    <div className="icon">
                      <span className={icon}></span>
                    </div>
                    <div className="text">
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QualityWork;

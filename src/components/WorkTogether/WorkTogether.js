import { workTogether } from "@/data/workTogether";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";

const {
  shape,
  image1,
  image2,
  tagline,
  title,
  text,
  points,
  parsonImage,
  personName,
} = workTogether;

const WorkTogether = ({ id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className="work-together" id={id}>
      <Container>
            <div className="work-together__right">
              <Title title={title} tagline={tagline} className="text-left" />
              <p className="work-together__right-text">{text}</p>
              <ul className="list-unstyled work-together__points">
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
              <div className="work-together__person">
                <div className="work-together__person-img">
                  <Image src={parsonImage.src} alt="" />
                </div>
                <h2 className="work-together__person-name">{personName}</h2>
              </div>
            </div>
      </Container>
    </section>
  );
};

export default WorkTogether;

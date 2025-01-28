import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleSlideThree = ({ slider = {} }) => {
  const { bg, images, shapes, socials, dateRange, timeRange, title } = slider;

  return (
    <>
      <div
        className="image-layer"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>

      {images.map((image, i) => (
        <div key={i} className={`main-slider-three-img-${i + 1}`}>
          <Image
            src={require(`@/images/resources/${image}`).default.src}
            alt=""
          />
        </div>
      ))}
      {shapes.map((shape, i) => (
        <div key={i} className={`main-slider-three-shape-${i + 1}`}>
          <Image src={require(`@/images/shapes/${shape}`).default.src} alt="" />
        </div>
      ))}
      <div className="main-slider-three__social">
        {socials.map(({ id, title, href }) => (
          <a key={id} href={href}>
            {title}
          </a>
        ))}
      </div>
      <div className="main-slider-three__date-time">
        <p>
          {dateRange} <span> {timeRange} </span>
        </p>
      </div>
      <Container>
        <Row>
          <Col xl={8}>
            <div className="main-slider__content">
              <h2>
                <TextSplit text={title} highlight="&" />
              </h2>
              <Link href="/about" className="thm-btn">
                Discover More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleSlideThree;

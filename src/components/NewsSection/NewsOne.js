import { newsOne } from "@/data/newsSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleNewsOne from "./SingleNewsOne";

const { tagline, title, newsData } = newsOne;

const NewsOne = ({
  className = "news-one",
  showShape = false,
  id = "",
  hideTitle = false,
  children,
}) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className={className} id={id}>
      {showShape && (
        <>
          <div className="news-one-shape-1 shapemover2"></div>
          <div className="news-one-shape-2 float-bob-x-2"></div>
        </>
      )}
      <Container>
        {!hideTitle && (
          <Title title={title} tagline={tagline} className="text-center" />
        )}
        <Row>
          {newsData.slice(0, !hideTitle ? 3 : undefined).map((news) => (
            <Col
              xl={4}
              lg={hideTitle ? 6 : 4}
              md={hideTitle ? 6 : undefined}
              key={news.id}
              className="animated fadeInUp"
            >
              <SingleNewsOne news={news} />
            </Col>
          ))}
        </Row>
        {children}
      </Container>
    </section>
  );
};

export default NewsOne;

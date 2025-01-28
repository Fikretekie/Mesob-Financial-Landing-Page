import { newsSidebar, newsSidebarSide } from "@/data/newsSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewsSidebarLeft from "./NewsSidebarLeft";
import NewsSidebarSide from "./NewsSidebarSide";

const { newses } = newsSidebar;

const NewsSidebar = ({ className = "" }) => {
  return (
    <section className={`news-sidebar ${className}`}>
      <Container>
        <Row>
          <Col xl={8} lg={7}>
            <NewsSidebarLeft newses={newses} />
          </Col>
          <Col xl={4} lg={5}>
            <NewsSidebarSide {...newsSidebarSide} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsSidebar;

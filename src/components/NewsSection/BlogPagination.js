import React from "react";
import { Col, Row } from "react-bootstrap";

const BlogPagination = () => {
  return (
    <Row>
      <Col lg={12}>
        <div className="blog-pagination">
          <a className="prev page-numbers" href="#">
            <i className="fa fa-angle-left"></i>
          </a>
          <span className="page-numbers current">1</span>
          <a className="page-numbers" href="#">
            2
          </a>
          <a className="next page-numbers" href="#">
            <i className="fa fa-angle-right"></i>
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default BlogPagination;

import { counterOne } from "@/data/counter";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import VisibilityCountUp from "../Reuseable/VisibilityCountUp";

const CounterOne = () => {
  return (
    <section className="counter-one">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="counter-one__inner">
              <ul className="list-unstyled counter-one__list">
                {counterOne.map(({ id, icon, count, text }) => (
                  <li
                    key={id}
                    className="counter-one__single animated fadeInUp"
                  >
                    <div className="counter-one__icon">
                      <span className={icon}></span>
                    </div>
                    <h3 className="odometer">
                      <VisibilityCountUp count={count} />
                    </h3>
                    <p className="counter-one__text">{text}</p>
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

export default CounterOne;

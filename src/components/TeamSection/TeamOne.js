import { teamOne } from "@/data/teamSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleTeamOne from "./SingleTeamOne";

const { tagline, title, teams } = teamOne;

const TeamOne = ({ id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className="team-one" id={id}>
      <div className="team-one__container">
        <Title title={title} tagline={tagline} className="text-center" />
        <Row>
          {teams.map((team) => (
            <Col
              xl={3}
              lg={6}
              md={6}
              key={team.id}
              className="animated fadeInUp"
            >
              <SingleTeamOne team={team} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TeamOne;

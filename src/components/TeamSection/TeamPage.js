import { teamPage } from "@/data/teamSection";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleTeamOne from "./SingleTeamOne";

const TeamPage = () => {
  return (
    <section className="team-page">
      <Container>
        <Row>
          {teamPage.slice(0, 6).map((team) => (
            <Col
              xl={4}
              lg={6}
              md={6}
              key={team.id}
              className="animated fadeInUp"
            >
              <SingleTeamOne team={team} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamPage;

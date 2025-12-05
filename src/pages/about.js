import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "../../src/components/Reuseable/PageHeader";
import WorkTogetherTwo from "@/components/WorkTogether/WorkTogetherTwo";
import Videopage from "@/components/VideoSection/AboutVideo";
import React from "react";
import OurMission from "@/components/VideoSection/OurMission";

const About = () => {
  return (
    <Layout pageTitle="About">
      <Header />
      <PageHeader page="About" title="About us" />
      <WorkTogetherTwo />
      {/* <OurMissionTwo className="our-mission-three" shape={1} /> */}
      <Videopage />
      <OurMission/>
    </Layout>
  );
};

export default About;

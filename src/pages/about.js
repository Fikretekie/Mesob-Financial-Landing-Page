import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import OurMissionTwo from "@/components/OurMission/OurMissionTwo";
// import PageHeader from "@/components/Reuseable/PageHeader";
import PageHeader from "../../src/components/Reuseable/PageHeader";
import TeamOne from "@/components/TeamSection/TeamOne";
// import TestimonialOne from "@/components/TestimonialSection/TestimonialOne";
import WorkTogetherTwo from "@/components/WorkTogether/WorkTogetherTwo";
import React from "react";

const About = () => {
  return (
    <Layout pageTitle="About">
      <Header />
      <PageHeader page="About" title="About us" />
      <WorkTogetherTwo />
      <OurMissionTwo className="our-mission-three" shape={1} />
    </Layout>
  );
};

export default About;

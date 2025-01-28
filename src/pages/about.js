import BrandOne from "@/components/BrandSection/BrandOne";
import CtaOne from "@/components/CtaSection/CtaOne";
import FreeConsultation from "@/components/FreeConsultation/FreeConsultation";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import OurMissionTwo from "@/components/OurMission/OurMissionTwo";
import QualityWork from "@/components/QualityWork/QualityWork";
import PageHeader from "@/components/Reuseable/PageHeader";
import TeamOne from "@/components/TeamSection/TeamOne";
import TestimonialOne from "@/components/TestimonialSection/TestimonialOne";
import WorkTogetherTwo from "@/components/WorkTogether/WorkTogetherTwo";
import React from "react";

const About = () => {
  return (
    <Layout pageTitle="About">
      <Header />
      <PageHeader page="About" title="About us" />
      <WorkTogetherTwo />
      <FreeConsultation />
      <QualityWork />
      <OurMissionTwo className="our-mission-three" shape={1} />
      <TeamOne />
      <TestimonialOne className="testimonial-two" />
      <BrandOne />
      <CtaOne />
    </Layout>
  );
};

export default About;

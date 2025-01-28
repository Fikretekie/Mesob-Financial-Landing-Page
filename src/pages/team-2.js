import CtaOne from "@/components/CtaSection/CtaOne";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import TeamPageCarousel from "@/components/TeamSection/TeamPageCarousel";
import React from "react";

const Team2 = () => {
  return (
    <Layout pageTitle="Team Carousel">
      <Header />
      <PageHeader page="Team" title="Team Carousel" />
      <TeamPageCarousel />
      <CtaOne />
    </Layout>
  );
};

export default Team2;

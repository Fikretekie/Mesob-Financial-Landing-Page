import CtaOne from "@/components/CtaSection/CtaOne";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import TeamPage from "@/components/TeamSection/TeamPage";
import React from "react";

const team = () => {
  return (
    <Layout pageTitle="Team">
      <Header />
      <PageHeader page="Team" title="Our Team" />
      <TeamPage />
      <CtaOne />
    </Layout>
  );
};

export default team;

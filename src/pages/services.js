import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServicesOne from "@/components/ServicesSection/ServicesOne";
import OurMission from "@/components/VideoSection/OurMission";
import React from "react";

const Services = () => {
  return (
    <Layout
      pageTitle="Services - Meksova"
      pageDescription="Meksova features and business types we support—from trucking and groceries to households and professional services."
      footerClassName="site-footer-three"
    >
      <Header />
      <PageHeader page="services" title="Our Services" />
      <ServicesOne hideTitle />
      <OurMission/>
    </Layout>
  );
};

export default Services;

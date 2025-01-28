import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServicesOne from "@/components/ServicesSection/ServicesOne";
import React from "react";

const Services = () => {
  return (
    <Layout pageTitle="Services" footerClassName="site-footer-three">
      <Header />
      <PageHeader page="services" title="Our Services" />
      <ServicesOne hideTitle />
    </Layout>
  );
};

export default Services;

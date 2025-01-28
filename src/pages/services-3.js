import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServicePage from "@/components/ServicesSection/ServicePage";
import React from "react";

const Services3 = () => {
  return (
    <Layout pageTitle="Services Style Two" footerClassName="site-footer-three">
      <Header />
      <PageHeader page="services" title="Services Style Two" />
      <ServicePage />
    </Layout>
  );
};

export default Services3;

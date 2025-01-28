import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServicesOneCarousel from "@/components/ServicesSection/ServicesOneCarousel";
import React from "react";

const Services2 = () => {
  return (
    <Layout pageTitle="Services Carousel" footerClassName="site-footer-three">
      <Header />
      <PageHeader page="services" title="Services Carousel" />
      <ServicesOneCarousel />
    </Layout>
  );
};

export default Services2;

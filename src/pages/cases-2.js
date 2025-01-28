import CasesPageCarousel from "@/components/CaseSection/CasesPageCarousel";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const Cases2 = () => {
  return (
    <Layout pageTitle="Cases Carousel" footerClassName="site-footer-three">
      <Header />
      <PageHeader page="Cases" title="Cases Carousel" />
      <CasesPageCarousel />
    </Layout>
  );
};

export default Cases2;

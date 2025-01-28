import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import NewsPageCarousel from "@/components/NewsSection/NewsPageCarousel";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const Blog2 = () => {
  return (
    <Layout pageTitle="Blog Carousel" footerClassName="site-footer-three">
      <Header />
      <PageHeader page="Blog" title="Blog Posts Carousel" />
      <NewsPageCarousel />
    </Layout>
  );
};

export default Blog2;

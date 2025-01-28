import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import NewsSidebar from "@/components/NewsSection/NewsSidebar";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const BlogSidebar = () => {
  return (
    <Layout pageTitle="Blog Sidebar" footerClassName="site-footer-three">
      <Header />
      <PageHeader title="Blog Sidebar" />
      <NewsSidebar />
    </Layout>
  );
};

export default BlogSidebar;

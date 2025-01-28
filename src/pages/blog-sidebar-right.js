import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import NewsSidebar from "@/components/NewsSection/NewsSidebar";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const BlogSidebarRight = () => {
  return (
    <Layout pageTitle="Blog Right Sidebar" footerClassName="site-footer-three">
      <Header />
      <PageHeader title="Blog Sidebar" />
      <NewsSidebar className="news-sidebar--right" />
    </Layout>
  );
};

export default BlogSidebarRight;

import ErrorPage from "@/components/ErrorPage/ErrorPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const NotFound = () => {
  return (
    <Layout pageTitle="404 Error" footerClassName="site-footer-three">
      <Header />
      <PageHeader title="404 Error" />
      <ErrorPage />
    </Layout>
  );
};

export default NotFound;

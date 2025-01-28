import CaseDetailsPage from "@/components/CaseSection/CaseDetailsPage";
import SimilarCase from "@/components/CaseSection/SimilarCase";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const CaseDetails = () => {
  return (
    <Layout pageTitle="Case Details" footerClassName="site-footer-three">
      <Header />
      <PageHeader title="case Details" />
      <CaseDetailsPage />
      <SimilarCase />
    </Layout>
  );
};

export default CaseDetails;

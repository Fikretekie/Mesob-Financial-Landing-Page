import ContactPage from "@/components/Contact/ContactPage";
import CtaOne from "@/components/CtaSection/CtaOne";
import FAQsPage from "@/components/FAQsPage/FAQsPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";

const Faq = () => {
  return (
    <Layout pageTitle="FAQs">
      <Header />
      <PageHeader title="FAQs" />
      <FAQsPage />
      <ContactPage />
      <CtaOne />
    </Layout>
  );
};

export default Faq;

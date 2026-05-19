import ContactPage from "@/components/Contact/ContactPage";
import FAQsPage from "@/components/FAQsPage/FAQsPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle={t("faq.meta.title")}>
      <Header />
      <PageHeader title={t("faq.pageTitle")} />
      <FAQsPage />
      <ContactPage />
    </Layout>
  );
};

export default Faq;

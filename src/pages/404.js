import ErrorPage from "@/components/ErrorPage/ErrorPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle={t("error.meta.title")} footerClassName="site-footer-three">
      <Header />
      <PageHeader title={t("error.pageTitle")} />
      <ErrorPage />
    </Layout>
  );
};

export default NotFound;

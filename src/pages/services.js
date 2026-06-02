import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServicesOne from "@/components/ServicesSection/ServicesOne";
import OurMission from "@/components/VideoSection/OurMission";
import React from "react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <Layout
      pageTitle={t("services.meta.title")}
      pageDescription={t("services.meta.description")}
      footerClassName="site-footer-three"
    >
      <Header />
      <PageHeader page={t("header.nav.services")} title={t("services.pageTitle")} />
      <ServicesOne hideTitle />
      <OurMission />
    </Layout>
  );
};

export default Services;

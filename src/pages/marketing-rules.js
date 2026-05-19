import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import ServiceDetails from "@/components/ServicesSection/ServiceDetails";
import { marketingRules } from "@/data/servicesSection";
import React from "react";
import { useTranslation } from "react-i18next";

const MarketingRules = () => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle={t("marketingRules.title")}>
      <Header />
      <PageHeader
        page={t("marketingRules.breadcrumbPage")}
        title={t("marketingRules.title")}
        parent={t("marketingRules.breadcrumbParent")}
        parentHref="/services"
      />
      <ServiceDetails service={marketingRules} />
    </Layout>
  );
};

export default MarketingRules;

import LegalDocument from "@/components/Legal/LegalDocument";
import Layout from "@/components/Layout/Layout";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle={t("legal.privacy.metaTitle")}>
      <LegalDocument namespace="privacy" />
    </Layout>
  );
};

export default PrivacyPolicy;

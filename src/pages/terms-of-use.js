import LegalDocument from "@/components/Legal/LegalDocument";
import Layout from "@/components/Layout/Layout";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <Layout pageTitle={t("legal.terms.metaTitle")}>
      <LegalDocument namespace="terms" />
    </Layout>
  );
};

export default TermsOfUse;

import ContactDetails from "@/components/Contact/ContactDetails";
import ContactPage from "@/components/Contact/ContactPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import OurMission from "@/components/VideoSection/OurMission";
import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout
      pageTitle={t("contact.meta.title")}
      pageDescription={t("contact.meta.description")}
    >
      <Header />
      <PageHeader title={t("contact.pageTitle")} />
      <ContactDetails />
      <ContactPage isTitleTwo />
      <OurMission />
    </Layout>
  );
};

export default Contact;

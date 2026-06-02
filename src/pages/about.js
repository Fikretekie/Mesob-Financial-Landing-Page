import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import WorkTogetherTwo from "@/components/WorkTogether/WorkTogetherTwo";
import Videopage from "@/components/VideoSection/AboutVideo";
import OurMission from "@/components/VideoSection/OurMission";
import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout
      pageTitle={t("about.meta.title")}
      pageDescription={t("about.meta.description")}
    >
      <Header />
      <PageHeader page={t("about.pageBreadcrumb")} title={t("about.pageTitle")} />
      <WorkTogetherTwo />
      <Videopage />
      <OurMission />
    </Layout>
  );
};

export default About;

import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Testimonials from "@/components/Testimonials";
import WelcomeOne from "@/components/WelcomeSection/WelcomeOne";
import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout
      pageTitle={t("home.meta.title")}
      pageDescription={t("home.meta.description")}
    >
      <Header />
      <WelcomeOne />
      <Testimonials />
    </Layout>
  );
};

export default Home;

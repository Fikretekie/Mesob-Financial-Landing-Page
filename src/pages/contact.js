import ContactDetails from "@/components/Contact/ContactDetails";
import ContactPage from "@/components/Contact/ContactPage";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import OurMission from "@/components/VideoSection/OurMission";
import React from "react";

const Contact = () => {
  return (
    <Layout pageTitle="Contact">
      <Header />
      <PageHeader title="Contact" />
      <ContactDetails />
      <ContactPage isTitleTwo />
      
      <OurMission />
    </Layout>
  );
};

export default Contact;

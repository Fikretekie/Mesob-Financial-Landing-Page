import CtaOne from "@/components/CtaSection/CtaOne";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/Reuseable/PageHeader";
import TestimonialsPage from "@/components/TestimonialSection/TestimonialsPage";
import React from "react";

const Testimonials = () => {
  return (
    <Layout pageTitle="Testimonials">
      <Header />
      <PageHeader page="Testimonials" title="Our Testimonials" />
      <TestimonialsPage />
      <CtaOne />
    </Layout>
  );
};

export default Testimonials;

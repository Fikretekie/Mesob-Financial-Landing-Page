// import BenefitsOne from "@/components/Benefits/BenefitsOne";
// import CaseOne from "@/components/CaseSection/CaseOne";
// import FreeConsultation from "@/components/FreeConsultation/FreeConsultation";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Testimonials from "@/components/Testimonials";
// import MainSlider from "@/components/MainSlider/MainSlider";
// import NewsOne from "@/components/NewsSection/NewsOne";
import OurMission from "@/components/VideoSection/OurMission";
// import TeamOne from "@/components/TeamSection/TeamOne";
// import TestimonialOne from "@/components/TestimonialSection/TestimonialOne";
// import TrustedOne from "@/components/TrustedSection/TrustedOne";
import WelcomeOne from "@/components/WelcomeSection/WelcomeOne";
// import WorkTogether from "@/components/WorkTogether/WorkTogether";
// import { mainSlider } from "@/data/mainSlider";
import React from "react";

const Home = () => {
  return (
    <Layout pageTitle="Mesob Financial">
      <Header />
      <WelcomeOne />
      {/* <OurMission /> */}
      <Testimonials />
    </Layout>
  );
};

export default Home;

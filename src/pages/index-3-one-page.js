import BrandOne from "@/components/BrandSection/BrandOne";
import CaseOne from "@/components/CaseSection/CaseOne";
import ContactOne from "@/components/Contact/ContactOne";
import FindSolution from "@/components/FindSolution/FindSolution";
import GoogleMapTwo from "@/components/GoogleMap/GoogleMapTwo";
import Header from "@/components/Header/Header";
import HowWeWorks from "@/components/HowWeWorks/HowWeWorks";
import Layout from "@/components/Layout/Layout";
import MainSliderThree from "@/components/MainSlider/MainSliderThree";
import NewsOne from "@/components/NewsSection/NewsOne";
import OurMissionTwo from "@/components/OurMission/OurMissionTwo";
import ServicesTwo from "@/components/ServicesSection/ServicesTwo";
import TestimonialThree from "@/components/TestimonialSection/TestimonialThree";
import WelcomeThree from "@/components/WelcomeSection/WelcomeThree";
import { onePageNavItemsThree } from "@/data/headerData";
import React from "react";

const Home3OnePage = () => {
  return (
    <Layout
      onePage
      navItems={onePageNavItemsThree}
      pageTitle="Onepage || Home Three"
      footerClassName="site-footer-three"
    >
      <Header
        mainMenuClass="main-menu-three"
        onePage
        navItems={onePageNavItemsThree}
      />
      <MainSliderThree id="home" />
      <FindSolution />
      <ServicesTwo id="services" />
      <WelcomeThree id="about" />
      <CaseOne id="cases" className="case-three" smallImage />
      <OurMissionTwo className="our-mission-three" shape={1} />
      <HowWeWorks />
      <TestimonialThree id="testimonial" />
      <BrandOne
        className="brand-two"
        showShape
        innerClassName="brand-two__inner"
      />
      <ContactOne id="contact" />
      <GoogleMapTwo />
      <NewsOne className="news-two" />
    </Layout>
  );
};

export default Home3OnePage;

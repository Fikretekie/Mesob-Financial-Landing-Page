//import BrandOne from "@/components/BrandSection/BrandOne";
import CaseOne from "@/components/CaseSection/CaseOne";
import ContactOne from "@/components/Contact/ContactOne";
import FindSolution from "@/components/FindSolution/FindSolution";
import GoogleMapTwo from "@/components/GoogleMap/GoogleMapTwo";
import Header from "@/components/Header/Header";
import HowWeWorks from "@/components/HowWeWorks/HowWeWorks";
import Layout from "@/components/Layout/Layout";
import MainSliderThree from "@/components/MainSlider/MainSliderThree";
import NewsOne from "@/components/NewsSection/NewsOne";
import ServicesTwo from "@/components/ServicesSection/ServicesTwo";
import TestimonialThree from "@/components/TestimonialSection/TestimonialThree";
import WelcomeThree from "@/components/WelcomeSection/WelcomeThree";
import React from "react";

const Home3 = () => {
  return (
    <Layout pageTitle="Home Three" footerClassName="site-footer-three">
      <Header mainMenuClass="main-menu-three" />
      <MainSliderThree />
      <FindSolution />
      <ServicesTwo />
      <WelcomeThree />
      <CaseOne className="case-three" smallImage />
      <HowWeWorks />
      <TestimonialThree />

      <ContactOne />
      <GoogleMapTwo />
      <NewsOne className="news-two" />
    </Layout>
  );
};

export default Home3;

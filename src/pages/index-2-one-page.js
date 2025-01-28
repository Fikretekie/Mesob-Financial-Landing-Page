import BrandOne from "@/components/BrandSection/BrandOne";
import CaseTwo from "@/components/CaseSection/CaseTwo";
import CounterOne from "@/components/Counter/CounterOne";
import CtaOne from "@/components/CtaSection/CtaOne";
import Experience from "@/components/Experience/Experience";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import HeaderTwo from "@/components/Header/HeaderTwo";
import Layout from "@/components/Layout/Layout";
import MainSlider from "@/components/MainSlider/MainSlider";
import NewsOne from "@/components/NewsSection/NewsOne";
import OurMissionTwo from "@/components/OurMission/OurMissionTwo";
import QualityWork from "@/components/QualityWork/QualityWork";
import ServicesOne from "@/components/ServicesSection/ServicesOne";
import TestimonialOne from "@/components/TestimonialSection/TestimonialOne";
import WelcomeTwo from "@/components/WelcomeSection/WelcomeTwo";
import WhyChooseOne from "@/components/WhyChoose/WhyChooseOne";
import { onePageNavItemsTwo } from "@/data/headerData";
import { mainSliderTwo } from "@/data/mainSlider";
import React from "react";

const Home2OnePage = () => {
  return (
    <Layout
      onePage
      navItems={onePageNavItemsTwo}
      pageTitle="Onepage || Home Two"
    >
      <HeaderTwo onePage navItems={onePageNavItemsTwo} />
      <MainSlider
        sliders={mainSliderTwo}
        className="main-slider-two"
        navClassName="main-slider__nav-two"
        id="home"
      />
      <WelcomeTwo id="about" />
      <CaseTwo id="cases" />
      <QualityWork />
      <Experience />
      <ServicesOne id="services" serviceCount={3} />
      <TestimonialOne className="testimonial-two" id="testimonial" />
      <BrandOne />
      <WhyChooseOne />
      <OurMissionTwo />
      <CounterOne />
      <NewsOne className="news-two" id="news" />
      <GoogleMap />
      <CtaOne className="cta-two" />
    </Layout>
  );
};

export default Home2OnePage;

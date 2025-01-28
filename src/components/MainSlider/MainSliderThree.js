import { mainSliderThree } from "@/data/mainSlider";
import useActive from "@/hooks/useActive";
import React from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleSlideThree from "./SingleSlideThree";

SwiperCore.use([EffectFade, Pagination, Navigation, Autoplay]);

const options = {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  pagination: {
    el: "#main-slider-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: "#main-slider__swiper-button-next",
    prevEl: "#main-slider__swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
};

const MainSliderThree = ({ id = "" }) => {
  const ref = useActive(id);

  return (
    <section ref={ref} className="main-slider main-slider-three" id={id}>
      <Swiper {...options} className="thm-swiper__slider">
        <div className="swiper-wrapper">
          {mainSliderThree.map((slider) => (
            <SwiperSlide key={slider.id}>
              <SingleSlideThree slider={slider} />
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-bottom-box clearfix">
          <div className="swiper-pagination" id="main-slider-pagination"></div>
          <div className="main-slider__nav">
            <div
              className="swiper-button-prev"
              id="main-slider__swiper-button-prev"
            >
              <i className="icon-right-arrow icon-left-arrow"></i>
            </div>
            <div
              className="swiper-button-next"
              id="main-slider__swiper-button-next"
            >
              <i className="icon-right-arrow"></i>
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default MainSliderThree;

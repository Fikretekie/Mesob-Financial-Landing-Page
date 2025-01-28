import { brandOne } from "@/data/brandSection";
import React from "react";
import { Container, Image } from "react-bootstrap";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay]);

const options = {
  spaceBetween: 100,
  slidesPerView: 5,
  autoplay: { delay: 5000 },
  breakpoints: {
    0: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    375: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    575: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    767: {
      spaceBetween: 50,
      slidesPerView: 4,
    },
    991: {
      spaceBetween: 50,
      slidesPerView: 5,
    },
    1199: {
      spaceBetween: 100,
      slidesPerView: 5,
    },
  },
};

const BrandOne = ({
  className = "brand-one",
  showShape = false,
  innerClassName = "",
}) => {
  return (
    <section className={className}>
      {showShape && <div className="brand-two-shape-2 float-bob-x"></div>}
      <Container>
        <div className={innerClassName}>
          <Swiper {...options} className="thm-swiper__slider">
            <div className="swiper-wrapper">
              {brandOne.map((image, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={require(`@/images/brand/${image}`).default.src}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default BrandOne;

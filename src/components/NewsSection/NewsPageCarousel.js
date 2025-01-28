import { newsOne } from "@/data/newsSection";
import React from "react";
import { Container } from "react-bootstrap";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleNewsOne from "./SingleNewsOne";

SwiperCore.use([Autoplay, Pagination]);

const options = {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: "#news-carousel-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
  },
};

const { newsData } = newsOne;

const NewsPageCarousel = () => {
  return (
    <section className="news-page news-page--carousel">
      <Container>
        <Swiper {...options} className="thm-swiper__slider news-carousel">
          <div className="swiper-wrapper">
            {newsData.map((news) => (
              <SwiperSlide key={news.id}>
                <SingleNewsOne news={news} />
              </SwiperSlide>
            ))}
          </div>
          <div
            className="swiper-pagination swiper-pagination-styled"
            id="news-carousel-pagination"
          ></div>
        </Swiper>
      </Container>
    </section>
  );
};

export default NewsPageCarousel;

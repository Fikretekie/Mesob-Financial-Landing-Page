import { teamPage } from "@/data/teamSection";
import React from "react";
import { Container } from "react-bootstrap";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleTeamOne from "./SingleTeamOne";

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
    el: "#team-carousel-pagination",
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

const TeamPageCarousel = () => {
  return (
    <section className="team-page team-page--carousel">
      <Container>
        <Swiper {...options} className="thm-swiper__slider team-carousel">
          <div className="swiper-wrapper">
            {teamPage.map((team) => (
              <SwiperSlide key={team.id}>
                <SingleTeamOne team={team} />
              </SwiperSlide>
            ))}
          </div>
          <div
            className="swiper-pagination"
            id="team-carousel-pagination"
          ></div>
        </Swiper>
      </Container>
    </section>
  );
};

export default TeamPageCarousel;

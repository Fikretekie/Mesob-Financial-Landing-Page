import useBusinessTypes from "@/hooks/useBusinessTypes";
import useActive from "@/hooks/useActive";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleServiceOne from "./SingleServiceOne";

const ServicesOne = ({ id = "", hideTitle = false, serviceCount }) => {
  const { t } = useTranslation();
  const services = useBusinessTypes();
  const ref = useActive(id);
  const servicesToShow = serviceCount ? services.slice(0, serviceCount) : services;

  return (
    <section ref={ref} className="services-one" id={id}>
      <Container>
        {!hideTitle && (
          <Title title={t("services.title")} tagline={t("services.tagline")} className="text-center" />
        )}
        <div className="services-one__bottom">
          <ul className="list-unstyled services-one__feature">
            {servicesToShow.map((service) => (
              <SingleServiceOne key={service.id} service={service} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ServicesOne;

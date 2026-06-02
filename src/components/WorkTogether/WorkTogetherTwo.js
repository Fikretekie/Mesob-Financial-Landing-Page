import { workTogetherTwo } from "@/data/workTogether";
import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Title from "../Reuseable/Title";

const { title2 } = workTogetherTwo;

const WorkTogetherTwo = () => {
  const { t } = useTranslation();

  return (
    <section className="work-together-two">
      <Container>
        <div className="work-together-tow__right">
          <div className="work-together-tow__title-wrapper">
            <span className="work-together-tow__tagline">{t("about.story.tagline")}</span>
            <h2 className="work-together-tow__title">
              {t("about.story.titlePrefix")}
              <span className="work-together-tow__title-highlight">
                {t("about.story.titleHighlight")}
              </span>
            </h2>
          </div>
          <div className="work-together-tow__content">
            <p className="work-together-tow__text">{t("about.story.text")}</p>
          </div>
          {title2 && (
            <div className="work-together-tow__title-2-wrapper">
              <Title title={t("about.story.missionTitle")} className="text-left" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default WorkTogetherTwo;

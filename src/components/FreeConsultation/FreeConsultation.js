import { freeConsultation } from "@/data/freeConsultation";
import React from "react";
import { Container } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const { title, titleHighlight, phone, phoneHref, email } = freeConsultation;

const FreeConsultation = () => {
  return (
    <section className="free-consultation">
      <Container>
        <div className="free-consultation__inner animated fadeInUp">
          <div className="free-consultation__left">
            
            <div className="free-consultation__icon">
              <span className="icon-phone-call"></span>
            </div>
          </div>
          <div className="free-consultation__right">
            <h4 className="free-consultation__contact-info">
             
              
            </h4>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FreeConsultation;

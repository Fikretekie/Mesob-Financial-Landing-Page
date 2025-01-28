import React from "react";
import { Image } from "react-bootstrap";

const CaseDetail = ({ icon = "", subtitle = "", title = "" }) => {
  return (
    <li>
      <div className="case-details__details-icon">
        <span className={icon}></span>
      </div>
      <div className="case-details__details-content">
        <span className="case-details__details-sub-title">{subtitle}</span>
        <p className="case-details__details-title">{title}</p>
      </div>
    </li>
  );
};

const CaseDetailsImg = ({
  image,
  clientName = "",
  category = "",
  date = "",
}) => {
  return (
    <div className="case-details__img">
      <Image src={image.src} alt="" />
      <div className="case-details__details-box">
        <ul className="list-unstyled case-details__details">
          <CaseDetail
            icon="far fa-user-circle"
            subtitle="Clients:"
            title={clientName}
          />
          <CaseDetail
            icon="far fa-bookmark"
            subtitle="Category:"
            title={category}
          />
          <CaseDetail icon="far fa-clock" subtitle="Date:" title={date} />
        </ul>
      </div>
    </div>
  );
};

export default CaseDetailsImg;

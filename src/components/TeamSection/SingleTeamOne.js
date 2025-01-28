import React from "react";
import { Image } from "react-bootstrap";

const SingleTeamOne = ({ team = {} }) => {
  const { name, title, image, socials } = team;

  return (
    <div className="team-one__single">
      <div className="team-one__img">
        <Image src={require(`@/images/team/${image}`).default.src} alt="" />
        <div className="team-one__content">
          <h3 className="team-one__name">{name}</h3>
          <p className="team-one__title">{title}</p>
        </div>
        <ul className="list-unstyled team-one__social">
          {socials.map(({ id, href, icon }) => (
            <li key={id}>
              <a href={href}>
                <i className={icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleTeamOne;

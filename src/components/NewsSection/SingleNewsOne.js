import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";

const SingleNewsOne = ({ news = {} }) => {
  const { image, subtitle, title, date, comments } = news;

  return (
    <div className="news-one__single">
      <div className="news-one__img">
        <Image src={require(`@/images/blog/${image}`).default.src} alt="" />
        <Link href="/blog-details">
          <span className="news-one__plus"></span>
        </Link>
      </div>
      <div className="news-one__content">
        <p className="news-one__sub-title">{subtitle}</p>
        <h3 className="news-one__title">
          <Link href="/blog-details">{title}</Link>
        </h3>
        <ul className="list-unstyled news-one__meta">
          <li>
            <Link href="/blog-details">
              <i className="far fa-clock"></i> {date}
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link href="/blog-details">
              <i className="far fa-comments"></i> {comments} Comments
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleNewsOne;

import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";

const NewsSidebarSingle = ({ news = {} }) => {
  const { image, subtitle, date, comments, title, text } = news;

  return (
    <div className="news-sidebar__single">
      <div className="news-sidebar__img">
        <Image src={require(`@/images/blog/${image}`).default.src} alt="" />
      </div>
      <div className="news-sidebar__content-box">
        <p className="news-sidebar__sub-title">{subtitle}</p>
        <ul className="list-unstyled news-sidebar__meta">
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
        <h3 className="news-sidebar__title">
          <Link href="/blog-details">{title}</Link>
        </h3>
        <p className="news-sidebar__text">{text}</p>
        <div className="news-sidebar__bottom">
          <Link href="/blog-details" className="news-sidebar__arrow">
            <span className="icon-right-arrow"></span>
          </Link>
          <Link href="/blog-details" className="news-sidebar__read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebarSingle;

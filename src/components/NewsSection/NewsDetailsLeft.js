import React from "react";
import { Image } from "react-bootstrap";
import ContactForm from "../Contact/ContactForm";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import CommentOne from "./CommentOne";

const NewsDetailsLeft = ({ news = {} }) => {
  const {
    image,
    subtitle,
    date,
    comments,
    title,
    text,
    text2,
    tags,
    socials,
    pagination,
    inputs,
  } = news;

  return (
    <div className="news-details__left">
      <div className="news-details__img">
        <Image src={image.src} alt="" />
      </div>
      <div className="news-details__content">
        <p className="news-details__sub-title">{subtitle}</p>
        <ul className="list-unstyled news-details__meta">
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
              <i className="far fa-comments"></i> {comments.length} Comments
            </Link>
          </li>
        </ul>
        <h3 className="news-details__title">{title}</h3>
        <p className="news-details__text-1">{text}</p>
        <p className="news-details__text-2">{text2}</p>
      </div>
      <div className="news-details__bottom">
        <p className="news-details__tags">
          <span>Tags</span>
          {tags.map((tag, i) => (
            <a href="#" key={i}>
              {tag}
            </a>
          ))}
        </p>
        <div className="news-details__social-list">
          {socials.map(({ id, href, icon }) => (
            <a key={id} href={href}>
              <i className={icon}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="news-details__pagenation-box">
        <ul className="list-unstyled news-details__pagenation">
          {pagination.map((text, i) => (
            <li key={i}>
              <TextSplit text={text} />
            </li>
          ))}
        </ul>
      </div>
      <CommentOne comments={comments} />
      <div className="comment-form">
        <h3 className="comment-form__title">Leave a Comment</h3>
        <ContactForm inputs={inputs} btnText="Submit comment" />
      </div>
    </div>
  );
};

export default NewsDetailsLeft;

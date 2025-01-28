import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";

const CommentOneSingle = ({ comment = {} }) => {
  const { image, name, text } = comment;

  return (
    <div className="comment-one__single">
      <div className="comment-one__image">
        <Image src={require(`@/images/blog/${image}`).default.src} alt="" />
      </div>
      <div className="comment-one__content">
        <h3>{name}</h3>
        <p>{text}</p>
        <Link href="/blog-details" className="thm-btn comment-one__btn">
          Reply
        </Link>
      </div>
    </div>
  );
};

const CommentOne = ({ comments = [] }) => {
  return (
    <div className="comment-one">
      <h3 className="comment-one__title">{comments.length} Comments</h3>
      {comments.map((comment) => (
        <CommentOneSingle comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentOne;

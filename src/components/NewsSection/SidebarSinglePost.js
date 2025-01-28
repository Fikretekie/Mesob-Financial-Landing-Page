import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";

const SidebarSinglePost = ({ post = {} }) => {
  const { image, date, title } = post;

  return (
    <li>
      <div className="sidebar__post-image">
        <Image src={require(`@/images/blog/${image}`).default.src} alt="" />
      </div>
      <div className="sidebar__post-content">
        <h3>
          <span className="sidebar__post-content-meta">
            <i className="far fa-clock"></i>
            {date}
          </span>
          <Link href="/blog-details">{title}</Link>
        </h3>
      </div>
    </li>
  );
};

export default SidebarSinglePost;

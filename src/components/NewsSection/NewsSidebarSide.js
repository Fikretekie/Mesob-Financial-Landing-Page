import React, { Fragment } from "react";
import handleSubmit from "src/utils/handleSubmit";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";
import SidebarSinglePost from "./SidebarSinglePost";

const SidebarCommentsIcon = ({ icon = "" }) => {
  return (
    <div className="sidebar__comments-icon">
      <i className={icon}></i>
    </div>
  );
};

const NewsSidebarSide = ({
  posts = [],
  categories = [],
  tags = [],
  comments = [],
}) => {
  const onSubmit = (data) => console.log(data);

  return (
    <div className="sidebar">
      <div className="sidebar__single sidebar__search">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sidebar__search-form"
        >
          <input type="search" placeholder="Search" name="search" />
          <button type="submit">
            <i className="icon-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="sidebar__single sidebar__post">
        <h3 className="sidebar__title">Recent Posts</h3>
        <ul className="sidebar__post-list list-unstyled">
          {posts.map((post) => (
            <SidebarSinglePost post={post} key={post.id} />
          ))}
        </ul>
      </div>
      <div className="sidebar__single sidebar__category">
        <h3 className="sidebar__title">Categories</h3>
        <ul className="sidebar__category-list list-unstyled">
          {categories.map(({ id, href, name }) => (
            <li className={id === 2 ? "active" : ""} key={id}>
              <Link href={href}>
                {name} <span className="fa fa-angle-right"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__single sidebar__tags">
        <h3 className="sidebar__title">Tags</h3>
        <div className="sidebar__tags-list">
          {tags.map(({ id, name, href }) => (
            <a key={id} href={href}>
              {name}
            </a>
          ))}
        </div>
      </div>
      <div className="sidebar__single sidebar__comments">
        <h3 className="sidebar__title">comments</h3>
        <ul className="sidebar__comments-list list-unstyled">
          {comments.map(({ id, message, name, icon }) => (
            <Fragment key={id}>
              <li>
                <SidebarCommentsIcon icon={icon} />
                <div className="sidebar__comments-text-box">
                  <p>
                    <TextSplit text={message} />
                  </p>
                </div>
              </li>
              <li>
                <SidebarCommentsIcon icon={icon} />
                <div className="sidebar__comments-text-box">
                  <p>{name} on Template:</p>
                  <h5>Comments</h5>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsSidebarSide;

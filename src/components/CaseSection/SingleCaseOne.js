import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleCaseOne = ({ singleCase = {}, smallImage = false }) => {
  const { tagline, title, image, image2 } = singleCase;
  const newImage = smallImage && image2 ? image2 : image;

  return (
    <div>
      <div className="case-one__single">
        <div className="case-one__img">
          <Image
            src={require(`@/images/case/${newImage}`).default.src}
            alt=""
          />
        </div>
        <div className="case-one__content">
          <p className="case-one__tagline">{tagline}</p>
          <h3 className="case-one__title">
            <Link href="/case-details">
              <TextSplit text={title} />
            </Link>
          </h3>
        </div>
        <div className="case-one__arrow">
          <Link href="/case-details">
            <span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCaseOne;

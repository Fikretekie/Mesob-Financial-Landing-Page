import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import TextSplit from "../Reuseable/TextSplit";

const SingleCaseOne = ({ singleCase = {}, smallImage = false }) => {
  const { tagline, title, image, image2 } = singleCase;
  const newImage = smallImage && image2 ? image2 : image;
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = await import(`@/images/case/${newImage}`);
        setImageSrc(img.default.src);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [newImage]);

  return (
    <div>
      <div className="case-one__single">
        <div className="case-one__img">
          {imageSrc && <Image src={imageSrc} alt="" />}
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

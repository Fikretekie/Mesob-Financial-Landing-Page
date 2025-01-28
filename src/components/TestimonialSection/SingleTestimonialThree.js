import React from "react";
import { Image } from "react-bootstrap";

const SingleTestimonialThree = ({ testimonial = {} }) => {
  const { text, image, name, title, quote } = testimonial;

  return (
    <div>
      <div className="testimonial-three__single">
        <p className="testimonial-three__text">{text}</p>
        <div className="testimonial-three__client-info">
          <div className="testimonial-three__client-img">
            <Image
              src={require(`@/images/testimonial/${image}`).default.src}
              alt=""
            />
          </div>
          <div className="testimonial-three__client-details">
            <h4 className="testimonial-three__client-name">{name}</h4>
            <p className="testimonial-three__client-title">{title}</p>
          </div>
        </div>
        <div className="testimonial-three__quote-icon">
          <Image src={quote.src} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonialThree;

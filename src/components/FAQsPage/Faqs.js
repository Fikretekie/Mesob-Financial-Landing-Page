import React, { useState } from "react";

const Faqs = ({ faqs = [], className = "" }) => {
  const [current, setCurrent] = useState(1);
  const faqsLength = faqs.length;

  return (
    <div
      className={`accrodion-grp faq-one-accrodion overflow-hidden ${className}`}
    >
      {faqs.map(({ id, title, text }) => (
        <div
          key={id}
          className={`accrodion${id === current ? " active" : ""}${
            id === faqsLength ? " last-chiled" : ""
          }`}
        >
          <div onClick={() => setCurrent(id)} className="accrodion-title">
            <h4>{title}</h4>
          </div>
          <div
            className={`accrodion-content ${
              id === current ? "d-block" : "d-none"
            }`}
          >
            <div
              className={`inner animated${id === current ? " fadeInUp" : ""}`}
            >
              <p>{text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;

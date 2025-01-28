import React from "react";

const CaseDetailsPagination = () => {
  return (
    <div className="case-details__pagination-box">
      <ul className="case-details__pagination list-unstyled">
        <li className="next">
          <a href="#" aria-label="Previous">
            <i className="icon-right-arrow"></i>Prev
          </a>
        </li>
        {Array.from(Array(4)).map((_, i) => (
          <li key={i} className="count">
            <a href="#"></a>
          </li>
        ))}
        <li className="previous">
          <a href="#" aria-label="Next">
            Next<i className="icon-right-arrow"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CaseDetailsPagination;

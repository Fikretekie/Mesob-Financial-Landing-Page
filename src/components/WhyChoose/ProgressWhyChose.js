import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const ProgressWhyChose = ({ progress = {} }) => {
  const [countStart, setCountStart] = useState(false);

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setCountStart(true);
    }
  };

  const { title, count } = progress;
  const percent = countStart ? count : 0;

  return (
    <VisibilitySensor
      offset={{ top: 10 }}
      delayedCall={true}
      onChange={onVisibilityChange}
    >
      <div className="why-choose-one__progress-single">
        <h4 className="why-choose-one__progress-title">{title}</h4>
        <div className="bar">
          <div className="bar-inner count-bar" style={{ width: `${percent}%` }}>
            <div className="count-text" style={{ opacity: countStart ? 1 : 0 }}>
              <CountUp start={0} end={percent} duration={1} />%
            </div>
          </div>
        </div>
      </div>
    </VisibilitySensor>
  );
};

export default ProgressWhyChose;

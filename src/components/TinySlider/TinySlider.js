import React, { forwardRef, useEffect, useRef } from "react";
import {
  TinySliderInfo,
  TinySliderInstance,
  TinySliderSettings,
  tns,
} from "tiny-slider/src/tiny-slider";

/**
 * @returns {TinySliderInstance| null}
 */

const initialValue = () => null;

/**
 * @param {{children: ReactNode; options: TinySliderSettings; onChange?:(info: TinySliderInfo) => void; onInit?:(slider: TinySliderInstance) => void}} props
 */

const TinySlider = ({ children, options = {}, onChange, onInit }, ref) => {
  const sliderRef = useRef(initialValue());

  useEffect(() => {
    if (!sliderRef.current) {
      const slider = tns(options);
      sliderRef.current = slider;
      onInit?.(slider);
      if (onChange) {
        slider.events.on("indexChanged", onChange);
      }
    }
  }, [options, onInit, onChange]);

  return (
    <div
      ref={ref}
      className={`${options.container?.split(".")[1]} position-relative`}
    >
      {children}
    </div>
  );
};

export default forwardRef(TinySlider);

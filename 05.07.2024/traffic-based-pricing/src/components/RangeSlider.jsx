import React from "react";
import "./RangeSlider.css";

const RangeSlider = ({ min, max, value, onChange }) => {
  const onValueChanged = (event) => {
    const newValue = Number.parseInt(event.target.value, 10);
    onChange(newValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onValueChanged}
      className="custom-slider"
    />
  );
};

export default RangeSlider;

import React from "react";
import "./Switch.css";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "var(--soft-cyan)" }}
        className="switch-label"
        htmlFor={`switch-new`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};

export default Switch;

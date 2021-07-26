import React, { useState } from "react";
import "./styles.scss";

const ThemaSwitcher = () => {
  const [checked, setChecked] = useState(false);
  
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="thema-btn">
      <label className="switch">
        <input
          id="toggle"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider"></span>
      </label>
      <div className="slide-block slide-out"></div>
    </div>
  );
};

export default ThemaSwitcher;

import { useContext, useState } from "react";
import { ThemaContext } from "context/ThemaContext";

import "./styles.scss";

const ThemaSwitcher = () => {
  const [checked, setChecked] = useState(false);
  const { setThema } = useContext(ThemaContext);
  const handleChange = () => {
    setChecked(!checked);
    setThema(checked ? "light" : "dark");
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

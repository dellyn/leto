import { useContext, useState } from "react";
import { SettingsContext } from "context/SettingsContext";
import "./styles.scss";

const ThemeSwitcher = () => {
  const { settings, setTheme } = useContext(SettingsContext);
  const defaultChecked = settings.theme === "light" ? false : true;

  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    setChecked(!checked);
    setTheme(checked ? "light" : "dark");
  };

  return (
    <div className="theme-btn">
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

export default ThemeSwitcher;

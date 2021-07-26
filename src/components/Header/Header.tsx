import React from "react";

import "./styles.scss";
import themaSVG from "img/thema.svg";
import ThemaSwitcher from "components/ThemaSwitcher/ThemaSwitcher";
const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="container">
        <div className="header">
          <h1 className="head-title">LETO</h1>
          <div className="right">
            <ThemaSwitcher />
            <div className="account">Ingvar</div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

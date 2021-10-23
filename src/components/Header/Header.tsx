import React from "react";

import "./header.scss";

import ThemeSwitcher from "components/Theme/ThemeSwitcher";
const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="container">
        <div className="header">
          <h1 className="head-title">LETO</h1>
          <div className="right">
            <ThemeSwitcher />
            <div className="account">Ingvar</div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

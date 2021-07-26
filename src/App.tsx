import "./App.scss";
import Board from "components/Board/Board";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { SettingsContext } from "context/SettingsContext";
import { useState } from "react";
import { appSettings, LSSettingsName, IAppSettings } from "constants/settings";

import "components/Theme/dark-theme.scss";

const storageSettings = JSON.parse(localStorage.getItem(LSSettingsName));
if (!storageSettings) {
  localStorage.setItem(LSSettingsName, JSON.stringify(appSettings));
}
const settings = storageSettings || appSettings;

const updateSettings = (settings: IAppSettings) => {
  localStorage.setItem(LSSettingsName, JSON.stringify(settings));
};

const App = () => {
  const [theme, changeTheme] = useState(settings.theme);

  const setTheme = (theme: string) => {
    changeTheme(theme);
    settings.theme = theme;
    updateSettings(settings);
  };

  return (
    <SettingsContext.Provider value={{ settings, setTheme }}>
      <div className={`LETO ${theme}`}>
        <Header />
        <Board />
        <Footer />
      </div>
    </SettingsContext.Provider>
  );
};

export default App;

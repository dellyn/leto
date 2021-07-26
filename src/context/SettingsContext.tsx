import React from "react";

export const SettingsContext = React.createContext({
  settings: null,
  setTheme: (themeType: string) => {},
});

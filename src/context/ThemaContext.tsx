import React from "react";

export const ThemaContext = React.createContext({
  thema: null,
  setThema: (themaType: string) => {},
});

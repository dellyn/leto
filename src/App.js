import "./App.scss";
import Board from "components/Board/Board";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { ThemaContext } from "context/ThemaContext";
import "components/Thema/dark-thema.scss";
import { useState } from "react";

function App() {
  const [thema, setThema] = useState("light");
  return (
    <ThemaContext.Provider value={{ setThema }}>
      <div className={`LETO ${thema}`}>
        <Header />
        <Board />
        <Footer />
      </div>
    </ThemaContext.Provider>
  );
}

export default App;

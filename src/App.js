import "./App.scss";
import Board from "components/Board/Board";
import Header from "components/Header/Header";
function App() {
  return (
    <div className="LETO">
      <div className="container">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;

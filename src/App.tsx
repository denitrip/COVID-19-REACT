import React from "react";
import "./App.css";
import GraphContainer from "./components/Graph/GraphContainer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <GraphContainer />
    </div>
  );
}

export default App;

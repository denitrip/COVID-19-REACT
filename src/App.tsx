import React from "react";
import s from "./App.module.css";
import Header from "./components/Header/Header";
import SearchContainer from "./components/Search/SearchContainer";
import MainListContainer from "./components/MainList/MainListContainer";
import MapContainer from "./components/Map/MapContainer";
import MainTableContainer from "./components/MainTable/MainTableContainer";
import GraphContainer from "./components/Graph/GraphContainer";

function App() {
  return (
    <div className={s.app}>
      <Header className={s.header} />
      <SearchContainer className={s.search} />
      <MainListContainer className={s.mainList} />
      <MapContainer className={s.map} />
      <MainTableContainer className={s.mainTable} />
      <GraphContainer className={s.graph} />
    </div>
  );
}

export default App;


import React from 'react';
import s from'./App.module.css';
import Header from './components/Header/Header';
import SearchContainer from './components/Search/Search';
import MainListContainer from './components/MainList/MainList';
import MapContainer from './components/Map/Map';
import MainTableContainer from './components/MainTable/MainTable';
import GraphContainer from './components/Graph/Graph';

function App() {
  return (
    <div className={s.app}>
      <Header className={s.header}/>
      <SearchContainer className={s.search}/>
      <MainListContainer className={s.mainList}/>
      <MapContainer className={s.map}/>
      <MainTableContainer className={s.mainTable}/>
      <GraphContainer className={s.graph}/>
    </div>
  );
}

export default App;

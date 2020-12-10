
import React from 'react';
import s from'./App.module.css';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import MainList from './components/MainList/MainList';
import Map from './components/Map/Map';
import MainTable from './components/MainTable/MainTable';
import Graph from './components/Graph/Graph';

function App() {
  return (
    <div className={s.app}>
      <Header className={s.header}/>
      <Search className={s.search}/>
      <MainList className={s.mainList}/>
      <Map className={s.map}/>
      <MainTable className={s.mainTable}/>
      <Graph className={s.graph}/>
    </div>
  );
}

export default App;

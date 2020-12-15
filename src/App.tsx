
import React, { useEffect, useState } from 'react';
import s from'./App.module.css';
import Header from './components/Header/Header';
import SearchContainer from './components/Search/SearchContainer';
import MainListContainer from './components/MainList/MainListContainer';
import MapContainer from './components/Map/MapContainer';
import MainTableContainer from './components/MainTable/MainTableContainer';
import GraphContainer from './components/Graph/GraphContainer';
import { commonData } from './utils';

function App() {

  const [data, setData] = useState<any>();
  const [error, setError] = useState();
  useEffect(() => {
      const fetchData = async () => {
      try {
          const dataObj = await commonData();
          
          setData(dataObj);
      } catch (error) {
          setError(error);
      }
      }
      fetchData()
  }, []);

  return (
    <div className={s.app}>
      <Header className={s.header}/>
      <SearchContainer className={s.search}/>
      <MainListContainer className={s.mainList}/>
      <MapContainer data={data}/>
      <MainTableContainer className={s.mainTable}/>
      <GraphContainer className={s.graph}/>
    </div>
  );
}

export default App;

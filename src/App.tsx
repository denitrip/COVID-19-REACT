import React, { useEffect, useState } from "react";
import s from "./App.module.css";
import Header from "./components/Header/Header";
import SearchContainer from "./components/Search/SearchContainer";
import MainListContainer from "./components/MainList/MainListContainer";
import MapContainer from "./components/Map/MapContainer";
import MainTableContainer from "./components/MainTable/MainTableContainer";
import GraphContainer from "./components/Graph/GraphContainer";
import { commonData } from "./utils";

function App() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState();
  const [checkAbsolut, setCheckAbsolut] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataObj = await commonData();

        setData(dataObj);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const updateCheckAbsolut = (value: boolean) => {
    setCheckAbsolut(value)
  }

  return (
    <div className={s.app}>
      <Header className={s.header} />
      <SearchContainer className={s.search} />
      <MainListContainer className={s.mainList} />
      <MapContainer updateCheckAbsolut={updateCheckAbsolut} checkAbsolut={checkAbsolut} data={data} />
      <MainTableContainer updateCheckAbsolut={updateCheckAbsolut} checkAbsolut={checkAbsolut} className={s.mainTable} />
      <GraphContainer updateCheckAbsolut={updateCheckAbsolut} checkAbsolut={checkAbsolut} data={data} className={s.graph} />
    </div>
  );
}

export default App;

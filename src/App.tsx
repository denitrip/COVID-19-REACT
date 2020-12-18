import React, { useEffect, useState } from "react";
import s from "./App.module.css";
import Header from "./components/Header/Header";
import SearchContainer from "./components/Search/SearchContainer";
import MainListContainer from "./components/MainList/MainListContainer";
import MapContainer from "./components/Map/MapContainer";
import MainTableContainer from "./components/MainTable/MainTableContainer";
import GraphContainer from "./components/Graph/GraphContainer";
import Footer from "./components/Footer/Footer";
import { commonData } from "./utils";
import { ICovidData } from "./model";

function App() {
  const [data, setData] = useState<ICovidData>();
  const [error, setError] = useState();
  const [checkAbsolut, setCheckAbsolut] = useState<boolean>(false);
  const [countryObj, setCountryObj] = useState(null);
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
    setCheckAbsolut(value);
  };

  const getCountry = (country: string, population: number) => {
    setCountryObj({ country, population });
  };

  return (
    <div className={s.app}>
      <Header className={s.header} />
      <SearchContainer className={s.search} />
      <MainListContainer
        getCountry={getCountry}
        className={s.mainList}
        data={data}
      />
      <MapContainer
        getCountry={getCountry}
        countryObj={countryObj}
        updateCheckAbsolut={updateCheckAbsolut}
        checkAbsolut={checkAbsolut}
        data={data}
        className={s.map}
      />
      <MainTableContainer
        data={data}
        countryObj={countryObj}
        updateCheckAbsolut={updateCheckAbsolut}
        checkAbsolut={checkAbsolut}
        className={s.mainTable}
      />
      <GraphContainer
        countryObj={countryObj}
        updateCheckAbsolut={updateCheckAbsolut}
        checkAbsolut={checkAbsolut}
        data={data}
        className={s.graph}
      />
      <Footer className={s.footer} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import s from "./App.module.css";
import Header from "./components/Header/Header";
import MainListContainer from "./components/MainList/MainListContainer";
import MapContainer from "./components/Map/MapContainer";
import MainTableContainer from "./components/MainTable/MainTableContainer";
import GraphContainer from "./components/Graph/GraphContainer";
import Footer from "./components/Footer/Footer";
import { commonData } from "./utils";
import { ICovidData } from "./model";
import { IOdjectChart } from "./model/graph.model";

function App() {
  const [data, setData] = useState<ICovidData>();
  const [error, setError] = useState();
  const [checkAbsolut, setCheckAbsolut] = useState<boolean>(false);
  const [countryObj, setCountryObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [objChart, setObj] = useState<IOdjectChart>({
    daily: false,
    type: "linear",
    cases: "cases",
    color: "#d21a1a",
    country: "TotalConfirmed",
    name: "Cumulative Cases",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataObj = await commonData();
        setData(dataObj);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  const updateObject = (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string,
    valueCountry: string,
    valueName: string
  ): void =>
    setObj({
      daily: valueDaily,
      type: valueType,
      cases: valueCases,
      color: valueColor,
      country: valueCountry,
      name: valueName,
    });
  const updateCheckAbsolut = (value: boolean) => {
    setCheckAbsolut(value);
  };

  const getCountry = (country: string, population: number) => {
    setCountryObj({ country, population });
  };

  return (
    <div className={s.app}>
      <Header className={s.header} data={data} />
      <MainListContainer
        isLoading={isLoading}
        objChart={objChart}
        updateObject={updateObject}
        getCountry={getCountry}
        updateCheckAbsolut={updateCheckAbsolut}
        checkAbsolut={checkAbsolut}
        className={s.mainList}
        data={data}
      />
      <MapContainer
        objChart={objChart}
        updateObject={updateObject}
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
        objChart={objChart}
        updateObject={updateObject}
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

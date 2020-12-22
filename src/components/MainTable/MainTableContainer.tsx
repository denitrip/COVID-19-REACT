import React, { useEffect, useState } from "react";
import MainTable from "./MainTable";
import { Spinner } from "../Spinner/Spinner";
import { GLOBAL_POPULATION } from "../../constants";
import s from "./MainTable.module.scss";
import defaultFlag from '../../assets/image/640px-International_Flag_of_Planet_Earth.png';
import open from '../../assets/image/171127-200.png';

const MainTableContainer = (props: any) => {
  const [isActive, setActive] = useState(false);
  let [checked, setChecked] = useState<boolean>(false);
  useEffect(() => props.updateCheckAbsolut(checked), [checked]);
  useEffect(() => setChecked(props.checkAbsolut), [props.checkAbsolut]);
  const globalPopulation: number = GLOBAL_POPULATION;
  let countryFlag = "";
  let population: number = undefined;
  let rawData = undefined;
  let country:string = "";

  const handleToggle = () => {
    setActive(!isActive);
  };
  
  // if no data ready for component
  if (!props.data) {
    return (
      <div className={s.wrapper}>
        <Spinner />
      </div>
    );
  }
  // if we are using global data
  if (!props.countryObj) {
    rawData = props.data.Global;
    country = "Global";
    population = globalPopulation;
    countryFlag = defaultFlag;
  } else {
    population = props.countryObj.population;
    let countryCode = props.countryObj.country;
    rawData = props.data.Countries.filter((el) => {
      return el.alpha2Code === countryCode;
    }).pop();
    country = rawData.Country;
    countryFlag = rawData.flag;
  }

  let fieldsForData = [
    "NewConfirmed",
    "NewDeaths",
    "NewRecovered",
    "TotalConfirmed",
    "TotalDeaths",
    "TotalRecovered",
  ];
  let data = Object.entries(rawData)
    .map(([key, value]) => {
      return { title: key.toString(), count: +value };
    })
    .filter((el) => {
      return fieldsForData.includes(el.title);
    });
  const switchData = { onSwitchChange: setChecked, switchChecked: checked };

  if (checked) {
    for (let elem of data) {
      elem.count = Number(((elem.count / population) * 100000).toFixed(3));
    }
  }
  return (
    <div className={`${props.className} ${isActive ? s.fullscreen : ""}`}>
      <MainTable
        payload={{ data, country }}
        switchData={switchData}
        countryFlag={countryFlag}
      />
      <button className={s.btn_fullscreen} onClick={handleToggle}><img src={open} /></button>
    </div>
  );
};

export default MainTableContainer;

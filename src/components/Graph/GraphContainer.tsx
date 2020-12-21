import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ICovidData } from "../../model";
import { ICountryGraph, IOdjectChart } from "../../model/graph.model";
import { useFetch } from "../../services/graph.services";
import Switch from "../Switch/Switch";
import Graph from "./Graph";
import MainListGraph from "./MenuListGraph";
import style from "./Graph.module.scss";

interface Props {
  className: string;
  data: ICovidData;
  checkAbsolut: boolean;
  objChart: IOdjectChart;
  countryObj: { country: string; population: number };
  updateObject: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string,
    valueCountry: string,
    valueName: string
  ) => void;
  updateCheckAbsolut: (value: boolean) => void;
}

const GraphContainer: React.FC<Props> = (props) => {
  const [country, setCountry] = useState<{
    country: string;
    population: number;
  }>({ country: "belurus", population: 0 });
  const [isword, setIsWord] = useState<boolean>(true);
  const [daily, setDaily] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const chartContainer = useRef(null);
  const urlWord = `https://disease.sh/v3/covid-19/historical/all?lastdays=366`;
  const urlCountry = `https://disease.sh/v3/covid-19/historical/${country.country}?lastdays=366`;
  const {
    response,
    error,
    isLoading,
  }: { response: ICountryGraph; isLoading: boolean; error: Error } = useFetch(
    isword ? urlWord : urlCountry
  );
  useEffect(() => {
    if (props.countryObj) {
      setIsWord(false);
      setCountry(props.countryObj);
    }
  }, [props.countryObj]);
  useEffect(() => setChecked(props.checkAbsolut), [props.checkAbsolut]);
  useEffect(() => props.updateCheckAbsolut(checked), [checked]);
  const updateDaily = (value: boolean): void => setDaily(value);
  const switchData = { onSwitchChange: setChecked, switchChecked: checked };
  return (
    <div className={props.className}>
      <div className={style.switch}>
        <span>Absolute</span>
        <Switch
          name="switchGraph"
          checked={switchData.switchChecked}
          onChange={switchData.onSwitchChange}
        />
        <span>Per 100k</span>
      </div>
      {
        <Graph
          country={country}
          data={props.data}
          objChart={props.objChart}
          checked={checked}
          response={response}
          isLoading={isLoading}
          daily={daily}
          chartContainer={chartContainer}
          isWord={isword}
        />
      }
      <MainListGraph
        isLoading={isLoading}
        objChart={props.objChart}
        updateObjectChart={props.updateObject}
        updateDaily={updateDaily}
      />
    </div>
  );
};

export default GraphContainer;

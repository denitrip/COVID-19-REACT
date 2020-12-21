import React, { useEffect, useRef, useState } from "react";
import style from "./MainList.module.scss";
import { ICommonData, ICovidData } from "../../model";
import MainListGraph from "../Graph/MenuListGraph";
import { IOdjectChart } from "../../model/graph.model";
import { Spinner } from "../Spinner/Spinner";
import Switch from "../Switch/Switch";

interface Props {
  isLoading: boolean;
  className: string;
  data: ICommonData[];
  getCountry: (country: string, population: number) => void;
  objChart: IOdjectChart;
  checkAbsolut: boolean;
  updateCheckAbsolut: (value: boolean) => void;
  updateObject: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string,
    valueCountry: string,
    valueName: string
  ) => void;
}

const MainList: React.FC<Props> = ({
  data,
  className,
  getCountry,
  updateObject,
  objChart,
  checkAbsolut,
  updateCheckAbsolut,
  isLoading,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [daily, setDaily] = useState<boolean>(true);
  const switchData = { onSwitchChange: setChecked, switchChecked: checked };
  const containerCountry = useRef(null);
  const updateDaily = (value: boolean): void => setDaily(value);

  useEffect(() => setChecked(checkAbsolut), [checkAbsolut]);
  useEffect(() => updateCheckAbsolut(checked), [checked]);

  const handleclick = (country: string, popupation: number, event: any) => {
    if (!isLoading) {
      getCountry(country, popupation);
      containerCountry.current.childNodes.forEach((item: any) => {
        item.classList.remove(style.activeList);
      });
      event.currentTarget.classList.toggle(style.activeList);
    }
  };

  return (
    <div className={className}>
      <div className={style.header}>{objChart.country}</div>
      <div className={style.switch}>
        <span>Absolute</span>
        <Switch
          name="switchMain"
          checked={switchData.switchChecked}
          onChange={switchData.onSwitchChange}
        />
        <span>Per 100k</span>
      </div>
      <div className={style.containerCountry} ref={containerCountry}>
        {data ? (
          data.length === 0 ? (
            <div className={style.not}>No results country...</div>
          ) : (
            data
              .map((item) =>
                checked
                  ? {
                      ...item,
                      [objChart.country]: (
                        (item[objChart.country] / item.population) *
                        100000
                      ).toFixed(3),
                    }
                  : item
              )
              .sort((a, b) => b[objChart.country] - a[objChart.country])
              .map((country) => {
                return (
                  <div
                    className={style.item}
                    key={country.id}
                    onClick={(e) =>
                      handleclick(country.id, country.population, e)
                    }
                  >
                    <img
                      src={country.flag}
                      width={15}
                      height={10}
                      alt={country.id}
                    />
                    <span>{country.Country}</span>
                    <span style={{ color: objChart.color }}>
                      {country[objChart.country]}
                    </span>
                  </div>
                );
              })
          )
        ) : (
          <Spinner />
        )}
      </div>
      <MainListGraph
        isLoading={data ? false : true}
        objChart={objChart}
        updateObjectChart={updateObject}
        updateDaily={updateDaily}
      />
    </div>
  );
};

export default MainList;

import React, { useRef, useState } from "react";
import style from "./MainList.module.scss";
import { ICovidData } from "../../model";
import MainListGraph from "../Graph/MenuListGraph";
import { IOdjectChart } from "../../model/graph.model";
import { Spinner } from "../Spinner/Spinner";

interface Props {
  data: ICovidData;
  getCountry: (country: string, population: number) => void;
}

const MainList: React.FC<Props> = ({ data, getCountry }) => {
  const [daily, setDaily] = useState<boolean>(true);
  const [obj, setObj] = useState<IOdjectChart>({
    daily: daily,
    type: "linear",
    cases: "cases",
    color: "#d21a1a",
    country: "TotalConfirmed",
    name: "Daily Cases",
  });
  const containerCountry = useRef(null);
  const updateDaily = (value: boolean): void => setDaily(value);
  const updateObjectChart = (
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

  const handleclick = (country: string, population: number, event: any) => {
    getCountry(country, population);
    containerCountry.current.childNodes.forEach((item: any) => {
      item.classList.remove(style.activeList);
    });
    event.currentTarget.classList.toggle(style.activeList);
  };
  return (
    <div className={style.list_wrap}>
      <div className={style.header}>{obj.name}</div>
      <div className={style.containerCountry} ref={containerCountry}>
        {data ? (
          data.Countries.sort((a, b) => b[obj.country] - a[obj.country]).map(
            (country) => {
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
                  <span style={{ color: obj.color }}>
                    {country[obj.country]}
                  </span>
                </div>
              );
            }
          )
        ) : (
          <Spinner />
        )}
      </div>
      <MainListGraph
        updateObjectChart={updateObjectChart}
        updateDaily={updateDaily}
      />
    </div>
  );
};

export default MainList;

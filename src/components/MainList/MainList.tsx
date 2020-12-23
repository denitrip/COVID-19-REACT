import React, { useEffect, useRef, useState } from "react";
import style from "./MainList.module.scss";
import { ICommonData, ICovidData } from "../../model";
import MainListGraph from "../Graph/MenuListGraph";
import { IOdjectChart } from "../../model/graph.model";
import { Spinner } from "../Spinner/Spinner";
import Switch from "../Switch/Switch";
import SearchContainer from "../Search/SearchContainer";

interface Props {
  isLoading: boolean;
  data: ICovidData;
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
  getCountry,
  updateObject,
  objChart,
  checkAbsolut,
  updateCheckAbsolut,
  isLoading,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [daily, setDaily] = useState<boolean>(true);
  const [dataSearch, setDataSearch] = useState<ICommonData[]>();
  const switchData = { onSwitchChange: setChecked, switchChecked: checked };
  const containerCountry = useRef(null);
  const updateDaily = (value: boolean): void => setDaily(value);

  useEffect(() => setChecked(checkAbsolut), [checkAbsolut]);
  useEffect(() => updateCheckAbsolut(checked), [checked]);
  useEffect(() => {
    if (data) setDataSearch(data.Countries);
  }, [data]);
  const handleclick = (country: string, population: number, event: any) => {
    if (!isLoading) {
      getCountry(country, population);
      containerCountry.current.childNodes.forEach((item: any) => {
        item.classList.remove(style.activeList);
      });
      event.currentTarget.classList.toggle(style.activeList);
    }
  };
  const updateDataSearch = (value: ICommonData[]) => {
    setDataSearch(value);
  };
  return (
    <div className={style.list_wrap}>
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
      <SearchContainer data={data} updateDataSearch={updateDataSearch} />
      <div className={style.containerCountry} ref={containerCountry}>
        {dataSearch ? (
          dataSearch.length === 0 ? (
            <div className={style.not}>No results...</div>
          ) : (
            dataSearch
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

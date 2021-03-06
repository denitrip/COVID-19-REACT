import React, { useEffect, useRef, useState } from "react";
import { IDataMenu, IOdjectChart } from "../../model/graph.model";
import style from "./Graph.module.scss";

interface Props {
  updateObjectChart: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string,
    valueCountry: string,
    valueName: string
  ) => void;
  updateDaily: (value: boolean) => void;
  objChart: IOdjectChart;
  isLoading: boolean;
}
const MainListGraph: React.FC<Props> = ({
  updateDaily,
  updateObjectChart,
  objChart,
  isLoading,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerButtons = useRef<HTMLDivElement>(null);
  const containerActiveList = useRef<HTMLDivElement>(null);
  const dataMenu = [
    {
      word: "cases",
      country: "NewConfirmed",
      boolean: true,
      name: "Daily Cases",
      type: "linear",
      color: "#d21a1a",
    },
    {
      word: "deaths",
      country: "NewDeaths",
      boolean: true,
      name: "Daily Deaths",
      type: "linear",
      color: "#1c5fe5",
    },
    {
      word: "recovered",
      country: "NewRecovered",
      boolean: true,
      name: "Daily Recovered",
      type: "linear",
      color: "#45d21a",
    },
    {
      word: "cases",
      country: "TotalConfirmed",
      boolean: false,
      name: "Cumulative Cases",
      type: "linear",
      color: "#d21a1a",
    },
    {
      word: "deaths",
      country: "TotalDeaths",
      boolean: false,
      name: "Cumulative Deaths",
      type: "linear",
      color: "#1c5fe5",
    },
    {
      word: "recovered",
      country: "TotalRecovered",
      boolean: false,
      name: "Cumulative Recovered",
      type: "linear",
      color: "#45d21a",
    },
  ];
  useEffect(() => {
    const onClickOutside = () => {
      if (isActive) {
        containerButtons.current.classList.remove(style.active);
        setIsActive(!isActive);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [isActive]);

  const update = (
    word: string,
    boolean: boolean,
    type: string,
    color: string,
    name: string,
    country: string
  ) => {
    updateDaily(boolean);
    updateObjectChart(boolean, type, word, color, country, name);
  };

  const handleClick = (
    wordUpdate: string,
    boolean: boolean,
    type: string,
    color: string,
    name: string,
    country: string
  ) => {
    update(wordUpdate, boolean, type, color, name, country);
    toggleMenu();
  };
  const toggleMenu = () => {
    containerButtons.current.classList.toggle(style.active);
    setIsActive(!isActive);
  };
  const showNextGraph = () => {
    const index = dataMenu.findIndex(
      (e: IDataMenu) => e.country === objChart.country
    );
    const i = index === dataMenu.length - 1 ? 0 : index + 1;
    update(
      dataMenu[i].word,
      dataMenu[i].boolean,
      dataMenu[i].type,
      dataMenu[i].color,
      dataMenu[i].name,
      dataMenu[i].country
    );
  };
  const showPrevGraph = () => {
    const index = dataMenu.findIndex(
      (e: IDataMenu) => e.country === objChart.country
    );
    const i = !index ? dataMenu.length - 1 : index - 1;
    update(
      dataMenu[i].word,
      dataMenu[i].boolean,
      dataMenu[i].type,
      dataMenu[i].color,
      dataMenu[i].name,
      dataMenu[i].country
    );
  };
  return (
    <div className={style.menu}>
      <div className={style.containerActiveMenu}>
        <button
          disabled={isLoading}
          onClick={() => showPrevGraph()}
          className={style.prev}
        ></button>
        <div
          onClick={() => toggleMenu()}
          className={style.activeList}
          ref={containerActiveList}
        >
          {objChart.country}
        </div>
        <button
          disabled={isLoading}
          onClick={() => showNextGraph()}
          className={style.next}
        ></button>
      </div>
      <div className={style.containerButtons} ref={containerButtons}>
        {dataMenu.map((item, i) => {
          return (
            <button
              disabled={isLoading}
              key={i}
              onClick={() =>
                handleClick(
                  item.word,
                  item.boolean,
                  item.type,
                  item.color,
                  item.name,
                  item.country
                )
              }
            >
              {item.country}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainListGraph;

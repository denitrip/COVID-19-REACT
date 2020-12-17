import React, { useEffect, useRef, useState } from "react";
import { IDataMenu } from "../../model/graph.model";
import style from "./Graph.module.scss";

interface Props {
  updateObjectChart: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string
  ) => void;
  updateDaily: (value: boolean) => void;
}
const MainListGraph: React.FC<Props> = ({ updateDaily, updateObjectChart }) => {
  const [activeMenu, setActiveMenu] = useState<string>("Daily Cases");
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerButtons = useRef<HTMLDivElement>(null)
  const containerActiveList = useRef<HTMLDivElement>(null)
  const dataMenu = [
    { word: "cases", boolean: true, name: "Daily Cases", type: "linear", color: '#d21a1a' },
    { word: "deaths", boolean: true, name: "Daily Deaths", type: "linear", color: '#1c5fe5' },
    {
      word: "recovered",
      boolean: true,
      name: "Daily Recovered",
      type: "linear",
      color: '#45d21a'
    },
    { word: "cases", boolean: false, name: "Cumulative Cases", type: "linear", color: '#d21a1a' },
    {
      word: "deaths",
      boolean: false,
      name: "Cumulative Deaths",
      type: "linear",
      color: '#1c5fe5'
    },
    {
      word: "recovered",
      boolean: false,
      name: "Cumulative Recovered",
      type: "linear",
      color: '#45d21a'
    },
  ];
  useEffect(
    () => {
      const onClickOutside = () => {
        if (isActive) {
          containerButtons.current.classList.remove(style.active)
          setIsActive(!isActive)
        }
      }
      document.addEventListener("click", onClickOutside);
      return () => document.removeEventListener("click", onClickOutside);
    }, [isActive])

  const update = (word: string, boolean: boolean, type: string, color: string, name: string) => {
    setActiveMenu(name)
    updateDaily(boolean);
    updateObjectChart(boolean, type, word, color);
  }

  const handleClick = (wordUpdate: string, boolean: boolean, type: string, color: string, name: string) => {
    update(wordUpdate, boolean, type, color, name)
    toggleMenu()
  };
  const toggleMenu = () => {
    containerButtons.current.classList.toggle(style.active)
    setIsActive(!isActive)
  }
  const showNextGraph = () => {
    const index = dataMenu.findIndex((e: IDataMenu) => e.name === activeMenu)
    const i = index === dataMenu.length - 1 ? 0 : index + 1
    update(dataMenu[i].word, dataMenu[i].boolean, dataMenu[i].type, dataMenu[i].color, dataMenu[i].name)
  }
  const showPrevGraph = () => {
    const index = dataMenu.findIndex((e: IDataMenu) => e.name === activeMenu)
    const i = !index ? dataMenu.length - 1 : index - 1
    update(dataMenu[i].word, dataMenu[i].boolean, dataMenu[i].type, dataMenu[i].color, dataMenu[i].name)
  }
  return (
    <div className={style.menu}>
      <div className={style.containerActiveMenu}>
        <div onClick={() => showPrevGraph()} className={style.prev}></div>
        <div onClick={() => toggleMenu()} className={style.activeList} ref={containerActiveList}>{activeMenu}</div>
        <div onClick={() => showNextGraph()} className={style.next}></div>
      </div>
      <div className={style.containerButtons} ref={containerButtons}>
        {dataMenu.map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => handleClick(item.word, item.boolean, item.type, item.color, item.name)}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainListGraph;

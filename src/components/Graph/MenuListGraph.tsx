import React from "react";

interface Props {
  updateObjectChart: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string
  ) => void;
  updateDaily: (value: boolean) => void;
}
const MainListGraph: React.FC<Props> = ({ updateDaily, updateObjectChart }) => {
  const dataMenu = [
    { word: "cases", boolean: true, name: "Daily Cases", type: "linear" },
    { word: "deaths", boolean: true, name: "Daily Deaths", type: "linear" },
    {
      word: "recovered",
      boolean: true,
      name: "Daily Recovered",
      type: "linear",
    },
    { word: "cases", boolean: false, name: "Cumulative Cases", type: "linear" },
    {
      word: "deaths",
      boolean: false,
      name: "Cumulative Deaths",
      type: "linear",
    },
    {
      word: "recovered",
      boolean: false,
      name: "Cumulative Recovered",
      type: "linear",
    },
  ];

  const handleClick = (wordUpdate: string, boolean: boolean, type: string) => {
    updateDaily(boolean);
    updateObjectChart(boolean, type, wordUpdate);
  };
  return (
    <div>
      {dataMenu.map((item, i) => {
        return (
          <button
            key={i}
            onClick={() => handleClick(item.word, item.boolean, item.type)}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default MainListGraph;

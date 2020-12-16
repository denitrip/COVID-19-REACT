import React from "react";

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

  const handleClick = (wordUpdate: string, boolean: boolean, type: string, color: string) => {
    updateDaily(boolean);
    updateObjectChart(boolean, type, wordUpdate, color);
  };
  return (
    <div>
      {dataMenu.map((item, i) => {
        return (
          <button
            key={i}
            onClick={() => handleClick(item.word, item.boolean, item.type, item.color)}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default MainListGraph;

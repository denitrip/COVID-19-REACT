import React from "react";
import { updateChart } from "./service";
interface Props {
  response: any;
  isWord: boolean;
  chartContainer: any;
  daily: boolean;
  updateDaily: (value: boolean) => any;
}
const MainListGraph: React.FC<Props> = ({
  response,
  isWord,
  chartContainer,
  daily,
  updateDaily,
}) => {
  const dataMenu = [
    { word: "cases", boolean: true, name: "Daily Cases" },
    { word: "deaths", boolean: true, name: "Daily Deaths" },
    { word: "cases", boolean: false, name: "Cumulative Cases" },
    { word: "deaths", boolean: false, name: "Cumulative Deaths" },
  ];

  const handleClick = (wordUpdate: string, boolean: boolean) => {
    updateDaily(boolean);
    updateChart(
      isWord ? response[wordUpdate] : response.timeline[wordUpdate],
      chartContainer,
      boolean
    );
  };
  return (
    <>
      {dataMenu.map((item, i) => {
        return (
          <button key={i} onClick={() => handleClick(item.word, item.boolean)}>
            {item.name}
          </button>
        );
      })}
    </>
  );
};

export default MainListGraph;

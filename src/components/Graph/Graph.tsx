import React, { useEffect, useState } from "react";
import style from "./Graph.module.scss";
import { Bar, Line } from "react-chartjs-2";
import { ICovidData } from "../../model";
import { ICountryGraph, IOdjectChart } from "../../model/graph.model";
import { updateChart } from "../../services/graph.services";
import { Spinner } from "../Spinner/Spinner";

interface Props {
  data: ICovidData;
  objChart: IOdjectChart;
  checked: boolean;
  response: ICountryGraph;
  isWord: boolean;
  chartContainer: { current: Bar | Line };
  daily: boolean;
  isLoading: boolean;
  country: { country: string; population: number };
}

const Graph: React.FC<Props> = ({
  country,
  data,
  objChart,
  checked,
  response,
  isLoading,
  isWord,
  chartContainer,
  daily,
}) => {
  const datas: any = {
    labels: [],
    datasets: [
      {
        barPercentage: 0.1,
        barThickness: 1,
        data: [],
        fill: false,
        backgroundColor: "#d21a1a",
        borderColor: "#d21a1a",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          color: "white",
          type: "time",
          position: "bottom",
          time: {
            units: "month",
            displayFormats: {
              month: "MMM",
            },
          },
        },
      ],
      yAxes: [
        {
          color: "white",
          type: "linear",
          ticks: {
            beginAtZero: true,

            callback: function (label: number) {
              if (Math.floor(label) === label) {
                return label >= 1000000
                  ? label / 1000000 + "M"
                  : label >= 1000
                  ? label / 1000 + "K"
                  : label;
              }
            },
          },
        },
      ],
    },
  };
  const [dataChart, setDataChart] = useState<any>(datas);
  const [optionChart, setOptionChart] = useState<any>(options);

  useEffect(() => {
    if (response && !isLoading) {
      const worlPopulation = 7827000000;
      updateChart(
        isWord ? response[objChart.cases] : response.timeline[objChart.cases],
        chartContainer,
        objChart.daily,
        objChart.type,
        checked,
        objChart.color,
        isWord ? worlPopulation : country.population
      );
    }
  }, [response, checked, objChart, isLoading]);

  if (!response || isLoading) return <Spinner />;
  return (
    <div className={style.container}>
      {daily ? (
        <Bar
          data={dataChart}
          options={optionChart}
          ref={chartContainer}
          redraw
        />
      ) : (
        <Line
          data={dataChart}
          options={optionChart}
          ref={chartContainer}
          redraw
        />
      )}
    </div>
  );
};

export default Graph;

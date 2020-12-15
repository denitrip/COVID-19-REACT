import React, { useEffect, useState } from "react";
import style from "./Graph.module.css";
import { Bar, Line } from "react-chartjs-2";
import { ICovidData } from "../../model";
import { ICountryGraph, IOdjectChart } from "../../model/graph.model";
import { updateChart } from "../../services/graph.services";

interface Props {
  data: ICovidData;
  objChart: IOdjectChart;
  checked: boolean;
  response: ICountryGraph;
  isWord: boolean;
  chartContainer: { current: Bar | Line };
  daily: boolean;
  isLoading: boolean;
}

const Graph: React.FC<Props> = ({
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
        backgroundColor: " red",
        borderColor: "red",
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
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
    if (response) {
      updateChart(
        isWord ? response[objChart.cases] : response.timeline[objChart.cases],
        chartContainer,
        objChart.daily,
        objChart.type,
        checked
      );
    }
  }, [response, checked, objChart]);

  if (!response)
    return (
      <div className={style.container}>
        <span className={style.spiner}></span>
      </div>
    );
  return (
    <div>
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

import React, { useEffect } from "react";
import style from "./Graph.module.css";
import { Bar, Line } from "react-chartjs-2";
import { updateChart } from "./service";

const data: any = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      fill: false,
      backgroundColor: "green",
      borderColor: "green",
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
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
            return label >= 1000000
              ? label / 1000000 + "M"
              : label >= 1000
              ? label / 1000 + "K"
              : label;
          },
        },
      },
    ],
  },
};

interface Props {
  className: string;
  response: any;
  isWord: boolean;
  chartContainer: any;
  daily: boolean;
  isLoading: boolean;
}

const Graph: React.FC<Props> = ({
  className,
  response,
  isLoading,
  isWord,
  chartContainer,
  daily,
}) => {
  useEffect(() => {
    if (response)
      updateChart(
        isWord ? response.cases : response.timeline.cases,
        chartContainer,
        true
      );
  }, [isLoading]);

  if (isLoading)
    return (
      <div className={style.container}>
        <span className={style.spiner}></span>
      </div>
    );
  return (
    <div className={className}>
      {daily ? (
        <Bar data={data} options={options} ref={chartContainer} />
      ) : (
        <Line data={data} options={options} ref={chartContainer} />
      )}
    </div>
  );
};

export default Graph;

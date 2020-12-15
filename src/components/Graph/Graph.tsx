import React, { useEffect } from "react";
import style from "./Graph.module.css";
import { Bar, Line } from "react-chartjs-2";
import { updateChart } from "../../services/requests.service";

const data: any = {
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

interface Props {
  response: any;
  isWord: boolean;
  chartContainer: any;
  daily: boolean;
  isLoading: boolean;
}

const Graph: React.FC<Props> = ({
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
    <div>
      {daily ? (
        <Bar data={data} options={options} ref={chartContainer} />
      ) : (
        <Line data={data} options={options} ref={chartContainer} />
      )}
    </div>
  );
};

export default Graph;

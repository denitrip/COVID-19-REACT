import { useEffect, useState } from "react";
import { IWordGraph } from "../model/graph.model";

export const useFetch = (url: string) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { response, error, isLoading };
};

export function updateChart(
  obj: IWordGraph,
  chart: any,
  daily: boolean,
  type: string,
  checked: boolean,
  color: string,
) {
  const chartData = chart.current.chartInstance.data;
  const chartOptions = chart.current.chartInstance.options;
  chartData.labels.length = 0;
  chartData.datasets[0].data.length = 0;

  Object.entries(obj).forEach(([key, value], i, arr: any) => {
    if (i === 0) {
      chartData.labels.push(key);
      chartData.datasets[0].data.push(!checked ? value : value / 100000);
    } else {
      chartData.labels.push(key);
      chartData.datasets[0].data.push(
        daily
          ? !checked
            ? arr[i][1] - arr[i - 1][1]
            : (arr[i][1] - arr[i - 1][1]) / 10000
          : !checked
            ? value
            : value / 100000
      );
    }
  });
  chartData.datasets[0].backgroundColor = color;
  chartData.datasets[0].borderColor = color;
  chartOptions.scales.yAxes[0].type = type;
  chart.current.chartInstance.update();
}

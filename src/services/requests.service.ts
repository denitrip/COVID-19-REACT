import { useEffect, useState } from "react";
import { COVID_API_URL } from "../constants";
import { POPULATION_AND_FLAGS_API_URL } from "../constants";
import { ICovidData, IWord } from "../model";
import { IPopulationAndFlags } from "../model/population-flags.model";

export const fetchCovidData = (): Promise<ICovidData> => {
  return fetch(COVID_API_URL).then((res) => res.json());
};

export const fetchPopulationAndFlags = (): Promise<IPopulationAndFlags[]> => {
  return fetch(POPULATION_AND_FLAGS_API_URL).then((res) => res.json());
};

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

export function updateChart(obj: IWord, chart: any, daily: boolean) {
  chart.current.props.data.labels.length = 0;
  chart.current.props.data.datasets[0].data.length = 0;
  Object.entries(obj).forEach(([key, value], i, arr: any) => {
    if (i === 0) {
      chart.current.props.data.labels.push(key);
      chart.current.props.data.datasets[0].data.push(value);
    } else {
      chart.current.props.data.labels.push(key);
      chart.current.props.data.datasets[0].data.push(
        daily ? arr[i][1] - arr[i - 1][1] : value
      );
    }
  });
  /* chart.current.props.options.scales.yAxes[0].type = "logarithmic"; */
  chart.current.chartInstance.update();
  chart.current.chartInstance.resize();
}

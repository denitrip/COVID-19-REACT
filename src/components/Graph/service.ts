import { useEffect, useState } from "react";

export interface ICountry {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

export interface IWord {
  cases: { [name: string]: number };
  deaths: { [name: string]: number };
  recovered: { [name: string]: number };
}

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

export function getData() {
  const data = new Date();
  const month =
    data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
  const day = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
  return `${data.getFullYear()}-${month}-${day}`;
}

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
  chart.current.props.options.scales.yAxes[0].type = "linear";
  chart.current.chartInstance.update();
}

export function updateChartCountry(
  array: ICountry[],
  value: string,
  chart: any,
  daily: boolean
) {
  chart.current.props.data.labels.length = 0;
  chart.current.props.data.datasets[0].data.length = 0;
  array.forEach((item: any, i, arr: any) => {
    if (i === 0) {
      chart.current.props.data.labels.push(item.Date);
      chart.current.props.data.datasets[0].data.push(item[value]);
    } else {
      chart.current.props.data.labels.push(item.Date);
      chart.current.props.data.datasets[0].data.push(
        daily ? arr[i][value] - arr[i - 1][value] : item[value]
      );
    }
  });
  chart.current.props.options.scales.yAxes[0].type = "linear";
  chart.current.chartInstance.update();
}

export function getLogCases(obj: IWord, chart: any) {
  chart.current.props.data.labels.length = 0;
  chart.current.props.data.datasets[0].data.length = 0;
  Object.entries(obj).forEach(([key, value]) => {
    chart.current.props.data.labels.push(key);
    chart.current.props.data.datasets[0].data.push(value);
  });
  chart.current.props.options.scales.yAxes[0].type = "logarithmic";
  chart.current.chartInstance.update();
}

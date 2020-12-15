import React, { useRef, useState } from "react";
import { useFetch } from "../../services/requests.service";
import Graph from "./Graph";
import MainListGraph from "./MenuListGraph";

interface Props {
  className: string;
}

const GraphContainer: React.FC<Props> = (props: any) => {
  const [country, setCountry] = useState<any>("belarus");
  const [isword, setIsWord] = useState<boolean>(true);
  const [daily, setDaily] = useState<boolean>(true);
  const chartContainer = useRef<any>(null);
  const urlWord = `https://disease.sh/v3/covid-19/historical/all?lastdays=366`;
  const urlCountry = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`;
  const { response, error, isLoading }: any = useFetch(
    isword ? urlWord : urlCountry
  );
  const updateDaily = (value: boolean): void => setDaily(value);
  return (
    <div className={props.className}>
      <Graph
        response={response}
        isLoading={isLoading}
        daily={daily}
        chartContainer={chartContainer}
        isWord={isword}
      />
      <MainListGraph
        response={response}
        updateDaily={updateDaily}
        daily={daily}
        chartContainer={chartContainer}
        isWord={isword}
      />
    </div>
  );
};

export default GraphContainer;

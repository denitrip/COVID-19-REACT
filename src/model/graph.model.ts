export interface IOdjectChart {
  daily: boolean;
  type: string;
  cases: string;
  color: string;
}

export interface ICountryGraph {
  country: string;
  province: string[];
  timeline: IWordGraph;
}

export interface IWordGraph {
  cases: { [name: string]: number };
  deaths: { [name: string]: number };
  recovered: { [name: string]: number };
}

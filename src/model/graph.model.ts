export interface IOdjectChart {
  daily: boolean;
  type: string;
  cases: string;
  color: string;
  country?: string;
  name?: string;
}

export interface ICountryGraph {
  country: string;
  province: string[];
  timeline: IWordGraph;
  message?: string;
}

export interface IWordGraph {
  cases: { [name: string]: number };
  deaths: { [name: string]: number };
  recovered: { [name: string]: number };
}

export interface IDataMenu {
  word: string;
  boolean: boolean;
  name: string;
  type: string;
  color: string;
  country: string;
}

export interface IUpdate {
  valueDaily: boolean;
  valueType: string;
  valueCases: string;
  valueColor: string;
  valueCountry: string;
  valueName: string;
}

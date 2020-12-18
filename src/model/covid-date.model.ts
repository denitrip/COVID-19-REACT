import { IPopulationAndFlags } from './population-flags.model';

export interface ICovidData {
  Date: string;
  Countries: ICommonData[]; //Array<ICountry>
  Global: IGlobal[];
}

export interface ICountry {
  Country: string;
  CountryCode: string;
  NewDeaths: number;
  Slug: string;
  NewConfirmed: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface IGlobal {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface ICommonData extends ICountry, IPopulationAndFlags {
  NewConfirmedRelative: string;
  NewDeathsRelative: string;
  NewRecoveredRelative: string;
  TotalConfirmedRelative: string;
  TotalDeathsRelative: string;
  TotalRecoveredRelative: string;
  id: string;
  name: string;
}

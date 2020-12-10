export interface ICovidData {
    Date: string;
    Countries: ICountry[]; //Array<ICountry>
}

export interface ICountry {
    Country: string;
    CountryCode: string;
    NewDeath: number;
}
import { COVID_API_URL } from "../constants";
import { ICovidData } from "../model";

export const fetchCovidData = (): Promise<ICovidData> => {
    return fetch(COVID_API_URL).then(res => res.json())
};
import { ICovidData } from "../model";

export const fetchCovidData = (url: string): Promise<ICovidData> => {
    return fetch(url).then(res => res.json())
};
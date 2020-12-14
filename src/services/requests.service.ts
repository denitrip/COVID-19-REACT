import { COVID_API_URL } from "../constants";
import { ICovidData } from "../model";
import { POPULATION_AND_FLAGS_API_URL } from "../constants";
import { IPopulationAndFlags } from "../model";

export const fetchCovidData = (): Promise<ICovidData> => {
    return fetch(COVID_API_URL).then(res => res.json())
};

export const fetchPopulationAndFlags = (): Promise<IPopulationAndFlags> => {
    return fetch(POPULATION_AND_FLAGS_API_URL).then(res => res.json())
};
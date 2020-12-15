import { fetchCovidData, fetchPopulationAndFlags } from '../services';

export const test = (): Promise<any> => {
    return Promise.all([fetchCovidData(), fetchPopulationAndFlags()])
        .then(values => {
            const obj = values[0].Countries.reduce((mod, el) => {
                const flag:any = values[1].find((f) => f.alpha2Code === el.CountryCode);
                if(flag) {
                    const arr = {
                        ...el,
                        ...flag,
                        id: el.CountryCode,
                        TotalConfirmedRelative: ((el.TotalConfirmed / flag.population) * 100000).toFixed(),
                        TotalRecoveredRelative: ((el.TotalRecovered / flag.population) * 100000).toFixed(),
                        TotalDeathsRelative: ((el.TotalDeaths / flag.population) * 100000).toFixed(),
                        NewConfirmedRelative: ((el.NewConfirmed / flag.population) * 100000).toFixed(2),
                        NewRecoveredRelative: ((el.NewRecovered / flag.population) * 100000).toFixed(2),
                        NewDeathsRelative: ((el.NewDeaths / flag.population) * 100000).toFixed(2),
                    }
                    mod.push(arr)
                }
                return mod
            }, []);
            return {
                Global: values[0].Global,
                Countries: obj,
            }
        })
};
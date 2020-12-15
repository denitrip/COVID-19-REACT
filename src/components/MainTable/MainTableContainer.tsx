import React, { useEffect, useState } from "react";
import MainTable from "./MainTable";
import { IdataField } from '../../model/main-table.model'

const MainTableContainer = (props: any) => {
    let [checked, setCheked] = useState<boolean>(false);
    let fieldsForData = [
        'NewConfirmed','NewDeaths','NewRecovered','TotalConfirmed','TotalDeaths','TotalRecovered'
    ]
    let otherData = {
        Country: "Russian Federation",
        CountryCode: "RU",
        Date: "2020-12-14T14:37:49Z",
        NewConfirmed: 27651,
        NewDeaths: 481,
        NewRecovered: 20177,
        Premium: {},
        Slug: "russia",
        TotalConfirmed: 2629699,
        TotalDeaths: 46404,
        TotalRecovered: 2086887,
    }
    let data = Object.entries(otherData).map(([key,value]) => { return {title:key.toString(), count:+value}
    }).filter(el => {return fieldsForData.includes(el.title)})

    const country = otherData.Country;
    const switchData = { onSwitchChange: setCheked, switchChecked: checked }
    useEffect(() => props.updateCheckAbsolut(checked), [checked])
    useEffect(() => setCheked(props.checkAbsolut), [props.checkAbsolut])
    if (checked) {
        for (let elem of data) {
            elem.count = Number((elem.count / 100000).toFixed(3));
        }
    }
    return (
        <MainTable payload={{ data, country }} className={props.className} switchData={switchData} />
    )
}

export default MainTableContainer;

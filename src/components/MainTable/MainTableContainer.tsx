import React, { useEffect, useState } from "react";
import MainTable from "./MainTable";
import { IdataField } from '../../model/main-table.model'

const MainTableContainer = (props: any) => {
    let [checked, setCheked] = useState<boolean>(false);
    let data: Array<IdataField> = [
        { title: 'NewConfirmed', count: 5415 },
        { title: 'TotalConfirmed', count: 265003 },
        { title: 'NewDeaths', count: 171 },
        { title: 'TotalDeaths', count: 6451 },
        { title: 'NewRecovered', count: 1092 },
        { title: 'TotalRecovered', count: 77362 },
    ]
    const country = 'Hungary';
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

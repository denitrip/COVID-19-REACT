import React from 'react';
import style from "./Header.module.css";
import { ICovidData } from "../../model";

const Header = (props: { data: ICovidData, className: string }) => {

    const data = props.data;
    console.log(data)

    return(
        <div className={[props.className, style.header_block].join(' ')}>
            <h1 className={style.header_name}>COVID-19 Dashboard</h1>
            <h3 className={style.header_date}>{data ? new Date(data.Date).toLocaleString() : ''}</h3>
        </div>
    )
}

export default Header

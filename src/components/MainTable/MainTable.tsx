import React from 'react'
import Switch from '../Switch/Switch';
import s from './MainTable.module.css';
import {IdataField} from '../../model/main-table.model'

const MainTable = (props:any) => {
    const data = props.payload.data;
    const tableRows = data.map((el:IdataField,index:number) => {
                return (
            <div className={s.table_element} key={index}>
                <p className={s.table_label}>{el.title}</p>
                <p className={s.table_data}>{el.count}</p>
            </div>
        )
    })
    return(
        <div className={[props.className, s.wrapper].join(' ')}>
            <p className={s.countryName}>{props.payload.country}</p>
            <div className={s.table_section}>
                {tableRows}
            </div>
            <div className={s.switchSection}>
            <span>Absolute count </span>
            <Switch Name='switch' checked={props.switchData.checked} onChange={props.switchData.onSwitchChange}/>
            <span>/100k count </span>
            </div>
        </div>
    )
}

export default MainTable

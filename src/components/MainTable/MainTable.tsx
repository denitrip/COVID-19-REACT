import React from "react";
import Switch from "../Switch/Switch";
import s from "./MainTable.module.scss";
import { IdataField, IMainTableProps } from "../../model/main-table.model";

const MainTable = (props: IMainTableProps) => {
  const data = props.payload.data;
  const tableRows = data.map((el: IdataField, index: number) => {
    return (
      <div className={s.table_element} key={index}>
        <p className={s.table_label}>{el.title}</p>
        <p className={s.table_data}>{el.count}</p>
      </div>
    );
  });

  return (
    <div className={[props.className, s.wrapper].join(" ")}>
      <p className={s.table_header}>
        <img src={props.countryFlag} alt="country flag" className={s.flag}/>
        <span>{props.payload.country}</span>
        </p>
      <div className={s.table_section}>{tableRows}</div>
      <div className={s.switchSection}>
        <span>Absolute count </span>
        <Switch
          name="switch"
          checked={props.switchData.switchChecked}
          onChange={props.switchData.onSwitchChange}
        />
        <span>/100k count </span>
      </div>
    </div>
  );
};

export default MainTable;

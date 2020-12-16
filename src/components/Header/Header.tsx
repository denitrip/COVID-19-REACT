import React from 'react';
import style from "./Header.module.css";

const Header = (props:any) => {
    return(
        <div className={[props.className, style.header_block].join(' ')}>
            <h1 className={style.header_name}>COVID-19 Dashboard</h1>
        </div>
    )
}

export default Header

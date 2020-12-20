import React, { useState } from "react";
import s from "./Map.module.css";
import Map from "./Map";
import open from '../../assets/image/171127-200.png';

const MapContainer = (props: any) => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className={`${props.className} ${isActive ? s.fullscreen : ""}`}>
      <Map
        getCountry={props.getCountry}
        countryObj={props.countryObj}
        updateCheckAbsolut={props.updateCheckAbsolut}
        checkAbsolut={props.checkAbsolut}
        data={props.data}
      />
      <button className={s.btn_fullscreen} onClick={handleToggle}><img src={open} /></button>
    </div>
    
  );
};

export default MapContainer;

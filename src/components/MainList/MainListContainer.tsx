import React, { useState } from "react";
import MainList from "./MainList";
import s from "./MainList.module.scss";
import open from '../../assets/image/171127-200.png';

const MainListContainer = (props: any) => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className={`${props.className} ${isActive ? s.fullscreen : ""}`}>
      <MainList
      isLoading={props.isLoading}
      objChart={props.objChart}
      updateObject={props.updateObject}
      className={props.className}
      updateCheckAbsolut={props.updateCheckAbsolut}
      checkAbsolut={props.checkAbsolut}
      getCountry={props.getCountry}
      data={props.data}
    />
      <button className={s.btn_fullscreen} onClick={handleToggle}><img src={open} /></button>
    </div>
  );
};

export default MainListContainer;

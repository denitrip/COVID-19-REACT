import React from "react";
import MainList from "./MainList";

const MainListContainer = (props: any) => {
  return (
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
  );
};

export default MainListContainer;

import React from "react";
import MainList from "./MainList";

const MainListContainer = (props: any) => {
  return (
    <MainList
      className={props.className}
      getCountry={props.getCountry}
      data={props.data}
    />
  );
};

export default MainListContainer;

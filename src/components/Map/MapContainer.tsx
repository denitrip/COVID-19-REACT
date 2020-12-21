import React from "react";
import Map from "./Map";

const MapContainer = (props: any) => {
  return (
    <Map
      objChart={props.objChart}
      updateObject={props.updateObject}
      getCountry={props.getCountry}
      countryObj={props.countryObj}
      updateCheckAbsolut={props.updateCheckAbsolut}
      checkAbsolut={props.checkAbsolut}
      data={props.data}
      className={props.className}
    />
  );
};

export default MapContainer;

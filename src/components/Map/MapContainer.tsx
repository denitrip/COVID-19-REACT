import React from "react";
import Map from "./Map";

const MapContainer = (props: any) => {
  return (
    <Map
      getCountry={props.getCountry}
      updateCheckAbsolut={props.updateCheckAbsolut}
      checkAbsolut={props.checkAbsolut}
      data={props.data}
      className={props.className}
    />
  );
};

export default MapContainer;

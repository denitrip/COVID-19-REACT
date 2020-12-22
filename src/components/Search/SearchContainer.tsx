import React from "react";
import Search from "./Search";

const SearchContainer = (props: any) => {
  return (
    <Search
      className={props.className}
      data={props.data}
      updateDataSearch={props.updateDataSearch}
    />
  );
};

export default SearchContainer;

import React from "react";
import style from "./Search.module.scss";

const Search = (props) => {
  const dataSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filter = props.data.Countries.filter((item) => {
      return item.Country.toLowerCase().slice(0, value.length) === value;
    });
    props.updateDataSearch(filter);
  };
  return (
    <div className={props.className}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <input
            type="text"
            className={style.input}
            placeholder="Search country..."
            onChange={dataSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

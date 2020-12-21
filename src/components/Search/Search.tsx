import React, { useEffect, useRef, useState } from "react";
import style from "./Search.module.scss";
import { Keyboard } from "../virtual-keyboard";
import keyboardSymbols from "../virtual-keyboard/assets/data/data";
import { ICommonData, ICovidData } from "../../model";

const Search = (props: {
  data: ICovidData;
  updateDataSearch: (value: ICommonData[]) => void;
  className: string;
}) => {
  const { data, updateDataSearch, className } = props;
  const [value, setValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const dataSearch = (e) => {
    setValue(e.target.value);
  };
  const keybordRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (data) {
      const filter = data.Countries.filter((item: ICommonData) => {
        return (
          item.Country.toLowerCase().slice(0, value.length) ===
          value.toLowerCase()
        );
      });
      setValue(value);
      updateDataSearch(filter);
    }
  }, [value]);
  useEffect(
    () =>
      keybordRef.current.append(
        new Keyboard(
          keyboardSymbols,
          inputRef.current,
          isActive,
          setValue
        ).render()
      ),
    []
  );

  return (
    <div className={className}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <input
            ref={inputRef}
            value={value || ""}
            type="text"
            className={style.input}
            placeholder="Search country..."
            onInput={dataSearch}
          />
          <span
            className={style.keybord}
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <i className="material-icons">
              {!isActive ? "keyboard" : "keyboard_hide"}
            </i>
          </span>
        </div>
      </div>
      <div
        className={isActive ? style.block : style.hidden}
        ref={keybordRef}
      ></div>
    </div>
  );
};

export default Search;

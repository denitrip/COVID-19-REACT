import React from "react";
import style from "./Spinner.module.scss";

export const Spinner: React.FC = () => {
  return (
    <div className={style.container}>
      <span className={style.spiner}></span>
    </div>
  );
};

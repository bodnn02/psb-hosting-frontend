import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import "iconify-icon";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
//import cardBallance from "../../public/cardBallance.svg";

import style from "./AccountReportItem.module.scss";

const AccountReportItem = ({ icon, title, description }) => {
  return (
    <div className={style["report__card"]}>
      <div className={style["report__card-ellipse"]}>
        <iconify-icon icon={icon}></iconify-icon>
      </div>
      <div className={style["report__card-text"]}>
        <h4 className={style["report__card-description"]}>{description}</h4>
        <h2 className={style["report__card-title"]}>{title}</h2>
      </div>
    </div>
  );
};

export default AccountReportItem;

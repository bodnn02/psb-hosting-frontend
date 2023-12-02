import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "../../../store/hooks";
import style from "../cardConfig/cardConfig.module.scss";

export default function cardConfig({
  handleclick,
  isSelectedConfigCard,
  infoCPU,
  infoRAM,
  infoSSD,
  infoCost,
}) {
  const { t } = useTranslation();
  const currentOrder = useAppSelector(
    (store) => store.currentOrder.currentOrder
  );

  return (
    <div
      className={isSelectedConfigCard ? style.card__selected : style.card}
      onClick={handleclick}
    >
      <p className={style.card__title}>{infoCPU}</p>
      <p className={style.card__title}>{infoRAM}</p>
      <p className={style.card__title}>{infoSSD}</p>
      <p className={style.card__title}>{infoCost}</p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "../../../store/hooks";
import Image from "next/image";
import { DropDownOS } from "../dropDownOS";
import style from "../cardSystem/cardSystem.module.scss";

export default function CardSystem({
  handleclick,
  isSelectedSystemCard,
  imageSrc,
  imageAlt,
  title,
}) {
  const { t } = useTranslation();
  const currentOrder = useAppSelector(
    (store) => store.currentOrder.currentOrder
  );
  const [system, setSystem] = useState("Debian 11");

  return (
    <div
      className={isSelectedSystemCard ? style.card__selected : style.card}
      onClick={handleclick}
    >
      <div className={style.card__info}>
        <Image
          className={style.card__image}
          src={imageSrc}
          alt={imageAlt}
          width={36}
          height={36}
        />
        <h4 className={style.card__title}>{title}</h4>
      </div>
      {currentOrder.system && (
        <DropDownOS
          list={currentOrder.system}
          name={system}
          setOption={setSystem}
          setName={setSystem}
        />
      )}
    </div>
  );
}

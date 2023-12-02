import { formatDate } from "../../utils/formatDateRu";
import { useTranslation } from "next-i18next";
import style from "../../styles/OrderCard.module.scss";

export default function Renewal({ children, date_end }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className={style["card__item-renewal"]}>
        {t("order-renewal")}&nbsp;
        {children}
      </div>
      <div className={style["card__item"]}>
        <p className={style["card__itemTitle"]}> {`${t("order-date")}`} </p>
        <p className={style["card__itemData"]}>
          &nbsp;{`${formatDate(date_end)}`}
        </p>
      </div>
    </div>
  );
}

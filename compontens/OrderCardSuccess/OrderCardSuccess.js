//import Link from "next/link";
//import { useTranslation } from "next-i18next";
import "iconify-icon";
//import { formatDateRu } from "../../utils/formatDateRu";
//import { formatDateEn } from "../../utils/formatDateEn";
import OrderCard from "../OrderCard/OrderCard";
import server from "../../public/server.svg";

//import style from "../../styles/OrderCard.module.scss";

const OrderCardSuccess = ({ order }) => {
  /*const { t } = useTranslation();
  const { id, status, auto_refresh, date_end, title, price } = order;*/

  return (
    <OrderCard order={order} />
    /*<li className={style["card"]}>
      <Link
        href={`/account/profile/order/${id}`}
        className={style["card__header-link"]}
      >
        <img
          src="/server.png"
          alt="icon server"
          className={style["card__img"]}
        />
      </Link>
      <div className={style["card__body"]}>
        <h3 className={style["card__title"]}>
          <Link
            href={`/account/profile/order/${id}`}
            className={style["card__link"]}
          >
            {title}
          </Link>
        </h3>
        <ul className={style["card__list"]}>
          <li className={style["card__item"]}>
            {t("order-status")}&nbsp;
            <span
              className={`${style["card__status"]} ${style["card__status_blue"]}`}
            >
              {status}
            </span>
          </li>
          <li className={style["card__item"]}>
            {`${t("order-price")} ${price}$/${t("order-price-period")}`}
          </li>
          <li className={style["card__item"]}>
            {`${t("order-name")} ${title}`}
          </li>
          <li className={style["card__item"]}>
            {t("order-renewal")}&nbsp;
            <span
              className={
                auto_refresh
                  ? style["card__text-success"]
                  : style["card__text-denger"]
              }
            >
              {auto_refresh ? t("auto-refresh-true") : t("auto-refresh-false")}
            </span>
          </li>
          <li className={style["card__item"]}>
            {`${t("order-date")} ${
              t("faq-lang") === "ru"
                ? formatDateRu(date_end)
                : formatDateEn(date_end)
            }`}
          </li>
        </ul>
      </div>
      <div className={style["card__footer"]}>
        <Link
          className={style["card__button-link"]}
          href={`/account/profile/order/${id}`}
        >
          <iconify-icon icon="simple-line-icons:key"></iconify-icon>
          &nbsp;{t("order-link")}
        </Link>
        <p className={style["card__message"]}>{t("order-text")}</p>
      </div>
    </li>*/
  );
};

export default OrderCardSuccess;

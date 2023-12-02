import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import "iconify-icon";

import { getOrderHistory } from "../../api/getOrderHistory";
import { makeAutoProlong } from "../../api/makeAutoProlong";
import { getUser } from "../../api/getUser";
import { fetchUser } from "../../store/slices/user";
import { useAppDispatch } from "../../store/hooks";
import MessagePopup from "../MessagePopup/MessagePopup";
import OrderCard from "../OrderCard/OrderCard";
import server from "../../public/server.svg";

import style from "../../styles/OrderCard.module.scss";

const OrderCardPending = ({ order }) => {
  const { t } = useTranslation();
  const { id, order_id, status, auto_refresh, title, bill_id } = order;
  const dispatch = useAppDispatch();

  const [isPaid, setIsPaid] = useState(true);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeButton, setActiveButton] = useState(true);
  const [paySys, setPaySys] = useState("");

  const fetchDataPending = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getOrderHistory(token, bill_id);
      const item = data.find((el) => el.invoice_id === bill_id);

      if (item) {
        setIsPaid(false);
        setPaySys(item.pay_sys);
      }
    }
  };

  const fetchUserData = async (token) => {
    const data = await getUser(token);
    if (data) dispatch(fetchUser(data));
  };

  const fetchDataBlocked = async () => {
    setActiveButton(false);
    setIsPopupOpen(true);
    setIsSuccess(true);
    setMessage(t("error-pending-password"));

    const token = localStorage.getItem("token");
    if (token) {
      const data = await makeAutoProlong(token, id);
      if (data && Number(data.status) === 200) {
        setIsPopupOpen(true);
        setIsSuccess(true);
        setMessage(t("error-autoprolong"));
        setActiveButton(true);
        fetchUserData(token);
      } else if (data && Number(data.status) !== 200) {
        setIsPopupOpen(true);
        setIsSuccess(false);
        setMessage(t("error-autoprolong-err"));
        setActiveButton(true);
      } else {
        setIsPopupOpen(true);
        setIsSuccess(false);
        setMessage(t("error"));
        setActiveButton(true);
      }
    }
  };

  useEffect(() => {
    if (order && status === "Обработка заказа") {
      fetchDataPending();
    }
  }, [order]);

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
        <h3 className={style["card__title"]}>{status}</h3>
        <ul className={style["card__list"]}>
          <li className={style["card__item"]}>
            {t("order-status")}&nbsp;
            <span
              className={`${style["card__status"]} ${style["card__status_orange"]}`}
            >
              {status}
            </span>
          </li>
          <li className={style["card__item"]}>
            {`${t("order-number")} ${order_id}`}
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
        </ul>
      </div>

      <div className={style["card__footer"]}>
        {!isPaid && paySys === "Cryptocloud" && (
          <Link
            className={style["card__button-pay"]}
            href={`https://pay.cryptocloud.plus/${bill_id}`}
          >
            <iconify-icon icon="mdi-light:credit-card"></iconify-icon>
            &nbsp;{t("order-pay")}
          </Link>
        )}
        {!isPaid && paySys === "LAVA" && (
          <Link
            className={style["card__button-pay"]}
            href={`https://pay.lava.ru/invoice/${bill_id}`}
          >
            <iconify-icon icon="mdi-light:credit-card"></iconify-icon>
            &nbsp;{t("order-pay")}
          </Link>
        )}
        {!isPaid && paySys === "Cryptomus" && (
          <Link
            className={style["card__button-pay"]}
            href={`https://pay.cryptomus.com/pay/${bill_id}`}
          >
            <iconify-icon icon="mdi-light:credit-card"></iconify-icon>
            &nbsp;{t("order-pay")}
          </Link>
        )}
        {status === "Заблокирован за неуплату" && (
          <button
            className={style["card__button-pay"]}
            onClick={fetchDataBlocked}
            type="button"
            disabled={!activeButton}
          >
            <iconify-icon icon="mdi-light:credit-card"></iconify-icon>
            &nbsp;{t("order-pay")}
          </button>
        )}
        <Link
          className={style["card__button-link"]}
          href="https://t.me/psbhosting"
        >
          <iconify-icon icon="ion:rocket-outline"></iconify-icon>
          &nbsp;{t("order-support")}
        </Link>
      </div>

      <MessagePopup
        message={message}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </li>*/
  );
};

export default OrderCardPending;

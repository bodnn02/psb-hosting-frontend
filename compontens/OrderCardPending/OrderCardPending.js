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
import server_bulletproof from "../../public/server_bulletproof.svg";
import server_vpn from "../../public/server_vpn.svg";
import server_vps from "../../public/server_vps.svg";
import Renewal from "../Renewal/Renewal";
import Image from "next/image";


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
    <>
      <div className={style["card"]}>
        <div className={style["card__header"]}>
          <Link
            href={`/account/profile/order/${order.id}`}
            className={style["card__header-link"]}
          >
            <Image alt="server" src={
              order.type === 'VPS'
                ? server_vps
                : order.type === 'VPN'
                  ? server_vpn
                  : order.type.includes('Bulletproof') || order.type.includes('hosting')
                    ? server_bulletproof
                    : ''
            } width={48} height={48} />
          </Link>
          <div className={style["card__header-info"]}>
            <h3 className={style["card__title"]}>
              <Link
                href={`/account/profile/order/${order.id}`}
                className={style["card__link"]}
              >
                {order.title}
              </Link>
            </h3>
            <div className={style["card__priceSection"]}>
              <p className={style["card__itemTitle"]}> {t("order-price")} </p>
              <p className={style["card__card__itemData"]}>
                &nbsp;{`${order.price}$/${t("order-price-period")}`}
              </p>
            </div>
          </div>
        </div>
        <p
          className={`${style["card__status"]} ${order.status === "Заказ выдан"
            ? style["card__status_green"]
            : order.status === "Заблокирован за неуплату"
            ? style["card__status_red"]
            : style["card__status_blue"]
            }`}
        >
          {order.status === "Заказ выдан"
            ? t("order-status-issued")
            : order.status === "Заблокирован за неуплату"
            ? t("order-status-blocked")
            : order.status === "Обработка заказа" && isPaid
            ? t("order-status-awaiting-issue")
            : order.status === "Обработка заказа" && !isPaid
            ? t("order-status-awaiting-payment")
            : null}
        </p>
        <p className={style["card__nameService"]}>{`${order.type}`}</p>
        <Renewal date_end={order.date_end}></Renewal>
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
        </div>
      </div>
      <MessagePopup
        message={message}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </>
  );
};

export default OrderCardPending;

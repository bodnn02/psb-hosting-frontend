import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { toggleAutoRefresh } from "../../api/toggleAutoRefresh";
import { getCurrentOrder } from "../../api/getCurrentOrder";
import { fetchCurrentOrder } from "../../store/slices/currentOrder";
import { fetchOrders } from "../../store/slices/orders";
import { getOrders } from "../../api/getOrders";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "iconify-icon";
import Renewal from "../Renewal/Renewal";
import Image from "next/image";
import Link from "next/link";
import useToggleAutoRefresh from "../../hooks/useToggleAutoRefresh";
import MessagePopup from "../MessagePopup/MessagePopup";
import server_bulletproof from "../../public/server_bulletproof.svg";
import server_vpn from "../../public/server_vpn.svg";
import server_vps from "../../public/server_vps.svg";

import style from "../../styles/OrderCard.module.scss";

const OrderCard = ({ order }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  //const [message, setMessage] = useState("");
  //const [isPopupOpen, setIsPopupOpen] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);

  /*const fetchDataOrders = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const data = await getOrders(token);
    if (data) dispatch(fetchOrders(data));
  };*/

  const {
    handleToggleAutoRefresh,
    message,
    setMessage,
    isPopupOpen,
    setIsPopupOpen,
    isSuccess,
    setIsSuccess,
  } = useToggleAutoRefresh(order);

  /*const handleToggleAutoRefresh = async () => {
    console.log(order);
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const billId = order.qr ? order.bill_id : order.bill_id;

    if (token) {
      const res = await toggleAutoRefresh(token, order.bill_id);

      if (res) {
        setMessage(t("error-saved"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        fetchDataOrders();
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
      }
    }
  };*/

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
            : order.type === 'Bulletproof'
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
          className={`${style["card__status"]} ${
            order.status === "Заказ выдан"
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
            : order.status === "Обработка заказа"
            ? t("order-status-awaiting-issue")
            : null}
        </p>
        <p className={style["card__nameService"]}>{`${order.type}`}</p>
        <Renewal date_end={order.date_end}>
          <input
            onChange={handleToggleAutoRefresh}
            checked={order.auto_refresh}
            disabled={
              order.status === "Заблокирован за неуплату" ? true : false
            }
            type="checkbox"
            className={style["card__checkbox"]}
          />
        </Renewal>
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

export default OrderCard;

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

const OrderCardBlocked = ({ order }) => {
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
    <OrderCard className={style.OrderCardBlocked} order={order}  />
  );
};

export default OrderCardBlocked;

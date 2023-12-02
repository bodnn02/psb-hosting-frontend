import { useState } from "react";
import { toggleAutoRefresh } from "../api/toggleAutoRefresh";
import { getCurrentOrder } from "../api/getCurrentOrder";
import { getOrders } from "../api/getOrders";
import { fetchOrders } from "../store/slices/orders";
import { fetchCurrentOrder } from "../store/slices/currentOrder";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";

const useToggleAutoRefresh = (currentOrder) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeButtonAutoRefresh, setActiveButtonAutoRefresh] = useState(true);

  const accountPath = pathname === "/account";

  const fetchData = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const res = await getCurrentOrder(
        token,
        currentOrder.order[0].id || currentOrder.id
      );
      if (res && res[0]) {
        dispatch(fetchCurrentOrder(res[0]));
      }
    }
  };

  const fetchDataOrders = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const data = await getOrders(token);
    if (data) dispatch(fetchOrders(data));
  };

  const handleToggleAutoRefresh = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const billId = accountPath
      ? currentOrder.bill_id
      : currentOrder.qr
      ? currentOrder.bill_id
      : currentOrder.order[0].bill_id;

    if (token) {
      const res = await toggleAutoRefresh(token, billId);
      //setActiveButtonAutoRefresh(false);

      if (res) {
        setMessage(t("error-saved"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        accountPath ? fetchDataOrders() : fetchData();
        setActiveButtonAutoRefresh(true);
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        //setActiveButtonAutoRefresh(true);
      }
    }
  };

  return {
    message,
    setMessage,
    isPopupOpen,
    setIsPopupOpen,
    isSuccess,
    setIsSuccess,
    activeButtonAutoRefresh,
    handleToggleAutoRefresh,
  };
};

export default useToggleAutoRefresh;

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import AccountReportItem from "../AccountReportItem/AccountReportItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import style from "./ReportList.module.scss";

export default function ReportList({ reportListView }) {
  const { t } = useTranslation();
  const user = useAppSelector((store) => store.user.user);
  const [cost, setCost] = useState(0);
  const [activeServises, setActiveServises] = useState(0);
  const orders = useAppSelector((store) => store.orders.orders);

  useEffect(() => {
    if (orders) {
      const amount = orders.reduce((sum, el) => {
        if (el.status === "Заказ выдан") sum = sum + Number(el.price);
        return sum;
      }, 0);

      setCost(amount);
    }
  }, [orders]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const activeOrders = orders.filter((el) => el.status === "Заказ выдан");
      setActiveServises(activeOrders.length);
    }
  }, [orders]);

  return (
    <div className={style[`reportList__${reportListView}`]}>
      <AccountReportItem
        icon={"ion:card-outline"}
        title={user && `${user.balance}$`}
        description={t("balance")}
      />
      <div className={style["reportList__separator-line"]} />
      <AccountReportItem
        icon={"ci:suitcase"}
        title={`${cost}$`}
        description={t("expense")}
      />
      <div className={style["reportList__separator-line"]} />
      <AccountReportItem
        icon={"heroicons:credit-card"}
        title={activeServises}
        description={t("active-servises")}
      />
    </div>
  );
}

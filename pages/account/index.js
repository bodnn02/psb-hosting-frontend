import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { connect } from "react-redux";
import "iconify-icon";

import LayoutAccount from "../../compontens/LayoutAccount/LayoutAccount";
import OrderCardPending from "../../compontens/OrderCardPending/OrderCardPending";
import OrderCardSuccess from "../../compontens/OrderCardSuccess/OrderCardSuccess";
import OrderCardBlocked from "../../compontens/OrderCardBlocked/OrderCardBlocked";
import { fetchOrders } from "../../store/slices/orders";
import { getOrders } from "../../api/getOrders";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import style from "../../styles/Account.module.scss";

const Account = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.orders.orders);
  const login = useAppSelector((store) => store.login.login);

  const fetchDataOrders = async (token) => {
    const data = await getOrders(token);
    if (data) dispatch(fetchOrders(data));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && login) fetchDataOrders(token);
  }, [login]);

  return (
    <>
      <section className={style["goods"]}>
        <ul className={style["goods__list"]}>
          {orders &&
            orders.map((el) => {
              switch (el.status) {
                case "Обработка заказа":
                  return <OrderCardPending key={el.id} order={el} />;
                case "Заблокирован за неуплату":
                  return <OrderCardBlocked key={el.id} order={el} />;
                case "Заказ выдан":
                  return <OrderCardSuccess key={el.id} order={el} />;
                default:
                  return null;
              }
            })}
        </ul>
      </section>
    </>
  );
};

Account.getLayout = function getLayout(page) {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export default connect((state) => state)(Account);

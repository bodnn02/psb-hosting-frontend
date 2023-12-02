import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import "iconify-icon";
import AccountReportItem from "../AccountReportItem/AccountReportItem";
import ReportList from "../ReportList/ReportList";

import AccountHeaderNavmenu from "../AccountHeaderNavmenu/AccountHeaderNavmenu";
import { getUser } from "../../api/getUser";
import { fetchUser } from "../../store/slices/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import style from "./AccountHeader.module.scss";

const AccountHeader = ({
  chooseLanquage,
  openPopupProfile,
  setXCoordPopupProfile,
  toggleSidebar,
  isButtonSidebarMiniHidden,
  isHeaderNamenuVisible,
  toggleHeaderNavmenu,
  setIsHeaderNamenuVisible = { setIsHeaderNamenuVisible },
}) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const login = useAppSelector((store) => store.login.login);
  const orders = useAppSelector((store) => store.orders.orders);
  const menu = useRef();
  const { t } = useTranslation();

  const [activeServises, setActiveServises] = useState(0);
  const [cost, setCost] = useState(0);

  const fetchData = async (token) => {
    const data = await getUser(token);
    if (data) dispatch(fetchUser(data));
  };

  const closeMenu = () => {
    // setIsHeaderNamenuVisible(false);
  };

  const handleClickOutside = (evt) => {
    // if (menu.current && !menu.current.contains(evt.target)) {
    //   setIsHeaderNamenuVisible(false);
    // }
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", closeMenu);

  //   return () => {
  //     window.removeEventListener("scroll", closeMenu);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, true);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  useEffect(() => {
    const lang = localStorage.getItem("MY_LANGUAGE");
    lang === "en" ? i18n.changeLanguage("en") : i18n.changeLanguage("ru");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user && login) fetchData(token);
  }, [user, login]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const activeOrders = orders.filter((el) => el.status === "Заказ выдан");
      setActiveServises(activeOrders.length);
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      const amount = orders.reduce((sum, el) => {
        if (el.status === "Заказ выдан") sum = sum + Number(el.price);
        return sum;
      }, 0);

      setCost(amount);
    }
  }, [orders]);

  return (
    <header
      className={`${style["header"]} ${
        isButtonSidebarMiniHidden ? style["header_mini"] : ""
      }`}
    >
      {/*<button
        className={style["header__toggle-sidebar"]}
        type="button"
        aria-label="button toggle sidebar"
        onClick={toggleSidebar}
    ></button>*/}
      {/*<div className={style["sidebar__header"]}>
        <Link href="/account">
          <img src="/logo.png" alt="logo" />
        </Link>
  </div>*/}
      <Link className={style["header__link-logo"]} href="/account">
        <img src="/logo.png" alt="logo" />
      </Link>
      <ReportList reportListView={"header-report-list"} />
      {/*<div className={style["header__report-list"]}>
        <AccountReportItem
          icon={"ion:card-outline"}
          title={user && `${user.balance}$`}
          description={t("balance")}
        />
        <div className={style["header__separator-line"]} />
        <AccountReportItem
          icon={"ci:suitcase"}
          title={`${cost}$`}
          description={t("expense")}
        />
        <div className={style["header__separator-line"]} />
        <AccountReportItem
          icon={"heroicons:credit-card"}
          title={activeServises}
          description={t("active-servises")}
        />
      </div>*/}
      <nav className={style["header__navbar-desktop"]}>
        <AccountHeaderNavmenu
          chooseLanquage={chooseLanquage}
          openPopupProfile={openPopupProfile}
          setXCoordPopupProfile={setXCoordPopupProfile}
          setIsHeaderNamenuVisible={setIsHeaderNamenuVisible}
        />
      </nav>
      {/*<button
        className={style["header__toggler-menu"]}
        type="button"
        onClick={toggleHeaderNavmenu}
      >
        <iconify-icon icon="fluent:more-vertical-24-filled"></iconify-icon>
      </button>*/}
      <nav
        className={`${style["header__mobile-menu"]} ${
          isHeaderNamenuVisible ? style["header__mobile-menu_show"] : ""
        }`}
        ref={menu}
      >
        <AccountHeaderNavmenu
          chooseLanquage={chooseLanquage}
          openPopupProfile={openPopupProfile}
          setXCoordPopupProfile={setXCoordPopupProfile}
          setIsHeaderNamenuVisible={setIsHeaderNamenuVisible}
        />
      </nav>
    </header>
  );
};

export default AccountHeader;

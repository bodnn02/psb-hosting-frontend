import Link from "next/link";
import { useTranslation } from "next-i18next";
import "iconify-icon";
import { useEffect, useRef } from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import style from "./AccountSidebar.module.scss";

const AccountSidebar = ({
  isSidebarMini,
  mouseEnterSidebar,
  mouseLeaveSidebar,
  isSidebarVisible,
  setIsSidebarVisible,
}) => {
  const { t } = useTranslation();
  const sidebar = useRef();
  const windowWidth = useWindowWidth();

  const closeSidebar = () => {
    // setIsSidebarVisible(false);
  };

  const handleClickOutside = (evt) => {
    // if (sidebar.current && !sidebar.current.contains(evt.target)) {
    //   setIsSidebarVisible(false);
    // }
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", closeSidebar);

  //   return () => {
  //     window.removeEventListener("scroll", closeSidebar);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, true);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  return (
    <aside
      className={`${style["sidebar"]} ${
        isSidebarMini ? style["sidebar_mini"] : ""
      } ${
        isSidebarVisible && windowWidth <= 991 ? style["sidebar_visible"] : ""
      }`}
      onMouseEnter={mouseEnterSidebar}
      onMouseLeave={mouseLeaveSidebar}
      ref={sidebar}
    >
      {/*<div className={style["sidebar__header"]}>
        <Link href="/account" onClick={closeSidebar}>
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>*/}
      <nav
        className={`${style["sidebar__nav-menu"]} ${
          isSidebarMini ? style["sidebar__nav-menu_mini"] : ""
        }`}
      >
        <ul
          className={`${style["sidebar__nav-menu-list"]} ${
            isSidebarMini ? style["sidebar__nav-menu-list_hidden"] : ""
          }`}
        >
          <li className={style["sidebar__item"]}>
            {/*<h3 className={style['sidebar__subtitle']}>
              {t('home-page')}
            </h3>*/}
            <Link href="/account" onClick={closeSidebar}>
              <iconify-icon icon="line-md:grid-3-filled"></iconify-icon>
              {t("account-page")}
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            {/*<h3 className={style["sidebar__subtitle"]}>
              {t("category-store")}
            </h3>*/}
            <ul className={style["sidebar__shop-item"]}>
              <li>
                <Link
                  className={style["sidebar__shop-link"]}
                  href="/account/shop"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="bx:data"></iconify-icon>
                  {t("link-vps")}
                </Link>
              </li>
              <li>
                <Link
                  className={style["sidebar__shop-link"]}
                  href="/account/shop/bulletproof"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="ci:rows"></iconify-icon>
                  {t("link-abuse")}
                </Link>
              </li>
              {/* <li>
                <Link
                  className={style["sidebar__shop-link"]}
                  href="/account/shop/bulletproof"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="ci:layer"></iconify-icon>
                  {t("link-bulletproof-vds")}
                </Link>
              </li> */}
              <li>
                <Link
                  className={style["sidebar__shop-link"]}
                  href="/account/shop/hosting"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="fe:layer"></iconify-icon>
                  {t("link-hosting")}
                </Link>
              </li>
              <li>
                <Link
                  className={style["sidebar__shop-link"]}
                  href="/account/shop/vpn"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="ph:globe"></iconify-icon>
                  {t("link-vpn")}
                </Link>
              </li>
            </ul>
          </li>
          <li className={style["sidebar__item"]}>
            {/*<h3 className={style["sidebar__subtitle"]}>
              {t("category-finances")}
            </h3>*/}
            <Link href="/account/balance" onClick={closeSidebar}>
              <iconify-icon icon="ci:shopping-bag-02"></iconify-icon>
              {t("link-wallet")}
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            {/*<h3 className={style["sidebar__subtitle"]}>
              {t("category-support")}
            </h3>*/}
            <ul>
              {/* <li>
                <Link
                  href="https://psb-hosting-pro.gitbook.io/documentations/"
                  onClick={closeSidebar}
                >
                  <iconify-icon icon="ci:book-open"></iconify-icon>
                  {t("link-doc")}
                </Link>
              </li> */}
              {/*<li>
                <Link href="/account/rules" onClick={closeSidebar}>
                  <iconify-icon icon="material-symbols:help-outline-rounded"></iconify-icon>
                  {t("link-service")}
                </Link>
              </li>*/}
            </ul>
          </li>
        </ul>
        <ul
          className={`${style["sidebar__nav-menu-mini"]} ${
            isSidebarMini ? style["sidebar__nav-menu-mini_show"] : ""
          }`}
        >
          <li className={style["sidebar__item"]}>
            <Link href="/account" onClick={closeSidebar}>
              <iconify-icon icon="mi:grid"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/shop" onClick={closeSidebar}>
              <iconify-icon icon="lucide:server"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/shop/bulletproof" onClick={closeSidebar}>
              <iconify-icon icon="ph:text-b-bold"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/shop/hosting" onClick={closeSidebar}>
              <iconify-icon icon="fa:plug"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/vpn" onClick={closeSidebar}>
              <iconify-icon icon="fa6-solid:rocket"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/balance" onClick={closeSidebar}>
              <iconify-icon icon="lucide:credit-card"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="https://psb-hosting-pro.gitbook.io/documentations/">
              <iconify-icon icon="ci:book-open"></iconify-icon>
            </Link>
          </li>
          <li className={style["sidebar__item"]}>
            <Link href="/account/rules" onClick={closeSidebar}>
              <iconify-icon icon="material-symbols:help-outline-rounded"></iconify-icon>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AccountSidebar;

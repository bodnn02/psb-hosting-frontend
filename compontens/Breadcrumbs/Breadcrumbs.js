import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";
import useWindowWidth from "../../hooks/useWindowWidth";

import { useAppSelector } from "../../store/hooks";
import { PATH_LIST_RU, PATH_LIST_EN } from "../../utils/constants";

import style from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const pathname = usePathname();
  const vdsVps = useAppSelector((store) => store.vdsVps.vdsVps);
  const vpn = useAppSelector((store) => store.vpn.vpn);
  const vsdVpsBulletproof = useAppSelector(
    (store) => store.vdsVpsBulletproof.vdsVpsBulletproof
  );
  const hosting = useAppSelector((store) => store.hosting.hosting);
  const currentOrder = useAppSelector(
    (store) => store.currentOrder.currentOrder
  );

  const [lastCrumb, setLastCrumb] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [nameOrder, setNameOrder] = useState("");

  const replasePath = (crumb, pathList) => {
    crumb = pathList[crumb];
    return crumb;
  };

  const findNameItemWhithId = (itemList, id) => {
    const item = itemList.find((el) => el.id === id);

    if (item) return item.title;
  };

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    const asPath = pathWithoutQuery.split("/").filter((el) => el.length > 0);

    if (asPath.length === 4 && asPath.includes("profile")) {
      let name;

      if (currentOrder && currentOrder.order && currentOrder.order[0].title) {
        name = `${currentOrder.order[0].title}`;
      } else if (currentOrder && currentOrder.qr) {
        name = "VPN";
      }
      setNameOrder(name);
    } else {
      setNameOrder("");
    }
  }, [currentOrder, router]);

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    const asPath = pathWithoutQuery.split("/").filter((el) => el.length > 0);

    if (asPath.length === 1) {
      const path =
        locale === "en"
          ? replasePath(asPath[0], PATH_LIST_EN)
          : replasePath(asPath[0], PATH_LIST_RU);
      setLastCrumb(t("active-orders"));
      setPageTitle(path);
    } else if (asPath.length === 4 && asPath.includes("shop")) {
      let name = "";

      if (asPath[2] === "vps" && vdsVps) {
        name = findNameItemWhithId(vdsVps, +asPath[3]);
      } else if (asPath[2] === "vpn" && vpn) {
        name = findNameItemWhithId(vpn, +asPath[3]);
      } else if (asPath[2] === "bulletproof" && vsdVpsBulletproof) {
        name = findNameItemWhithId(vsdVpsBulletproof, +asPath[3]);
      } else if (asPath[2] === "hosting" && hosting) {
        name = findNameItemWhithId(hosting, +asPath[3]);
      }

      const title = `${t("path-new-service")} ${name}`;
      setPageTitle(title);
      setLastCrumb(t("category-store"));
    } else if (asPath.length === 4 && asPath.includes("profile")) {
      /*setPageTitle(`${t("path-order")} #${nameOrder}`);*/
      setLastCrumb(t("active-orders"));
    } else if (balancePath) {
      setLastCrumb(t("account-page"));
    } else {
      const path =
        locale === "en"
          ? replasePath(asPath[1], PATH_LIST_EN)
          : replasePath(asPath[1], PATH_LIST_RU);
      const path2 =
        locale === "en"
          ? replasePath(asPath[2], PATH_LIST_EN)
          : replasePath(asPath[2], PATH_LIST_RU);
      setLastCrumb(path2);
      if (asPath[2] == undefined) {
        setLastCrumb('VPS');
      }
      setPageTitle(path);
    }
  }, [router, locale]);

  const accountPath = pathname === "/account/profile";
  const balancePath = pathname === "/account/balance";

  return (
    <section className={style["breadcrumbs"]}>
      <div className={style["breadcrumbs__container"]}>
        <h1 className={style["breadcrumbs__title"]}>
          {nameOrder || accountPath || balancePath ? (
            <>{/*`${t("path-order")} ${nameOrder}`*/}</>
          ) : (
            pageTitle
          )}
        </h1>
        <ol className={style["breadcrumbs__list"]}>
          {<li className={style['breadcrumbs__link']}>
            {/* <a href='/account'>
              {lastCrumb === t('account-page') ? t('home-page') : t('account-page')}
            </a> */}
          </li>}
          <li className={style["breadcrumbs__item"]}>
            <a href='/account'>
            &nbsp;{nameOrder || accountPath || balancePath ? "<" : "/"}&nbsp;
            {(windowWidth < 1280 && pathname.includes("order")) ||
              (windowWidth < 1280 && accountPath) ||
              (windowWidth < 1280 && balancePath)
              ? ""
              : lastCrumb}
            </a>
          </li>
        </ol>
      </div>
      {nameOrder && (
        <h2 className={style["breadcrumbs__orderName"]}>{`${t(
          "profile-order"
        )} на аренду сервера ${nameOrder}`}</h2>
      )}
      {accountPath && (
        <h2 className={style["breadcrumbs__orderName"]}>
          {t("profile-title")}
        </h2>
      )}
      {balancePath && (
        <h2 className={style["breadcrumbs__orderName"]}>{t("link-wallet")}</h2>
      )}
      <div></div>
    </section>
  );
};

export default Breadcrumbs;

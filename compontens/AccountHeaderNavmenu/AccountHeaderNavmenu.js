import { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import "iconify-icon";
import Language from "../../compontens/Language/Language";
import { useRouter } from "next/router";
import NavMenu from "../AppHeader/NavMenu";
import AccountSidebar from "../AccountSidebar/AccountSidebar";

import useWindowWidth from "../../hooks/useWindowWidth";

import style from "../AccountHeader/AccountHeader.module.scss";

const AccountHeaderNavmenu = ({
  chooseLanquage,
  openPopupProfile,
  setXCoordPopupProfile,
  onToggleMobileMenu
}) => {
  const account = useRef();
  const { ready, i18n } = useTranslation("translation");
  const windowWidth = useWindowWidth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { locale, pathname, asPatch, query } = router;
  const [isSidebarMini, setIsSideBarMini] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const mouseEnterSidebar = () => {
    // setIsMobileMenuOpen(false);
    // setIsSidebarVisible(false); // Закрытие sidebar при закрытии mobile menu
  };

  const mouseLeaveSidebar = () => {
    setIsMobileMenuOpen(false);
    setIsSidebarVisible(false); // Закрытие sidebar при закрытии mobile menu
  };

  useEffect(() => {
    if (ready) setIsLoading(false);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem("MY_LANGUAGE", locale);

    if (locale === "en") {
      router.push({ pathname, query }, asPatch, { locale: "en" });
    } else {
      router.push({ pathname, query }, asPatch, { locale: "ru" });
    }
  }, []);

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    setIsSidebarVisible((prevState) => !prevState); // Добавлено переключение видимости sidebar
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSidebarVisible(false); // Закрытие sidebar при закрытии mobile menu
  };

  const arrowDown = (
    <div className={`${style["popup__button-arrow"]}`}>
      <iconify-icon icon="ph:caret-down-bold"></iconify-icon>
    </div>
  );

  const sendCoordinatesProfile = (evt) => {
    if (windowWidth > 991) {
      const right = evt.target.getBoundingClientRect().right;
      openPopupProfile(right);
    } else {
      openPopupProfile(0);
    }
  };

  useEffect(() => {
    if (windowWidth > 991) {
      const xAccount = account.current.getBoundingClientRect().right;
      setXCoordPopupProfile(xAccount);
    }
  }, [windowWidth]);

  return (
    <ul className={style["header__navbar"]}>
      <li className={style["header__navbar-item"]}>
        <Language
          isMobileMenuOpen={isMobileMenuOpen}
          setIsLoading={setIsLoading}
        />
      </li>
      <li
        className={`${style["header__navbar-item"]} ${style["header__navbar-item_avatar"]}`}
      >
        <div
          ref={account}
          className={style["header__avatar"]}
          onClick={sendCoordinatesProfile}
        >
          H
        </div>
      </li>

      {windowWidth > 600 ? (
        <NavMenu />
      ) : (
        <div className={`${style.hamburger_btn}`}>
          <div
            className={`${style.hamburger} ${!isMobileMenuOpen ? style.hamburgerActive : ""
              }`}
            onClick={handleHamburgerClick}
          >
            <iconify-icon
              icon="charm:menu-hamburger"
              width="40"
              heigth="40"
            ></iconify-icon>
          </div>
          <div
            className={`${style.hamburgerClose} ${isMobileMenuOpen ? style.hamburgerCloseActive : ""
              }`}
            onClick={closeMobileMenu}
          >
            <iconify-icon
              icon="material-symbols:close"
              width="40"
              heigth="40"
            ></iconify-icon>
          </div>
          <AccountSidebar
            isSidebarMini={isSidebarMini}
            mouseEnterSidebar={mouseEnterSidebar}
            mouseLeaveSidebar={mouseLeaveSidebar}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
        </div>
      )}
    </ul>
  );
};

export default AccountHeaderNavmenu;

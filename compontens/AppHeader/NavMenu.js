import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "iconify-icon";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Language from "../../compontens/Language/Language";
import { useAppSelector } from "../../store/hooks";
import useWindowWidth from "../../hooks/useWindowWidth";

import style from "./AppHeader.module.scss";

function NavMenu({ setIsLoading }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useTranslation("landing");
  const menu = useRef();
  const login = useAppSelector((store) => store.login.login);
  const router = useRouter();
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  const accountPathMobileView =
    pathname.includes("account") && windowWidth > 580;

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleClickOutside = (evt) => {
    if (
      menu.current &&
      !menu.current.contains(evt.target) &&
      !evt.target.classList.contains(style.hamburger)
    ) {
      closeMobileMenu();
    }
  };

  const handleAccountClick = () => {
    login ? router.push("/account") : router.push("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", closeMobileMenu);

    return () => {
      window.removeEventListener("scroll", closeMobileMenu);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    !accountPathMobileView && (
      <>
        <nav
          className={`${style.navbar} ${
            isMobileMenuOpen ? style.navbar_show : ""
          }`}
          ref={menu}
        >
          <ul
            className={`${style["navbar__list"]} ${
              isMobileMenuOpen ? style.navbar__list_show : ""
            }`}
          >
            <li>
              <Link
                href="/"
                className={style.navbar__link}
                onClick={closeMobileMenu}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/vps"
                className={style.navbar__link}
                onClick={closeMobileMenu}
              >
                VPS
              </Link>
            </li>
            <li>
              <Link
                href="/abuse"
                className={style.navbar__link}
                onClick={closeMobileMenu}
              >
                Bulletproof
              </Link>
            </li>
            <li>
              <Link
                href="/vpn"
                className={style.navbar__link}
                onClick={closeMobileMenu}
              >
                VPN
              </Link>
            </li>
            <li>
              <Link
                href="/company"
                className={style.navbar__link}
                onClick={closeMobileMenu}
              >
                {t("company")}
              </Link>
            </li>
            <li>
              <Language
                isMobileMenuOpen={isMobileMenuOpen}
                setIsLoading={setIsLoading}
              />
            </li>
            <li>
              <button
                className={style.header__login}
                onClick={handleAccountClick}
              >
                <span>{t("account")}</span>
              </button>
            </li>
            <p className={style.header__company}>
              © PSB Hosting. <br /> All Rights Reserved
            </p>
          </ul>
        </nav>

        <div
          className={`${style.hamburger} ${
            !isMobileMenuOpen ? style.hamburgerActive : ""
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
          className={`${style.hamburgerClose} ${
            isMobileMenuOpen ? style.hamburgerCloseActive : ""
          }`}
          onClick={closeMobileMenu}
        >
          <iconify-icon
            icon="material-symbols:close"
            width="40"
            heigth="40"
          ></iconify-icon>
        </div>
      </>
    )
  );
}

export default NavMenu;

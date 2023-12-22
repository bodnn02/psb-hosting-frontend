import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "iconify-icon";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import NavMenu from "./NavMenu";

import Language from "../../compontens/Language/Language";
import { useAppSelector } from "../../store/hooks";

import style from "./AppHeader.module.scss";

function AppHeader({ setIsLoading }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useTranslation("landing");
  const menu = useRef();
  const login = useAppSelector((store) => store.login.login);
  const router = useRouter();

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
    <header className={style.header}>
      <div className={style.logo}>
        <Link href="/" className={style.header__logo}>
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>
      <NavMenu setIsLoading={setIsLoading} />
    </header>
  );
}

export default AppHeader;

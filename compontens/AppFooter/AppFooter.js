import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

import useScrollToTop from "../../hooks/useScrollToTop";

import logo from "../../public/logo.png";
import style from "./AppFooter.module.scss";

function appFooter() {
  const { t } = useTranslation("landing");
  const { goToTop } = useScrollToTop();
  const router = useRouter();
  const { pathname } = router;

  const goToHome = () => {
    pathname === "/" ? goToTop() : router.push("/");
  };

  const accountPath = pathname.includes("account");

  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <p className={style.footer__copyright}>
          © PSB Hosting. All Rights Reserved
        </p>
        <div onClick={goToHome} className={style.link_logo}>
          <Image
            src={logo}
            alt="logo PSB"
            width="160"
            height="50"
            className={style.logo}
          />
        </div>
        <nav className={style.footer__wrapper}>
          <ul className={style.navbar}>
            <li>
              <Link href="/" className={style.navbar__link}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="/vps" className={style.navbar__link}>
                VPS/VDS
              </Link>
            </li>
            <li>
              <Link href="/vpn" className={style.navbar__link}>
                VPN
              </Link>
            </li>
            <li>
              <Link href="/abuse" className={style.navbar__link}>
                Bulletproof
              </Link>
            </li>
            <li>
              <Link href="/company" className={style.navbar__link}>
                {t("company")}
              </Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          aria-label="кнопка вверх"
          onClick={goToTop}
          className={style.buttonToTop}
        ></button>
      </div>
      {!accountPath && (
        <ul className={style.docList}>
          <li>
            <Link className={style.doc} href="/policy">
              {t("policy")}
            </Link>
          </li>
          <li>
            <Link className={style.doc} href="/offer">
              {t("offer")}
            </Link>
          </li>
        </ul>
      )}
    </footer>
  );
}

export default appFooter;

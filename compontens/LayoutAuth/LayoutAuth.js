import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useParralaxOnBlock from "../../hooks/useParralaxOnBlock";
import Preloader from "../Preloader/Preloader";
import { useAppDispatch } from "../../store/hooks";
import { checkAuth } from "../../api/checkAuth";
import { setAppLogin } from "../../store/slices/login";

import style from "../../styles/Auth.module.scss";

const LayoutAuth = ({ children }) => {
  const { t, i18n } = useTranslation("auth");
  const { transformBlock, handleMouseEnter, handleMouseLeave, block } =
    useParralaxOnBlock();
  const router = useRouter();
  const { locale, pathname, asPatch, query } = router;
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleRouteChange = () => {
    i18n.changeLanguage(locale);
  };

  const checkName = async (token) => {
    const username = localStorage.getItem("username");

    const name = await checkAuth(token);
    if (pathname === "/logout") {
      if (
        !name ||
        !username ||
        name.username.toLowerCase() !== username.toLowerCase()
      ) {
        router.push("/login");
        dispatch(setAppLogin(false));
      } else {
        setIsLoading(true);
      }
    } else {
      if (name && name.username.toLowerCase() === username.toLowerCase()) {
        router.push("/account");
        dispatch(setAppLogin(true));
      } else if (
        !name ||
        !username ||
        name.username.toLowerCase() !== username.toLowerCase()
      ) {
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    if (pathname !== "/password/new") {
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/password/new") {
      window.localStorage.setItem("MY_LANGUAGE", locale);

      if (locale === "en") {
        router.push({ pathname, query }, asPatch, { locale: "en" });
      } else {
        router.push({ pathname, query }, asPatch, { locale: "ru" });
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (pathname === "/logout") {
      token ? checkName(token) : router.push("/login");
    } else {
      token ? checkName(token) : setIsLoading(true);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="PSB Hosting" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{`${t("login")}`}</title>
        <link rel="shortcut icon" href="/images/logo.svg" />
      </Head>
      {!isLoading && <Preloader />}
      {isLoading && (
        <main className={style["container"]}>
          <div className={style["content"]}>
            <div
              className={style["content__block-logo"]}
              ref={block}
              onMouseMove={transformBlock}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className={style["content__logo"]}
                alt="logo"
                src="/logo.png"
              />
            </div>
            {children}
          </div>
        </main>
      )}
    </>
  );
};

export default LayoutAuth;

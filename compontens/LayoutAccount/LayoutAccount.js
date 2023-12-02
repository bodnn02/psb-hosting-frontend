import { useState, useEffect } from "react";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import useWindowWidth from "../../hooks/useWindowWidth";
import AccountHeader from "../AccountHeader/AccountHeader";
import AccountFooter from "../AccountFooter/AccountFooter";
import AccountSidebar from "../AccountSidebar/AccountSidebar";
import PopupLanguage from "../PopupLanguage/PopupLanguage";
import PopupProfile from "../PopupProfile/PopupProfile";
import Breadcrumbs from "../../compontens/Breadcrumbs/Breadcrumbs";
import ButtonToTop from "../../compontens/ButtonToTop/ButtonToTop";
import ButtonTelegram from "../../compontens/ButtonTelegram/ButtonTelegram";
import Preloader from "../../compontens/Preloader/Preloader";
import { useAppDispatch } from "../../store/hooks";
import { setAppLogin } from "../../store/slices/login";
import ReportList from "../ReportList/ReportList";
import { checkAuth } from "../../api/checkAuth";
import AppFooter from "../AppFooter/AppFooter";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

const LayoutAccount = ({ children }) => {
  const [isOpenPopupLanguage, setIsOpenPopupLanguage] = useState(false);
  const [isOpenPopupProfile, setIsOpenPopupProfile] = useState(false);
  const [xCoordPopupProfile, setXCoordPopupProfile] = useState(0);
  const [isButtonSidebarMiniHidden, setIsButtonSidebarMiniHidden] =
    useState(false);
  const [isSidebarMini, setIsSideBarMini] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isHeaderNamenuVisible, setIsHeaderNamenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const { t, ready, i18n } = useTranslation();
  const { locale, pathname, asPatch, query } = router;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const checkName = async (token) => {
    const username = localStorage.getItem("username");

    const name = await checkAuth(token);

    if (
      !name ||
      !username ||
      name.username.toLowerCase() !== username.toLowerCase()
    ) {
      router.push("/login");
      dispatch(setAppLogin(false));
    } else {
      setIsLoading(true);
      dispatch(setAppLogin(true));
    }
  };

  const handleLoad = () => {
    if (isPageLoading) setIsPageLoading(true);
  };

  useEffect(() => {
    if (ready) {
      // for Chrome
      window.addEventListener("load", handleLoad);

      // for yandex browser
      if (isPageLoading && document.readyState === "complete") {
        handleLoad();
      }

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [ready]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? checkName(token) : router.push("/login");
  }, []);

  const chooseLanquage = () => {
    setIsOpenPopupLanguage(true);
  };

  const closePopupLanguage = () => {
    setIsOpenPopupLanguage(false);
  };

  const openPopupProfile = (right) => {
    setXCoordPopupProfile(right);
    setIsOpenPopupProfile(true);
  };

  const closePopupProfile = () => {
    setIsOpenPopupProfile(false);
  };

  const closeAllPopup = () => {
    closePopupLanguage();
    closePopupProfile();
  };

  const toggleSidebar = () => {
    if (windowWidth > 991) {
      if (isSidebarMini) {
        setIsSideBarMini(false);
        setIsButtonSidebarMiniHidden(false);
      } else {
        setIsSideBarMini(true);
        setIsButtonSidebarMiniHidden(true);
      }
    } else {
      setIsSideBarMini(false);
      setIsButtonSidebarMiniHidden(false);
      isSidebarVisible ? setIsSidebarVisible(false) : setIsSidebarVisible(true);
    }
  };

  const mouseEnterSidebar = () => {
    if (isSidebarMini) setIsSideBarMini(false);
  };

  const mouseLeaveSidebar = () => {
    if (!isSidebarMini && isButtonSidebarMiniHidden) setIsSideBarMini(true);
  };

  const toggleHeaderNavmenu = () => {
    isHeaderNamenuVisible
      ? setIsHeaderNamenuVisible(false)
      : setIsHeaderNamenuVisible(true);
  };

  const handleRouteChange = () => {
    i18n.changeLanguage(locale);
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopup();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MY_LANGUAGE", locale);

    if (locale === "en") {
      router.push({ pathname, query }, asPatch, { locale: "en" });
    } else {
      router.push({ pathname, query }, asPatch, { locale: "ru" });
    }
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
    

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="PSB Hosting" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{`${t("account-page")}`}</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/images/favicon.ico"
        />
      </Head>
      <div className={`${ibmPlexSans.className} ${inter.className} `}>
        {(!isLoading || isPageLoading) && <Preloader />}

        <div
          className={`page-account ${
            !isLoading && isPageLoading ? "hidden" : ""
          }`}
        >
          <AccountHeader
            chooseLanquage={chooseLanquage}
            openPopupProfile={openPopupProfile}
            setXCoordPopupProfile={setXCoordPopupProfile}
            toggleSidebar={toggleSidebar}
            isButtonSidebarMiniHidden={isButtonSidebarMiniHidden}
            isHeaderNamenuVisible={isHeaderNamenuVisible}
            toggleHeaderNavmenu={toggleHeaderNavmenu}
            setIsHeaderNamenuVisible={setIsHeaderNamenuVisible}
          />
          <main
            className={`account-main ${
              isSidebarMini ? "account-main_sidebar-mini" : ""
            }`}
          >
            <ReportList reportListView={"main_report-list"} />
            <section className={"account-main_container"}>
            {windowWidth >= 600 ? (
              <AccountSidebar
                isSidebarMini={isSidebarMini}
                mouseEnterSidebar={mouseEnterSidebar}
                mouseLeaveSidebar={mouseLeaveSidebar}
                isSidebarVisible={isSidebarVisible}
                setIsSidebarVisible={setIsSidebarVisible}
              />) : ( <></> )}
              <div className={"account-main_cards"}>
                <Breadcrumbs />
                {children}
                <div></div>
              </div>
            </section>
          </main>
          {/*<AccountFooter isSidebarMini={isSidebarMini} />*/}
          <PopupLanguage
            isOpen={isOpenPopupLanguage}
            closePopup={closePopupLanguage}
          />
          <PopupProfile
            isOpen={isOpenPopupProfile}
            right={xCoordPopupProfile}
            setIsOpenPopupProfile={setIsOpenPopupProfile}
          />
          <ButtonToTop />
          <ButtonTelegram />
        </div>
      </div>
    </>
  );
};

export default LayoutAccount;

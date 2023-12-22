import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

import LayoutAccount from "../../../../compontens/LayoutAccount/LayoutAccount";
import MessagePopup from "../../../../compontens/MessagePopup/MessagePopup";
import { wrapper } from "../../../../store/store";
import { getCurrentOrder } from "../../../../api/getCurrentOrder";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { fetchCurrentOrder } from "../../../../store/slices/currentOrder";
import { changeOperativeSystem } from "../../../../api/changeOperativeSystem";
import { useFormAndValidation } from "../../../../hooks/useFormAndValidation";
import { changeServerPassword } from "../../../../api/changeServerPassword";
import { startServer } from "../../../../api/startServer";
import { restartServer } from "../../../../api/restartServer";
import { stopServer } from "../../../../api/stopServer";
import { toggleAutoRefresh } from "../../../../api/toggleAutoRefresh";
import { NUMBER_REG_EXP } from "../../../../utils/constants";
import { DropDownList } from "../../../../compontens/DropDownList/DropDownList";
import Preloader from "../../../../compontens/Preloader/Preloader";
import ButtonIcon from "../../../../compontens/ButtonIcon";
import Renewal from "../../../../compontens/Renewal/Renewal";
import { BtnWithLink, BtnWithAction } from "../../../../compontens/Buttons";
import PopupChangeSystem from "../../../../compontens/PopupChangeSystem";
import PopupChangePasswordOS from "../../../../compontens/PopupChangePasswordOS";
import PopupChangeConfig from "../../../../compontens/PopupChangeConfig";
import useToggleAutoRefresh from "../../../../hooks/useToggleAutoRefresh";
import { makeAutoProlong } from "../../../../api/makeAutoProlong";

import { getProducts } from '../../../../api/getProducts';

import Image from "next/image";
import Link from "next/link";

import style from "../../../../styles/Order.module.scss";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params.id;

      return {
        props: {
          id,
        },
      };
    }
);

const Order = (id) => {
  const { t } = useTranslation();
  const currentOrder = useAppSelector(
    (store) => store.currentOrder.currentOrder
  );

  const dispatch = useAppDispatch();
  const { values, errors, isValid, handleChange, setIsValid, resetForm } =
    useFormAndValidation();

  /*const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);*/
  const [errorOnlyNumbers, setErrorOnlyNumbers] = useState("");
  const [activeButtonSystem, setActiveButtonSystem] = useState(true);
  const [activeButtonPassword, setActiveButtonPassword] = useState(true);
  const [activeButtonAutoRefresh, setActiveButtonAutoRefresh] = useState(true);
  const [activeButtonStopServer, setActiveButtonStopServer] = useState(true);
  const [activeButtonStartServer, setActiveButtonStartServer] = useState(true);
  const [activeButtonRestartServer, setActiveButtonRestartServer] =
    useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isChangeSystemPopupOpen, setIsChangeSystemPopupOpen] = useState(false);
  const [isChangePasswordOSPopupOpen, setIsChangePasswordOSPopupOpen] =
    useState(false);
  const [isChangeConfigPopupOpen, setIsChangeConfigPopupOpen] = useState(false);

  const {
    handleToggleAutoRefresh,
    message,
    setMessage,
    isPopupOpen,
    setIsPopupOpen,
    isSuccess,
    setIsSuccess,
  } = useToggleAutoRefresh(currentOrder);

  const [products, setProducts] = useState(null);

  const fetchData = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const res = await getCurrentOrder(token, id.pageProps.id);
      if (res && res[0]) {
        dispatch(fetchCurrentOrder(res[0]));
      }
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentOrder(null));
  }, []);

  useEffect(() => {
    if (!currentOrder) {
      fetchData();
    }
  }, [currentOrder]);


  const fetchProducts = async () => {
    try {
      const productsData = await getProducts(currentOrder.order[0].type.toUpperCase(), '/api/getProducts');
      const fetchedProducts = productsData?.products || [];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching VPS data:', error);
    }
  };

  useEffect(() => {
    if (
        currentOrder?.order &&
        currentOrder.order.length > 0 &&
        currentOrder.order[0].type &&
        (!products || products.length === 0)
    ) {
        fetchProducts();
    }
}, [products, currentOrder]);

const fetchDataBlocked = async () => {
  setMessage(t("error-pending-password"));

  const token = localStorage.getItem("token");
  if (token) {
    const data = await makeAutoProlong(token, currentOrder.order[0].order_id);
    if (data && Number(data.status) === 200) {
      setIsPopupOpen(true);
      setIsSuccess(true);
      setMessage(t("error-autoprolong"));
      fetchUserData(token);
    } else if (data && Number(data.status) !== 200) {
      setIsPopupOpen(true);
      setIsSuccess(false);
      setMessage(t("error-autoprolong-err"));
    } else {
      setIsPopupOpen(true);
      setIsSuccess(false);
      setMessage(t("error"));
    }
  }
};

  const changeSystemFormSubmit = async (dataSystem) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (dataSystem && token) {
      const queries = `order_id=${currentOrder.order_data[0].order_id}&os=${dataSystem}`;
      const res = await changeOperativeSystem(token, queries);
      setActiveButtonSystem(false);

      if (res) {
        setMessage(t("error-system-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        fetchData();
        setActiveButtonSystem(true);
        setIsChangeSystemPopupOpen(false)
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonSystem(true);
      }
    } else {
      setMessage(t("error-system-unsuccess"));
      setIsPopupOpen(true);
      setActiveButtonSystem(true);
    }
  };

  const submitChangePassword = async (evt) => {
    evt.preventDefault();

    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const queries = `order_id=${currentOrder.order_data[0].order_id}&password=${values.password}`;
      const res = await changeServerPassword(token, queries);
      setActiveButtonPassword(false);

      if (res) {
        setMessage(t("error-password-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        fetchData();
        setActiveButtonPassword(true);
        resetForm();
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonPassword(true);
      }
    }
  };

  const changePasswordOSFormSubmit = async (dataPasswordOS) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const queries = `order_id=${currentOrder.order_data[0].order_id}&password=${dataPasswordOS}`;
      const res = await changeServerPassword(token, queries);
      setActiveButtonPassword(false);

      if (res) {
        setMessage(t("error-password-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        fetchData();
        setActiveButtonPassword(true);
        setIsChangePasswordOSPopupOpen(false);
        /*resetForm();*/
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonPassword(true);
      }
    }
  };

  const handleStartServer = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const res = await startServer(token, currentOrder.order_data[0].order_id);
      setActiveButtonStartServer(false);

      if (res) {
        setMessage(t("error-start-server-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        setActiveButtonStartServer(true);
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonStartServer(true);
      }
    }
  };

  const handleRestartServer = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const res = await restartServer(
        token,
        currentOrder.order_data[0].order_id
      );
      setActiveButtonRestartServer(false);

      if (res) {
        setMessage(t("error-restart-server-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        setActiveButtonRestartServer(true);
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonRestartServer(true);
      }
    }
  };

  const handleStopServer = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const res = await stopServer(token, currentOrder.order_data[0].order_id);
      setActiveButtonStopServer(false);

      if (res) {
        setMessage(t("error-stop-server-success"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        setActiveButtonStopServer(true);
      } else {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonStopServer(true);
      }
    }
  };

  useEffect(() => {
    isValid ? setActiveButtonPassword(true) : setActiveButtonPassword(false);
  }, [isValid]);

  const handleChangeSystem = () => {
    setIsChangeSystemPopupOpen(true);
  };

  const handleChangePasswordOS = () => {
    setIsChangePasswordOSPopupOpen(true);
  };

  const handleChangeConfig = () => {
    setIsChangeConfigPopupOpen(true);
  };

  const closeAllPopups = (form) => {
    setIsChangeSystemPopupOpen(false);
    setIsChangePasswordOSPopupOpen(false);
    setIsChangeConfigPopupOpen(false);
  };

  function handleCopyToClipboard(value) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setMessage(t("error-copied-to-clipboard"));
        setIsPopupOpen(true);
        setIsSuccess(true);
        setActiveButtonRestartServer(true);
      })
      .catch(() => {
        setMessage(t("error"));
        setIsPopupOpen(true);
        setActiveButtonRestartServer(true);
      });
  }

  function handleCopyOrderIdToClipboard() {
    const orderId = currentOrder.order[0].order_id;
    handleCopyToClipboard(orderId);
  }

  function handleCopyOrderIdVPNToClipboard() {
    const orderVPNId = currentOrder.order_id;
    handleCopyToClipboard(orderVPNId);
  }

  function handleCopyIPToClipboard() {
    const orderIP = currentOrder.order_data[0].ip;
    handleCopyToClipboard(orderIP);
  }

  function changeConfigFormSubmit() {
    console.log("changeConfigFormSubmit");
  }

  return (
    <>
      {!currentOrder && <Preloader />}
      {currentOrder && (
        <div className={style["order"]}>
          {!currentOrder.qr &&
            currentOrder.order &&
            currentOrder.order_data &&
            currentOrder.system && (
              <>
                <section
                  className={`${style["order__details"]} ${style["card"]}`}
                >
                  <h2 className={style["order__main-title"]}>
                    {currentOrder.order[0]?.title &&
                      `${t("profile-order")} на аренду сервера ${currentOrder.order[0].title
                      }`}
                  </h2>
                  <div className={style["order__details-list"]}>
                    {currentOrder.order[0]?.order_id && (
                      <ul className={style["order__order-item"]}>

                        <li className={style["order__details-item"]}>
                          <div className={style["order__configuration"]}>
                            <div className={style["order__configuration_info"]}>
                              <p className={style["order__text-grey"]}>
                                {t("profile-order-number")}&nbsp;
                              </p>
                              <p className={style["order__text-black"]}>
                                {currentOrder.order[0].order_id}
                              </p>
                            </div>
                            <ButtonIcon
                              icon={"tabler:copy"}
                              handleClick={handleCopyOrderIdToClipboard}
                            />
                          </div>
                        </li>

                      </ul>
                    )}
                    {(
                      currentOrder.order_data[0]?.superuser ||
                      currentOrder.order_data[0]?.password ||
                      currentOrder.order_data[0]?.port
                    ) && (
                        <ul className={style["order__order-item"]}>
                          {currentOrder.order_data[0]?.superuser && (
                            <li className={style["order__details-item"]}>
                              <p className={style["order__text-grey"]}>
                                {t("profile-order-user")}&nbsp;
                              </p>
                              <p className={style["order__text-black"]}>
                                {currentOrder.order_data[0].superuser}
                              </p>
                            </li>
                          )}
                          {currentOrder.order_data[0]?.password &&
                            (!currentOrder.order[0]?.type ||
                              (!currentOrder.order[0]?.type.includes('Hosting'))) && (
                              <li className={style["order__details-item"]}>
                                <p className={style["order__text-grey"]}>
                                  {t("profile-order-password")}&nbsp;
                                </p>

                                <input
                                  className={style["order__text-black"]}
                                  type={showPassword ? "" : "text"}
                                  readOnly
                                  value={
                                    !showPassword
                                      ? currentOrder.order_data[0].password.replace(
                                        /./g,
                                        "*"
                                      )
                                      : currentOrder.order_data[0].password
                                  }
                                />
                                <div className={style["order__button-eye"]}>
                                  <iconify-icon
                                    className={style["order__button-icon"]}
                                    icon={
                                      showPassword
                                        ? "basil:eye-closed-outline"
                                        : "basil:eye-outline"
                                    }
                                    onClick={() => setShowPassword(!showPassword)}
                                  ></iconify-icon>
                                </div>
                                {(!currentOrder.order[0]?.type.includes('Bulletproof') &&
                                <ButtonIcon
                                  icon={"ci:edit-pencil-01"}
                                  handleClick={handleChangePasswordOS}
                                />
                                )}
                              </li>
                            )}
                        </ul>
                      )}
                    {(
                      currentOrder.order[0]?.os ||
                      currentOrder.order_data[0]?.ip ||
                      currentOrder.order_data[0]?.port
                    ) && (
                        <ul className={style["order__order-item"]}>
                          {currentOrder.order[0]?.os && (
                              <li className={style["order__details-item"]}>
                                <div className={style["order__configuration"]}>
                                  <div className={style["order__configuration_info"]}>
                                    <p className={style["order__text-grey"]}>OC:</p>
                                    <p className={style["order__text-black"]}>
                                      &nbsp;{currentOrder.order[0].os}
                                    </p>
                                  </div>
                                  {(
                                    currentOrder.order[0]?.type &&
                                    !currentOrder.order[0]?.type.includes('Bulletproof') &&
                                    !currentOrder.order[0]?.type.includes('Hosting') &&
                                    !(
                                      currentOrder.order[0].status.includes('Обработка') ||
                                      currentOrder.order[0].status.includes('Заблокирован')
                                    )
                                  ) && (
                                    <ButtonIcon
                                      icon={'mingcute:settings-3-line'}
                                      handleClick={handleChangeSystem}
                                    />
                                  )}
                                </div>
                              </li>
                            )}

                          {currentOrder.order_data[0]?.ip && (
                            <li className={style["order__details-item"]}>
                              <div className={style["order__configuration"]}>
                                <div className={style["order__configuration_info"]}>
                                  <p className={style["order__text-grey"]}>IP: </p>
                                  <p className={style["order__text-black"]}>
                                    &nbsp;{currentOrder.order_data[0].ip}
                                  </p>
                                </div>
                                <ButtonIcon
                                  icon={"tabler:copy"}
                                  handleClick={handleCopyIPToClipboard}
                                />
                              </div>
                            </li>
                          )}

                          {currentOrder.order_data[0]?.port && (
                            <li className={style["order__details-item"]}>
                              <p className={style["order__text-grey"]}>
                                {t("profile-order-port")}&nbsp;
                              </p>
                              <p className={style["order__text-black"]}>
                                {currentOrder.order_data[0].port}
                              </p>
                            </li>
                          )}
                        </ul>
                      )}
                  </div>
                  {currentOrder.order[0]?.title &&
                    currentOrder.order[0].title.includes("RDP") && (
                      <p className={style["order__message"]}>
                        {t("profile-order-rdp")}
                      </p>
                    )}
                  {currentOrder.order[0]?.type &&
                    !currentOrder.order[0].type.includes("Bulletproof") &&
                    !currentOrder.order[0].type.includes("Hosting") &&
                    currentOrder.order[0].os.includes("Windows") && (
                      <p className={style["order__message-hint"]}>
                        {t("profile-order-windows")}
                      </p>
                    )}
                </section>

                {/*2 КОНФИГУРАЦИЯ НАЧАЛО*/}
                <section
                  className={`${style["order__options-list"]} ${style["card"]}`}
                >
                  <ul className={style["order__order-item"]}>
                    {(!currentOrder.order[0]?.type ||
                     (!currentOrder.order[0]?.type.includes('Bulletproof') &&
                      !currentOrder.order[0]?.type.includes('Hosting'))) && (
                        <li className={style["order__configuration"]}>
                          <h3 className={style["order__section-titleConf"]}>
                            {t("profile-order-configuration")}
                          </h3>
                          {/* <ButtonIcon
                            icon={"mingcute:settings-3-line"}
                            handleClick={handleChangeConfig}
                            disabled={true}
                          /> */}
                        </li>
                      )}
                    {products && (
                      products
                        .filter((product) => product.id === currentOrder.order[0].product)
                        .map((matchingProduct) =>
                          matchingProduct.characters.map((character, index) => (
                            <li key={index} className={style["order__details-item"]}>
                              <p className={style["order__text-grey"]}>{character.name}: </p>
                              <p className={style["order__text-black"]}>{character.content}</p>
                            </li>
                          ))
                        )
                    )}
                    <li className={style["order__details-item"]}>
                      <p className={style["order__text-grey"]}>
                        {t("profile-order-price")}&nbsp;
                      </p>
                      <p className={style["order__text-black"]}>
                        {currentOrder.order[0].price &&
                          `$${currentOrder.order[0].price}/${t(
                            "order-price-period"
                          )}`}
                      </p>
                    </li>
                  </ul>
                  <Renewal date_end={currentOrder.order[0].date_end}>
                    <input
                      onChange={handleToggleAutoRefresh}
                      checked={currentOrder.order[0].auto_refresh}
                      disabled={
                        currentOrder.order[0].status ===
                          "Заблокирован за неуплату"
                          ? true
                          : false
                      }
                      type="checkbox"
                      className={style["order__checkbox"]}
                    />
                  </Renewal>
                </section>
                {/*2 КОНФИГУРАЦИЯ КОНЕЦ*/}
              </>
            )}
          {/*3 КНОПКИ НАЧАЛО*/}
          {currentOrder.order && currentOrder.order[0].type && (
              <section className={`${style["order__settings"]} ${style["card"]}`}>
                <div>
                  <li className={style["order__details-item"]}>
                    <p className={style["order__text-grey"]}>
                      {t("profile-order-server")}&nbsp;
                    </p>
                    <p className={
                      currentOrder.order[0].status.includes("Включен") ||
                      currentOrder.order[0].status.includes("выдан")
                        ? style["order__text-green"] :
                        currentOrder.order[0].status.includes("Обработка") ?
                        style["order__text-yellow"] :
                          currentOrder.order[0].status.includes("Выключен") ||
                          currentOrder.order[0].status.includes("Заблокирован")
                        ? style["order__text-red"]
                        : ""
                    }>
                      {currentOrder.order[0].status.includes("Включен") ||
                      currentOrder.order[0].status.includes("выдан")
                        ? t("profile-order-on") :
                        currentOrder.order[0].status.includes("Обработка") ?
                        t("order-status-awaiting-issue")
                        : currentOrder.order[0].status.includes("Выключен")
                        ? t("profile-order-off")
                        : currentOrder.order[0].status.includes("Заблокирован") ||
                        currentOrder.order[0].status.includes("Обработка")
                        ? t("profile-order-blocked")
                        : ""}
                    </p>
                  </li>
                  <div className={style["order__details-buttons"]}>
                    {currentOrder.order[0].type && (
                        <div>
                          {currentOrder.order[0].status.includes("выдан") &&
                          !currentOrder.order[0].type.includes("Bulletproof") &&
                          !currentOrder.order[0].type.includes("Hosting") && (
                            <div>
                              <BtnWithAction
                                title={t("profile-order-option-two")}
                                onClick={handleStartServer}
                                disabled={!activeButtonStartServer}
                                icon="ci:play"
                              />
                              <BtnWithAction
                                title={t("profile-order-option-four")}
                                onClick={handleStopServer}
                                disabled={!activeButtonStopServer}
                                icon="ci:pause"
                              />
                              <BtnWithAction
                                title={t("profile-order-option-three")}
                                onClick={handleRestartServer}
                                disabled={!activeButtonRestartServer}
                                icon="ci:redo"
                              />
                            </div>
                          )}
                          {(currentOrder.order[0].status.includes('Заблокирован') ||
                           currentOrder.order[0].status.includes("Обработка")) && (
                            <div>
                            {!currentOrder.order[0].type.includes("Bulletproof") &&
                             !currentOrder.order[0].type.includes("Hosting") && (
                              <div>
                                <BtnWithAction
                                  title={t("profile-order-option-two")}
                                  onClick={handleStartServer}
                                  disabled={true}
                                  icon="ci:play"
                                />
                                <BtnWithAction
                                  title={t("profile-order-option-three")}
                                  onClick={handleRestartServer}
                                  disabled={true}
                                  icon="ci:redo"
                                />
                              </div>
                            )}
                              {(!currentOrder.order[0].status.includes("Обработка")) && (
                              <BtnWithAction
                                  title={t("order-pay")}
                                  onClick={fetchDataBlocked}
                                  icon={"ion:card-outline"}
                                  iconColor="#1EB949"
                                  colorBtn={"options-link-green"}
                                />
                                )}
                            </div>
                          )}
                          <BtnWithLink
                            href="https://t.me/psbhosting"
                            title={t("profile-order-support")}
                            icon={"ph:paper-plane-tilt-bold"}
                            colorBtn={"options-link-blue"}
                            iconColor={null}
                          />
                        </div>
                      )}
                    {/* ... (similar blocks for other buttons) */}
                  </div>
                </div>
              </section>
            )}
          {/*3 КНОПКИ КОНЕЦ*/}

          {/*3 КНОПКИ VPN НАЧАЛО*/}
          {currentOrder && currentOrder.qr && (
            <>
              <section
                className={`${style["order__details"]} ${style["card"]}`}
              >
                <div className={style["order__details-list"]}>
                  <ul className={style["order__order-item"]}>
                    {currentOrder.order_id && (
                      <li className={style["order__details-item"]}>
                        <div className={style["order__configuration"]}>
                          <div className={style["order__text"]}>
                            <p className={style["order__text-grey"]}>
                              {t("profile-order-number")}&nbsp;
                            </p>
                            <p className={style["order__text-black"]}>
                              {currentOrder.order_id}
                            </p>
                          </div>
                          <ButtonIcon
                            icon={"tabler:copy"}
                            handleClick={handleCopyOrderIdVPNToClipboard}
                          />
                        </div>
                      </li>
                    )}
                  </ul>
                  <ul className={style["order__order-item"]}>
                    <li className={style["order__details-item"]}>
                      <p className={style["order__text-grey"]}>
                        {t("profile-order-price")}&nbsp;
                      </p>
                      <p className={style["order__text-black"]}>
                        {currentOrder.price &&
                          `$${currentOrder.price}/${t("order-price-period")}`}
                      </p>
                    </li>
                  </ul>
                  <Renewal date_end={currentOrder.date_end}>
                    <input
                      onChange={handleToggleAutoRefresh}
                      checked={currentOrder.auto_refresh}
                      disabled={
                        currentOrder.status === "Заблокирован за неуплату"
                          ? true
                          : false
                      }
                      type="checkbox"
                      className={style["order__checkbox"]}
                    />
                  </Renewal>
                </div>
              </section>
              <div className={style.orderVpn}>
                <Image
                  className={style.qr}
                  src={currentOrder.qr}
                  alt="order vpn"
                  width={308}
                  height={308}
                />
              </div>
              <section
                className={`${style["order__options-interface"]} ${style["card"]}`}
              >
                <BtnWithLink
                  href={currentOrder.url}
                  title={t("order-config")}
                  icon={"material-symbols:download"}
                  colorBtn={"options-link-blue"}
                  iconColor={null}
                />
                <BtnWithLink
                  href="https://t.me/psbhosting"
                  title={t("profile-order-support")}
                  icon={"ph:paper-plane-tilt-bold"}
                  colorBtn={"options-link-blue"}
                  iconColor={null}
                />
              </section>
            </>
          )}
          {/*3 КНОПКИ VPN КОНЕЦ*/}

          <MessagePopup
            message={message}
            isOpen={isPopupOpen}
            setIsOpen={setIsPopupOpen}
            isSuccess={isSuccess}
            setIsSuccess={setIsSuccess}
          />
          {currentOrder && currentOrder.order && currentOrder.order[0]?.type && currentOrder.order[0]?.type !== 'VPN' && (
              <PopupChangeSystem
                  isOpen={isChangeSystemPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateSystem={changeSystemFormSubmit}
                  buttonText={t("popup-button-choose-system")}
                  disabled={/*serverOff ? true :*/ false}
              />
          )}
          <PopupChangePasswordOS
            isOpen={isChangePasswordOSPopupOpen}
            onClose={closeAllPopups}
            onUpdatePassword={changePasswordOSFormSubmit}
            buttonText={"Сменить пароль"}
          />
          {products && (
            <PopupChangeConfig
              isOpen={isChangeConfigPopupOpen}
              handleClosePopup={closeAllPopups}
              onUpdatePassword={changeConfigFormSubmit}
              buttonText={t("popup-button-choose")}
              products={products}
            />
          )}
        </div >
      )}
    </>
  );
};

Order.getLayout = function getLayout(page) {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export default connect((state) => state)(Order);

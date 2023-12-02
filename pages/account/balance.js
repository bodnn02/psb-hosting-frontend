import { useEffect, useState } from "react";
import "iconify-icon";
import { useTranslation } from "next-i18next";
import { connect } from "react-redux";
import Image from "next/image";

import LayoutAccount from "../../compontens/LayoutAccount/LayoutAccount";
import RowTableHistory from "../../compontens/RowTableHistory/RowTableHistory";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import useWindowWidth from "../../hooks/useWindowWidth";
import { topUpBalance } from "../../api/topUpBalance";
import MessagePopup from "../../compontens/MessagePopup/MessagePopup";
import { formatDateRu } from "../../utils/formatDateRu";
import { formatDateEn } from "../../utils/formatDateEn";
import { getPaymentHistory } from "../../api/getPaymentHistory";
import { fetchPaymentHistory } from "../../store/slices/paymentHystory";
import { sortPaymentsWithDate } from "../../utils/sortPaymentsWithDate";
import { getTransactionsList } from "../../api/getTransactionsList";
import { topUpBalanceByCard } from "../../api/topUpBalanceByCard";
import { topUpBalanceByMus } from "../../api/topUpBalanceByMus";

import style from "../../styles/Balance.module.scss";
import stylePayment from "../../compontens/NewService/NewServise.module.scss";

const Balance = () => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const user = useAppSelector((store) => store.user.user);
  const { errors, values, handleChange, isValid, setIsValid } =
    useFormAndValidation();
  const paymentHistory = useAppSelector(
    (store) => store.paymentHistory.paymentHistory
  );
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [sortDate, setSortDate] = useState([]);
  const [isDataSortUp, setIsDataSortUp] = useState(false);
  const [payment, setPayment] = useState("");
  const [arrDate, setArrDate] = useState([]);

  const handleChoosePayment = (evt) => {
    setPayment(evt.target.value);
  };

  const handleTopUpBalance = async (evt) => {
    evt.preventDefault();

    setIsActiveButton(false);
    setMessage(t("error-pending-balance"));
    setIsSuccess(true);
    setIsPopupOpen(true);

    const token = typeof window !== undefined && localStorage.getItem("token");
    const queries = `user_id=${user.id}&amount=${values.amount}`;
    let res;
    if (payment === "2") {
      res = await topUpBalance(token, queries);
    } else if (payment === "3") {
      res = await topUpBalanceByCard(token, queries);
    } else if (payment === "4") {
      res = await topUpBalanceByMus(token, queries);
    }

    if (res && res.pay_url) {
      window.location.replace(res.pay_url);
      setIsActiveButton(true);
    } else {
      setMessage(t("error"));
      setIsSuccess(false);
      setIsPopupOpen(true);
      setIsActiveButton(true);
    }
  };

  const fetchData = async (token) => {
    const data = await getPaymentHistory(token);
    const transactions = await getTransactionsList(token);

    if (data || transactions) {
      let arr = [];
      if (data && !transactions) {
        arr = sortPaymentsWithDate(data);
      } else if (!data && transactions) {
        arr = sortPaymentsWithDate(transactions);
      } else if (data && transactions) {
        arr = sortPaymentsWithDate(data.concat(transactions));
      }

      dispatch(fetchPaymentHistory(arr));
    }
  };

  const handleDateSort = () => {
    const arr = JSON.parse(JSON.stringify(sortDate));
    setSortDate(arr.reverse());
    isDataSortUp ? setIsDataSortUp(false) : setIsDataSortUp(true);
  };

  useEffect(() => {
    setPayment("2");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !paymentHistory) fetchData(token);
  }, []);

  useEffect(() => {
    setIsValid(false);
  }, []);

  useEffect(() => {
    isValid ? setIsActiveButton(true) : setIsActiveButton(false);
  }, [isValid]);

  useEffect(() => {
    setSortDate(paymentHistory);
  }, [paymentHistory]);

  useEffect(() => {
    if (paymentHistory !== null) {
      setArrDate([...new Set(paymentHistory.map((card) => card.date))]);
    }
  }, [paymentHistory]);


  return (
    <>
      <section className="section-account">
        <h3 className="section-account-title">{t("balance-page")}</h3>
        <div className={style["section__body"]}>
          <div className={style.payment}>
            <label
              htmlFor="card_b"
              className={stylePayment["card__form-label-radio"]}
            >
              <input
                type="radio"
                className={stylePayment["card__form-input-radio"]}
                name="payment"
                id="card_b"
                value="4"
                onChange={handleChoosePayment}
                checked={payment === "4" && true}
              />
              <span className={stylePayment["card__form-span"]}>
                <iconify-icon
                  className={stylePayment["card__form-span-icon"]}
                  icon="material-symbols:cloud-outline"
                  color="#1EB949"
                  width="24"
                  height="24"
                ></iconify-icon>
                {t("new-service-card-b")}
              </span>
            </label>
            <label
              htmlFor="card_l"
              className={stylePayment["card__form-label-radio"]}
            >
              <input
                type="radio"
                className={stylePayment["card__form-input-radio"]}
                name="payment"
                id="card_l"
                value="3"
                onChange={handleChoosePayment}
                checked={payment === "3" && true}
              />
              <span className={stylePayment["card__form-span"]}>
                <iconify-icon
                  className={stylePayment["card__form-span-icon"]}
                  icon="ion:card-outline"
                  color="#1EB949"
                  width="24"
                  height="24"
                ></iconify-icon>
                {t("new-service-card-l")}
              </span>
            </label>
          </div>
          <form
            className={style["section__form"]}
            onSubmit={handleTopUpBalance}
            noValidate
          >
            <input
              type="text"
              name="amount"
              placeholder={t("balance-sum")}
              value={values.amount || ""}
              onChange={handleChange}
              required
              pattern="^\d+$"
            />
            <button
              type="submit"
              className={style["section__button-submit"]}
              disabled={!isActiveButton}
            >
              {t("balance-button")}
            </button>
            <p
              className={`${style.error} ${
                !isValid ? style["error_active"] : ""
              }`}
            >
              {!isValid && errors.amount}
            </p>
          </form>
        </div>
      </section>
      <section className="section-account">
        <h3 className="section-account-title">{t("payment-history")}</h3>
        <div className={style["section__table-wrap"]}>
          <div className={style["section__table-responsive"]}>
            {windowWidth < 900 ? (
              <div className={style["section__table-resultMobile"]}>
                {arrDate.map((date, index) => (
                  <div key={index}>
                    <h2 className={style["section__table-resultMobile_date"]}>
                      {t("faq-lang") === "ru"
                        ? formatDateRu(date)
                        : formatDateEn(date)}
                    </h2>
                    {sortDate
                      .filter((card) => card.date === date)
                      .map((el, ind) => {
                        return (
                          <RowTableHistory
                            id={el.id}
                            type={el.type}
                            date={null}
                            sum={el.amount}
                            status={
                              el.status === "Успешно"
                                ? t("payment-status-success")
                                : el.status === "Оплачено"
                                ? t("payment-status-paid")
                                : el.status === "Не оплачено" &&
                                  t("payment-status-not-paid")
                            }
                            key={ind}
                          />
                        );
                      })}
                  </div>
                ))}
              </div>
            ) : (
              <table className={style["section__table-result"]}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t("payment-type")}</th>
                    <th className={style.dateColumn}>
                      <span>{t("payment-date")}</span>
                      <button
                        type="button"
                        className={`${style.buttonSort} ${
                          isDataSortUp ? style.buttonSortActive : ""
                        }`}
                        onClick={handleDateSort}
                      >
                        <Image
                          src="/caret_down.svg"
                          alt="кнопка сортировать по дате"
                          width={20}
                          height={20}
                          className={style.imgCaret}
                        />
                      </button>
                    </th>
                    <th>{t("payment-sum")}</th>
                    <th>{t("payment-status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortDate &&
                    sortDate.length > 0 &&
                    sortDate.map((el, ind) => {
                      return (
                        <RowTableHistory
                          id={el.id}
                          type={el.type}
                          date={
                            t("faq-lang") === "ru"
                              ? formatDateRu(el.date)
                              : formatDateEn(el.date)
                          }
                          sum={el.amount}
                          status={
                            el.status === "Успешно"
                              ? t("payment-status-success")
                              : el.status === "Оплачено"
                              ? t("payment-status-paid")
                              : el.status === "Не оплачено" &&
                                t("payment-status-not-paid")
                          }
                          key={ind}
                        />
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
      <MessagePopup
        message={message}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </>
  );
};

Balance.getLayout = function getLayout(page) {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export default connect((state) => state)(Balance);

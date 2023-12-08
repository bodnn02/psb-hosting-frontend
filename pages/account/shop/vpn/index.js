import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import 'iconify-icon';

import LayoutAccount from '../../../../compontens/LayoutAccount/LayoutAccount';
import Preloader from '../../../../compontens/Preloader/Preloader';
import CountryList from '../../../../compontens/CountryList/CountryList';
import ConfigTable from '../../../../compontens/ConfigTable/ConfigTable';
import TypesList from '../../../../compontens/TypesList/TypesList';
import MessagePopup from "../../../../compontens/MessagePopup/MessagePopup";

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchVpn } from '../../../../store/slices/vpn';
import { getProducts } from '../../../../api/getProducts';
import { createNewOrder } from '../../../../api/createNewOrder';
import { checkBalance } from '../../../../utils/checkBalance';
import { VPN_PERIOD_EN, VPN_PERIOD_RU } from '../../../../utils/constants';

import style from '../../../../styles/AccountShop.module.scss';

AccountVps.getLayout = function getLayout(page) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  );
}

export default function AccountVps() {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();
  const vpn = useAppSelector(store => store.vpn.vpn);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useAppSelector(store => store.user.user);

  const fetchData = async () => {
    const data = await getProducts('VPN', '/api/getProducts');
    const vpn = data && data.products ? data.products : [];
    dispatch(fetchVpn(vpn));
  }
  useEffect(() => {
    if (!vpn) fetchData();
  }, []);

  useEffect(() => {
    if (vpn) {
      setIsLoading(false);
      setCountries(Array.from(new Set(vpn.map(product => product.country.replace('-', ' ')))));
    } else {
      setIsLoading(true);
    }
  }, [vpn]);


  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [countries, setCountries] = useState([]);
  const availableDurationTypes = [
    [
      { id: 1, name: t('new-service-subscribe'), value: t('new-service-price'), duration: 1 },
      {
        id: 2,
        name: t('new-service-subscribe-price'),
        value: vpn && vpn.length > 0 ? `${vpn.filter((product) => product.country === selectedCountry)[0]?.price} $` : '',
        duration: t('faq-lang') === 'ru' ? VPN_PERIOD_RU[0].option : VPN_PERIOD_EN[0].option,
      },
    ],
    [
      { id: 1, name: t('new-service-subscribe'), value: t('new-service-price-three'), duration: 3 },
      {
        id: 2,
        name: t('new-service-subscribe-price'),
        value: vpn && vpn.length > 0
          ? `${vpn.filter((product) => product.country === selectedCountry)[0]?.price * 3 + (7 * 3 * 0.05)} $`
          : '',
        duration: t('faq-lang') === 'ru' ? VPN_PERIOD_RU[1].option : VPN_PERIOD_EN[1].option,
      },
    ],
    [
      { id: 1, name: t('new-service-subscribe'), value: t('new-service-price-six'), duration: 6 },
      {
        id: 2,
        name: t('new-service-subscribe-price'),
        value: vpn && vpn.length > 0
          ? `${vpn.filter((product) => product.country === selectedCountry)[0]?.price * 6 + (7 * 6 * 0.1)} $`
          : '',
        duration: t('faq-lang') === 'ru' ? VPN_PERIOD_RU[2].option : VPN_PERIOD_EN[2].option,
      },
    ],
    [
      { id: 1, name: t('new-service-subscribe'), value: t('new-service-price-twelve'), duration: 12 },
      {
        id: 2,
        name: t('new-service-subscribe-price'),
        value: vpn && vpn.length > 0
          ? `${vpn.filter((product) => product.country === selectedCountry)[0]?.price * 12 + (7 * 12 * 0.15)} $`
          : '',
        duration: t('faq-lang') === 'ru' ? VPN_PERIOD_RU[3].option : VPN_PERIOD_EN[3].option,
      },
    ],
  ];

  const availablePaymentTypes = [
    { id: 1, name: t('new-service-balance'), icon: '/Suitcase.svg', },
    { id: 4, name: t('new-service-card-b'), icon: '/Cloud.svg' },
    { id: 3, name: t('new-service-card-l'), icon: '/ion_card-outline.svg' },
  ]

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
  };

  const handlePaymentSelect = ({ type }) => {
    setSelectedPayment(type);
  };


  const redirectToHomePage = () => {
    setTimeout(() => {
      router.push('/account');
    }, 4000);
  }

  const sentDataToOrder = async (payment) => {
    if (!selectedCountry || !selectedConfig || !selectedPayment) {
      setMessage(t('new-service-config'));
      setIsSuccess(false);
      setIsPopupOpen(true);

      return;
    }
    else {
      var selectedProduct = vpn.filter((product) => product.country === selectedCountry)[0]
      const token = typeof window !== 'undefined' && localStorage.getItem('token');
      const queries = `product_id=${selectedProduct.id}&payment_type=${selectedPayment.id}&period=${selectedConfig[0].duration}`;

      setMessage(t('error-pending'));
      setIsSuccess(true);
      setIsPopupOpen(true);

      if (Number(payment) === 1) {
        const message = checkBalance(user.balance, selectedConfig.price, t('faq-lang'));
        if (message) {
          setMessage(message);
          setIsSuccess(false);
          setIsPopupOpen(true);
        } else {
          const res = await createNewOrder(token, queries);

          if (res && res.status === 200) {
            const data = await getOrders(token);
            if (data) dispatch(fetchOrders(data));
            setMessage(t('error-order-success'));
            setIsPopupOpen(true);
            redirectToHomePage();
          } else if (res && res.status === 422) {
            setMessage(t('error-balance'));
            setIsSuccess(false);
            setIsPopupOpen(true);
          } else {
            setMessage(t('error'));
            setIsSuccess(false);
            setIsPopupOpen(true);
          }
        }
      } else if (Number(payment) === 2 || Number(payment) === 3 || Number(payment) === 4) {
        const res = await createNewOrder(token, queries);

        if (res && res.data && res.pay_url) {
          setMessage(t('error-order'));
          setIsPopupOpen(true);

          window.location.replace(res.pay_url);
          const data = await getOrders(token);
          if (data) dispatch(fetchOrders(data));
        } else {
          setMessage(t('error'));
          setIsPopupOpen(true);
          setIsSuccess(false);
        }
      }
    }
  }

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading &&
        <div className={style['order']}>
          <div className={style['order-form']}>
            <section className={style['order-section']}>
              <div className={style['order-section__header']}>
                <h2 className={style['order-section__h2']}>1. {t('new-service-country')}</h2>
              </div>
              <div className={style['order-section__content']}>
                <CountryList onSelect={handleCountrySelect} selectedCountry={selectedCountry} countries={countries}></CountryList>
              </div>
            </section>
            {selectedCountry &&
              <section className={style['order-section']}>
                <div className={style['order-section__header']}>
                  <h2 className={style['order-section__h2']}>2. {t('new-service-config')}</h2>
                </div>
                <div className={style['order-section__content']}>
                  <ConfigTable onSelect={handleConfigSelect} selectedConfig={selectedConfig} configs={availableDurationTypes} />
                </div>
              </section>
            }
            <section className={style['order-section']}>
              <div className={style['order-section__header']}>
                <h2 className={style['order-section__h2']}>3. {t('new-service-payment')}</h2>

              </div>
              <div className={style['order-section__content']}>
                <TypesList types={availablePaymentTypes} selectedType={selectedPayment} onSelect={handlePaymentSelect} />
              </div>
            </section>
          </div>
          <div className={style['order-summary']}>
            <div className={style['order-summary__content']}>
              {/* Отображение выбранных параметров */}
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-country')}</h3>
                <p className={style['order-summary__p']}>{selectedCountry ? selectedCountry : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-subscribe')}</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[0].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-config')}</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[1].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-payment')}</h3>
                <p className={style['order-summary__p']}>{selectedPayment ? selectedPayment.name : ""}</p>
              </div>
            </div>
            <div className={style['order-summary__header']}>
              <h2 className={style['order-summary__h2']}>{t('new-service-summary')} </h2>
              <p className={style['order-summary__p']}>
                <b>
                  {selectedConfig ? (
                    (parseFloat(selectedConfig[1].value)).toFixed(2) + " $"
                  ) : ""}
                </b>
              </p>
            </div>
            <div className={`${style['order-summary__button']}`} onClick={() => sentDataToOrder(selectedPayment?.id)}>{t('new-service-button')}</div>
          </div>
        </div>
      }
      <MessagePopup
        message={message}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </>
  );
}

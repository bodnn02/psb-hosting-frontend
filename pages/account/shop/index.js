import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import 'iconify-icon';

import LayoutAccount from '../../../compontens/LayoutAccount/LayoutAccount';
import Preloader from '../../../compontens/Preloader/Preloader';
import CountryList from '../../../compontens/CountryList/CountryList';
import ConfigTable from '../../../compontens/ConfigTable/ConfigTable';
import SystemList from '../../../compontens/SystemList/SystemList';
import TypesList from '../../../compontens/TypesList/TypesList';
import MessagePopup from "../../../compontens/MessagePopup/MessagePopup";

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchVdsVps } from '../../../store/slices/vdsVps';
import { getProducts } from '../../../api/getProducts';
import { createNewOrder } from '../../../api/createNewOrder';
import { sortVps } from '../../../utils/sortVps';
import { sortByCountries } from '../../../utils/sortByCountries';
import { checkBalance } from '../../../utils/checkBalance';
import style from '../../../styles/AccountShop.module.scss';

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
  const vdsVps = useAppSelector(store => store.vdsVps.vdsVps);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useAppSelector(store => store.user.user);

  const fetchData = async () => {
    try {
      const vpsData = await getProducts('VPS', '/api/getProducts');
      const vps = vpsData?.products || [];
      const sortArr = sortVps(vps);
      const arr = sortArr.sort(sortByCountries);

      dispatch(fetchVdsVps(arr));
    } catch (error) {
      console.error('Error fetching VPS data:', error);
    }
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedControlPanel, setSelectedControlPanel] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [countries, setCountries] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [systems, setSystems] = useState([]);
  const availablePaymentTypes = [
    { id: 1, name: t('new-service-balance'), icon: '/Suitcase.svg', },
    { id: 2, name: t('new-service-card-b'), icon: '/Cloud.svg' },
    { id: 3, name: t('new-service-card-l'), icon: '/ion_card-outline.svg' },
  ]
  const [controlPanels, setControlPanels] = useState([]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    var filteredProducts = vdsVps.filter((product) => product.country === country);
    var filteredConfigs = filteredProducts.map((product) => {
      const configOrder = ['vCPU', 'RAM', 'SSD'];

      const sortedCharacters = configOrder.map((paramName) => {
        // Check if product.characters is defined and not null
        const character = product.characters && product.characters.find((char) => char && char.name === paramName);

        return {
          id: character ? character.id : null,
          name: character ? character.name : null,
          value: character ? character.content : null,
        };
      });

      // Проверяем, есть ли хотя бы один параметр в продукте
      const hasParameters = sortedCharacters.some((param) => param.value !== null);

      // Добавляем объект "Price" только если есть хотя бы один параметр
      if (hasParameters) {
        const totalPrice = product.price + t('new-service-subscribe-price');
        sortedCharacters.push({
          name: 'Price',
          value: totalPrice,
        });
      }
      sortedCharacters.push({
        product_id: product.id,
      });
      return sortedCharacters;
    });
    setSelectedConfig(null);
    setSelectedSystem(null);
    setConfigs(filteredConfigs);
  };

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
    var filteredProduct = vdsVps.filter((product) => product.id === config[4].product_id)[0];

    var productControlPanels = filteredProduct.control_panel

    setSelectedSystem(null);
    setSystems(filteredProduct.os);
    setControlPanels(productControlPanels);
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
  };

  const handleVersionSelect = (version, systemId) => {
    setSelectedVersion((prev) => ({ ...prev, [systemId]: version }));
  };

  const handleControlPanelSelect = ({ type }) => {
    setSelectedControlPanel(type);
  };

  const handlePaymentSelect = ({ type }) => {
    setSelectedPayment(type);
  };

  useEffect(() => {
    if (!vdsVps || vdsVps.length === 0) {
      fetchData();
    }
  }, [vdsVps]);

  useEffect(() => {
    if (vdsVps) {
      setIsLoading(false);
      setCountries(Array.from(new Set(vdsVps.map(product => product.country.replace('-', ' ')))));
    } else {
      setIsLoading(true);
    }
  }, [vdsVps, selectedCountry]);

  const redirectToHomePage = () => {
    setTimeout(() => {
      router.push('/account');
    }, 4000);
  }

  const sentDataToOrder = async (payment) => {
    if (!selectedCountry || !selectedConfig || !selectedSystem || !selectedVersion || !selectedControlPanel || !selectedPayment) {
      setMessage(t('new-service-config'));
      setIsSuccess(false);
      setIsPopupOpen(true);

      return;
    }
    else {
      const token = typeof window !== 'undefined' && localStorage.getItem('token');
      const queries = `product_id=${selectedConfig[4].product_id}&payment_type=${selectedPayment.id}&os=${selectedSystem.versions.find(item => item.version === selectedVersion[selectedSystem.id]).content}&control_panel=${selectedControlPanel.id}`;

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
            {selectedCountry !== null && (
              <section className={style['order-section']}>
                <div className={style['order-section__header']}>
                  <h2 className={style['order-section__h2']}>2. {t('new-service-config')}</h2>
                  {selectedCountry == 'Netherlands BEST PRICE' && (<div className={style['order-section__hint']}>{t('new-service-hint-1')}</div>)}
                  {selectedCountry !== 'Netherlands BEST PRICE' && (<div className={style['order-section__hint']}>{t('new-service-hint-2')}</div>)}
                </div>
                <div className={style['order-section__content']}>
                  <ConfigTable onSelect={handleConfigSelect} selectedConfig={selectedConfig} configs={configs} />
                </div>
              </section>
            )}
            {selectedConfig !== null && (
              <section className={style['order-section']}>
                <div className={style['order-section__header']}>
                  <h2 className={style['order-section__h2']}>3. {t('new-service-system')}</h2>
                </div>
                <div className={style['order-section__content']}>
                  <SystemList onSelect={handleSystemSelect} onSelectVersion={handleVersionSelect} selectedVersion={selectedVersion} selectedSystem={selectedSystem} systems={systems} />
                </div>
              </section>
            )}
            {selectedConfig !== null && (
              <section className={style['order-section']}>
                <div className={style['order-section__header']}>
                  <h2 className={style['order-section__h2']}>3. {t('new-service-panel')}</h2>
                </div>
                <div className={style['order-section__content']}>
                <TypesList types={controlPanels} selectedType={selectedControlPanel} onSelect={handleControlPanelSelect} />
                </div>
              </section>
            )}
            <section className={style['order-section']}>
              <div className={style['order-section__header']}>
                <h2 className={style['order-section__h2']}>4. {t('new-service-payment')}</h2>

              </div>
              <div className={style['order-section__content']}>
                <TypesList types={availablePaymentTypes} selectedType={selectedPayment} onSelect={handlePaymentSelect} />
              </div>
            </section>
          </div>
          <div className={style['order-summary']}>
            <div className={style['order-summary__header']}>
              <h2 className={style['order-summary__h2']}>{t('new-service-summary')}</h2>
            </div>
            <div className={style['order-summary__content']}>
              {/* Отображение выбранных параметров */}
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-country')}</h3>
                <p className={style['order-summary__p']}>{selectedCountry ? selectedCountry : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-system')}</h3>
                <p className={style['order-summary__p']}>{selectedSystem ? selectedSystem.name : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-system-version')}</h3>
                <p className={style['order-summary__p']}>{selectedVersion && selectedSystem ? selectedVersion[selectedSystem.id] : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>CPU</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[0].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>RAM</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[1].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>NVMe</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[2].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-config')}</h3>
                <p className={style['order-summary__p']}>{selectedConfig ? selectedConfig[3].value : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-panel')}</h3>
                <p className={style['order-summary__p']}>{selectedControlPanel ? selectedControlPanel.name : ""}</p>
              </div>
              <div className={style['order-summary__item']}>
                <h3 className={style['order-summary__h3']}>{t('new-service-payment')}</h3>
                <p className={style['order-summary__p']}>{selectedPayment ? selectedPayment.name : ""}</p>
              </div>
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

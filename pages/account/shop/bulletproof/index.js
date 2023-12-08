import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import 'iconify-icon';

import LayoutAccount from '../../../../compontens/LayoutAccount/LayoutAccount';
import Preloader from '../../../../compontens/Preloader/Preloader';
import ConfigTable from '../../../../compontens/ConfigTable/ConfigTable';
import SystemList from '../../../../compontens/SystemList/SystemList';
import TypesList from '../../../../compontens/TypesList/TypesList';
import MessagePopup from "../../../../compontens/MessagePopup/MessagePopup";

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchVdsVpsBulletproof } from '../../../../store/slices/vdsVpsBulletproof';
import { getProducts } from '../../../../api/getProducts';
import { createNewOrder } from '../../../../api/createNewOrder';
import { sortVps } from '../../../../utils/sortVps';
import { checkBalance } from '../../../../utils/checkBalance';

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
  const vdsVpsBulletproof = useAppSelector(store => store.vdsVpsBulletproof.vdsVpsBulletproof);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useAppSelector(store => store.user.user);

  const fetchData = async () => {
    const vpsData = await getProducts('Bulletproof VDS', '/api/getProducts');
    const vps = vpsData && vpsData.products ? vpsData.products : [];
    const vdsData = await getProducts('Bulletproof VPS', '/api/getProducts');
    const vds = vdsData && vdsData.products ? vdsData.products : [];

    dispatch(fetchVdsVpsBulletproof(sortVps(vds.concat(vps))));
  }

  useEffect(() => {
    if (!vdsVpsBulletproof) fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(!vdsVpsBulletproof);
  }, [vdsVpsBulletproof]);

  const [selectedServerType, setSelectedServerType] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const serverTypes = [
    { id: 1, name: 'Bulletproof VPS' },
    { id: 2, name: 'Bulletproof VDS' },
  ]
  const [configs, setConfigs] = useState([]);
  const [systems, setSystems] = useState([]);
  const availablePaymentTypes = [
    { id: 1, name: t('new-service-balance'), icon: '/Suitcase.svg', },
    { id: 4, name: t('new-service-card-b'), icon: '/Cloud.svg' },
    { id: 3, name: t('new-service-card-l'), icon: '/ion_card-outline.svg' },
  ]

  const handleServerTypeSelect = (type) => {
    setSelectedServerType(type);

    switch (type.type.name) {
      case 'Bulletproof VDS':
        var filteredProducts = vdsVpsBulletproof.filter((product) => product.type === type.type.name);
        var filteredConfigs = filteredProducts.map((product) => {
          const configOrder = ['vCPU', 'RAM', 'SSD'];

          const sortedCharacters = configOrder.map((paramName) => {
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
            const totalPrice = product.price + ' $/Month';
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
        break;
      case 'Bulletproof VPS':
        var filteredProducts = vdsVpsBulletproof.filter((product) => product.type === type.type.name);
        var filteredConfigs = filteredProducts.map((product) => {
          const configOrder = ['vCPU', 'RAM', 'SSD'];

          const sortedCharacters = configOrder.map((paramName) => {
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
            const totalPrice = product.price + ' $/Month';
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
        break;
    }
  }

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
    var filteredProduct = vdsVpsBulletproof.filter((product) => product.id === config[4].product_id)[0];

    setSelectedSystem(null);
    setSystems(filteredProduct.os);
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
  };

  const handleVersionSelect = (version, systemId) => {
    setSelectedVersion((prev) => ({ ...prev, [systemId]: version }));
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
    if (!selectedServerType || !selectedConfig || !selectedSystem || !selectedVersion || !selectedPayment) {
      setMessage(t('new-service-config'));
      setIsSuccess(false);
      setIsPopupOpen(true);

      return;
    }
    else {
      const token = typeof window !== 'undefined' && localStorage.getItem('token');
      const queries = `product_id=${selectedConfig[4].product_id}&payment_type=${selectedPayment.id}&os=${selectedSystem.versions.find(item => item.version === selectedVersion[selectedSystem.id]).content}`;

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
                <h2 className={style['order-section__h2']}>1. {t('new-service-server-type')}</h2>
              </div>
              <div className={style['order-section__content']}>
                <TypesList types={serverTypes} selectedType={selectedServerType} onSelect={handleServerTypeSelect} />
              </div>
            </section>
            {selectedServerType !== null && (
              <section className={style['order-section']}>
              <div className={style['order-section__header']}>
                <h2 className={style['order-section__h2']}>2. {t('new-service-config')}</h2>
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
                <h3 className={style['order-summary__h3']}>{t('new-service-server-type')}</h3>
                <p className={style['order-summary__p']}>{selectedServerType ? selectedServerType.type.name : ""}</p>
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
                <h3 className={style['order-summary__h3']}>{t('new-service-payment')}</h3>
                <p className={style['order-summary__p']}>{selectedPayment ? selectedPayment.name : ""}</p>
              </div>
            </div>
            <div className={style['order-summary__header']}>
              <h2 className={style['order-summary__h2']}>{t('new-service-summary')} </h2>
              <p className={style['order-summary__p']}>
                <b>
                  {selectedConfig ? (
                    (parseFloat(selectedConfig[3].value)).toFixed(2) + " $"
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

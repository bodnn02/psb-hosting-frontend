import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'iconify-icon';

import Layout from '../compontens/Layout/Layout';
import VpnCard from '../compontens/VpnCard/VpnCard';
import FaqItem from '../compontens/FaqItem/FaqItem';

import { wrapper } from '../store/store';
import { getProducts } from '../api/getProducts';
import { fetchVpn } from '../store/slices/vpn';
import { useAppSelector } from '../store/hooks';
import { VPN_COUNTRIES, FAQ_LIST_VPN_RU, FAQ_LIST_VPN_EN } from '../utils/constants';

import style from '../styles/Vpn.module.scss';
import styleAdvantages from '../styles/Advantages.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const getStaticProps = wrapper.getStaticProps(store => async (context) => {
  const dispatch = store.dispatch;

  const data = await getProducts('VPN', `${process.env.BASE_URL}/products/all`);
  const vpn = data && data.products ? data.products : [];
  dispatch(fetchVpn(vpn));

  return {
    props: { }
  }
});

const Vpn = () => {
  const { t } = useTranslation("landing");
  const vpnList = useAppSelector(store => store.vpn.vpn);

  const [searchCountry, setSearchCountry] = useState('');
  const [currentCountry, setCurrentCountry] = useState([]);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [currentFlag, setCurrentFlag] = useState('');
  const [currentVpnList, setCurrentVpsList] = useState([]);

  const handleSearch = (evt) => {
    setSearchCountry(evt.target.value);
  }

  const chooseCountry = (evt) => {
    const country = evt.currentTarget.id;
    setSearchCountry('');

    if (currentCountry.length > 0 && currentCountry.includes(country)) {
      const arr = currentCountry.filter(el => el !== country);
      setCurrentCountry(arr);
    } else {
      const arr = [country, ...currentCountry];
      setCurrentCountry(arr);
    }
  }

  const toggleCountryList = () => {
    isCountryListOpen ? setIsCountryListOpen(false) : setIsCountryListOpen(true);
  }

  const handleButtonReset = () => {
    setCurrentCountry([]);
    setSearchCountry('');
    setCurrentVpsList(vpnList);
  }

  const closePopup = () => {
    setIsCountryListOpen(false);
  }

  const filterBySelect = (countries) => {
    const arr = [];
    currentCountry.forEach(el => {
      let vpn;
      if (el === 'UK') vpn = countries.find(item => item.country === 'Great Britain');
      if (el !== 'UK') vpn = countries.find(item => item.country === el);
      if (vpn) arr.push(vpn);
    });
    setCurrentVpsList(arr);
  }

  useEffect(() => {
    if (currentCountry[0]) {
      VPN_COUNTRIES.forEach(el => {
        if (el.country === currentCountry[0]) setCurrentFlag(el.flag);
      })
    }
  }, [currentCountry[0]]);

  useEffect(() => {
    setCurrentVpsList(vpnList);
  }, [vpnList]);

  useEffect(() => {
    if (currentCountry.length > 0) {
      filterBySelect(vpnList);
    } else {
      setCurrentVpsList(vpnList);
    }
  }, [currentCountry]);

  useEffect(() => {
    if (searchCountry !== '') {
      const search = searchCountry.toLowerCase();
      const arr = vpnList.filter(el => el.country.toLowerCase().includes(search));
      if (currentCountry.length > 0) {
        filterBySelect(arr);
      } else {
        setCurrentVpsList(arr);
      }
    } else {
      if (currentCountry.length > 0) {
        filterBySelect(vpnList);
      } else {
        setCurrentVpsList(vpnList);
      }
    }
  }, [searchCountry]);

  return (
    <main className={`${['main']} ${style.mainPage}`}>
      <h2 className={`${['h2-title']} ${style.title}`}>
          {t('vpn-page')}
        </h2>
        <p className={style.subtitle}>
          {t('vpn-page-about')}
        </p>

      <section className={style.products}>
        <div className={style.filters}>
          <p className={style.filtersTitle}>
            {t('vpn-countries')}
          </p>
          <div className={style.filtersContainer}>
            <input
              type='text'
              className={style.filtersSearch}
              placeholder={t('placeholder-search')}
              value={searchCountry || ''}
              onChange={handleSearch}
            />
          </div>
          <div className={`${style.filtersContainer}`} onClick={toggleCountryList}>
            {currentCountry && currentCountry.length === 0 &&
              <div className={`${style.countryList} ${isCountryListOpen ? style.countryListOpen : ''}`}>
                <Image
                  src='/nl.svg'
                  alt='Netherlands'
                  width='28'
                  height='20'
                  className={style.flag}
                />
                <span className={style.country}>
                  Netherlands
                </span>
              </div>
            }
            {currentCountry && currentCountry.length === 1 &&
              <div className={`${style.countryList} ${isCountryListOpen ? style.countryListOpen : ''}`}>
                <Image
                  src={currentFlag}
                  alt={currentCountry[0]}
                  width='28'
                  height='20'
                  className={style.flag}
                />
                <span className={style.country}>
                  {currentCountry[0]}
                </span>
              </div>
            }
            {currentCountry && currentCountry.length > 1 &&
              <div className={`${style.countryList} ${isCountryListOpen ? style.countryListOpen : ''}`}>
                <Image
                  src={currentFlag}
                  alt={currentCountry[0]}
                  width='28'
                  height='20'
                  className={style.flag}
                />
                <span className={style.country}>
                  {currentCountry[0]}
                </span>
                <span className={style.amount}>
                  {`& еще ${currentCountry.length - 1}`}
                </span>
              </div>
            }
          </div>
          <ul className={`${style.filtersList} ${isCountryListOpen ? style.filtersListOpen : ''}`}>
            {VPN_COUNTRIES.map((el, ind) => {
              return (
                <li
                  key={ind}
                  className={`${style.countryItem} ${currentCountry.length > 0 && currentCountry.includes(el.country) ? style.countryItemActive : ''}`}
                  onClick={chooseCountry}
                  id={el.country}
                >
                  <Image
                    src={el.flag}
                    alt={el.country}
                    width='28'
                    height='20'
                    className={style.flag}
                  />
                  <span className={style.country}>
                    {el.country}
                  </span>
                </li>
              );
            })}
            <button
              className={style.buttonClose}
              onClick={closePopup}
              aria-label='button close popup'
              type='button'
            ></button>
          </ul>
          <button type='button' className={style.button} onClick={handleButtonReset}>
            {t('filter-clear')}
          </button>
        </div>

        <ul className={style.vpnList}>
          {currentVpnList && currentVpnList.length > 0 && currentVpnList.map(el => {
            return (
              <VpnCard
                key={el.id}
                vpnItem={el}
                classFirstRow={style.rowTable}
              />
            );
          })}
        </ul>
      </section>

      <section className={styleAdvantages['advantages']}>
      <h2 className={`${['h2-title']} ${styleAdvantages['section-title']} ${style.blockTitle}`}>
        {t('advantages-title-vpn')}
      </h2>
      <Swiper
        modules={[ Pagination ]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
        }}
        pagination={{
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
          clickable: true,
        }}
        className='mySwiper'
      >
        <SwiperSlide>
          <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
            <Image
              src='/speed.svg'
              alt='icon speed'
              width={81}
              height={77}
              className={styleAdvantages.icon}
            />
            <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
              {t('advantages-vpn-one')}
            </h4>
            <p className={styleAdvantages['advantages__description']}>
              {t('advantages-vpn-one-about')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
            <Image
              src='/settings.svg'
              alt='icon settings'
              width={81}
              height={77}
              className={styleAdvantages.icon}
            />
            <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
              {t('advantages-vpn-two')}
            </h4>
            <p className={styleAdvantages['advantages__description']}>
              {t('advantages-vpn-two-about')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
            <Image
              src='/connect.svg'
              alt='icon connect'
              width={81}
              height={77}
              className={styleAdvantages.icon}
            />
            <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
              {t('advantages-vpn-three')}
            </h4>
            <p className={styleAdvantages['advantages__description']}>
              {t('advantages-vpn-three-about')}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
            <Image
              src='/vpn_adv.svg'
              alt='icon countries'
              width={81}
              height={77}
              className={styleAdvantages.icon}
            />
            <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
              {t('advantages-vpn-four')}
            </h4>
            <p className={styleAdvantages['advantages__description']}>
              {t('advantages-vpn-four-about')}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      </section>

      <section className={style['faq']}>
        <h2 className={`${['h2-title']}  ${style['faq__title']}`}>
          {t('faq')}
        </h2>
        <ul className={style['faq__list']}>
          {t('faq-lang') === 'ru' && FAQ_LIST_VPN_RU.map((el, ind) => {
            return (
              <FaqItem
                key={ind}
                answer={el.answer}
                question={el.question}
              />
            );
          })}
          {t('faq-lang') === 'en' && FAQ_LIST_VPN_EN.map((el, ind) => {
            return (
              <FaqItem
                key={ind}
                answer={el.answer}
                question={el.question}
              />
            );
          })}
        </ul>
      </section>

      <div className={`${style.overlay} ${isCountryListOpen ? style.overlayVisible : '' }`}></div>
    </main>
  );
}

Vpn.getLayout = function getLayout(page) {
  return (
    <Layout title='- VPN'>
      {page}
    </Layout>
  );
}

export default connect(state => state)(Vpn);
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/image';
import 'iconify-icon';

import Layout from '../compontens/Layout/Layout';
import AvailableSystems from '../compontens/AvailableSystems/AvailableSystems';
import VpsCard from '../compontens/VpsCard/VpsCard';
import { Filters } from '../compontens/Filters/Filters';

import { getProducts } from '../api/getProducts';
import { fetchVdsVps } from '../store/slices/vdsVps';
import { wrapper } from '../store/store';
import { useAppSelector } from '../store/hooks';
import { sortVps } from '../utils/sortVps';
import { sortByCountries } from '../utils/sortByCountries';

import { VPS_COUNTRY_LIST } from '../utils/constants';

import style from '../styles/Vps.module.scss';
import styleAdvantages from '../styles/Advantages.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const getStaticProps = wrapper.getStaticProps(store => async (context) => {
  const dispatch = store.dispatch;

  const vpsData = await getProducts('VPS', `${process.env.BASE_URL}/products/all`);
  const vps = vpsData && vpsData.products ? vpsData.products : [];
  const sortArr = sortVps(vps);
  const arr = sortArr.sort(sortByCountries);

  dispatch(fetchVdsVps(arr));

  return {
    props: { }
  }
});

const Vds = () => {
  const { t } = useTranslation("landing");
  const router = useRouter();
  const vdsVps = useAppSelector(store => store.vdsVps.vdsVps);

  const [activeCountry, setActiveCountry] = useState(VPS_COUNTRY_LIST[0].country);
  const [currentVpsList, setCurrentVpsList] = useState([]);
  const [price, setPrice] = useState([8, 220]);
  const [cpu, setCpu] = useState([1, 32]);
  const [ram, setRam] = useState([1, 64]);
  const [ssd, setSsd] = useState([15, 510]);

  const handleCountryClick = (evt) => {
    const el = evt.currentTarget;
    setActiveCountry(el.id);
  }

  useEffect(() => {
    const country = router.asPath.slice(router.asPath.indexOf('#') + 1);

    for (let i = 0; i < VPS_COUNTRY_LIST.length; i++) {
      if (country.includes(VPS_COUNTRY_LIST[i].country.slice(0, 4))) {
        setActiveCountry(VPS_COUNTRY_LIST[i].country);
        break;
      }
    }
  }, []);

  useEffect(() => {
    currentVpsList &&
      setCurrentVpsList(vdsVps.filter(el => {
        const elCpu = el.characters[0] && Number(el.characters[0].content.slice(0, -1));
        const elRam = el.characters[1] && Number(el.characters[1].content.slice(0, -2));
        const elSsd = el.characters[2] && Number(el.characters[2].content.slice(0, -2));

        return (
          (el.price <= price[1] && el.price >= price[0]) &&
          (elCpu <= cpu[1] && elCpu >= cpu[0]) &&
          (elRam <= ram[1] && elRam >= ram[0]) &&
          (elSsd <= ssd[1] && elSsd >= ssd[0]) &&
          (el.country === activeCountry)
        );
      }));
  }, [price[0], price[1], cpu[1], cpu[0], ram[0], ram[1], ssd[0], ssd[1], activeCountry]);

  useEffect(() => {
    vdsVps && setCurrentVpsList(vdsVps.filter(el => el.country === activeCountry));
  }, [vdsVps]);

  return (
    <main className={`${['main']} ${style.main}`}>
          <h2 className={`${['h2-title']} ${style.title}`}>VPS</h2>
          <p className={style.subtitle}>
            {t('servises-vps')}
          </p>

        <section className={style.products}>
          <Filters
            price={price}
            setPrice={setPrice}
            cpu={cpu}
            setCpu={setCpu}
            ram={ram}
            setRam={setRam}
            ssd={ssd}
            setSsd={setSsd}
            initialPrice={[8, 220]}
            initialCpu={[1, 32]}
            initialRam={[1, 64]}
            initialSsd={[15, 510]}
          />

          <ul className={style['offer__list-country']}>
            {VPS_COUNTRY_LIST.map(el => {
              return (
                <li
                  key={el.id}
                  className={`${style['offer__country']} ${activeCountry === el.country ? style['offer__country_active'] : ''}`}
                  onClick={handleCountryClick}
                  id={el.country}
                >
                  <img src={el.flag} alt={el.country} className={style['offer__flag']} />
                  {el.country !== 'Great Britain' && <span>{el.country}</span>}
                  {el.country === 'Great Britain' && <span>UK</span>}
                </li>
              );
            })}
          </ul>

          <ul className={style['offer__wrapper']}>
            {currentVpsList && currentVpsList.map((el, ind) => {
              return (
                <VpsCard
                  key={ind}
                  vpsItem={el}
                  page='vps'
                />
              );
            })}
          </ul>
        </section>

      <section className={styleAdvantages['advantages']}>
        <h2 className={`${['h2-title']} ${styleAdvantages['section-title']} ${style.blockTitle}`}>
          {t('advantages-title-vps')}
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
                src='/equipment.svg'
                alt='icon SSD NVMe'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-six')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-six-about')}
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
                {t('advantages-five')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-five-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
              <Image
                src='/dmsa.svg'
                alt='icon DMSA'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-three')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-three-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
              <Image
                src='/support.svg'
                alt='icon support'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-eight')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-eight-about')}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <AvailableSystems />
    </main>
  );
}

Vds.getLayout = function getLayout(page) {
  return (
    <Layout title='- VDS'>
      {page}
    </Layout>
  );
}

export default connect(state => state)(Vds);
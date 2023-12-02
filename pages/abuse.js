import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/image';
import 'iconify-icon';

import Layout from '../compontens/Layout/Layout';
import { sortHostings } from '../utils/sortHostings';
import { sortVps } from '../utils/sortVps';
import { getProducts } from '../api/getProducts';
import { fetchVdsVpsBulletproof } from '../store/slices/vdsVpsBulletproof';
import { fetchHosting } from '../store/slices/hosting';
import { wrapper } from '../store/store';
import { AbusePage } from '../compontens/AbusePage/AbusePage';
import { HostingPage } from '../compontens/HostingPage/HostingPage';
import AvailableSystems from '../compontens/AvailableSystems/AvailableSystems';

import style from '../styles/Abuse.module.scss';
import styleAdvantages from '../styles/Advantages.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const getStaticProps = wrapper.getStaticProps(store => async (context) => {
  const dispatch = store.dispatch;

  const vpsData = await getProducts('Bulletproof VDS', `${process.env.BASE_URL}/products/all`);
  const vps = vpsData && vpsData.products ? vpsData.products : [];
  const vdsData = await getProducts('Bulletproof VPS', `${process.env.BASE_URL}/products/all`);
  const vds = vdsData && vdsData.products ? vdsData.products : [];
  dispatch(fetchVdsVpsBulletproof(sortVps(vds.concat(vps))));

  const hostings = await getProducts('Hosting', `${process.env.BASE_URL}/products/all`);
  const hosting = hostings && hostings.products ? hostings.products : [];

  dispatch(fetchHosting(sortHostings(hosting)));

  return {
    props: { }
  }
});

const Abuse = () => {
  const { t } = useTranslation("landing");

  const [activeBlock, setActiveBlock] = useState('Bulletproof VPS/VDS');

  const changePage = (evt) => {
    setActiveBlock(evt.currentTarget.textContent);
  }

  return (
    <main className={`${['main']} ${style.mainPage}`}>
      <section className={`${style.main}`}>
        <div className={`${style.vpsTitle} ${activeBlock === 'Bulletproof VPS/VDS' ? style.visible : ''}`}>
          <h2 className={`${['h2-title']} ${style.title}`}>
            Bulletproof
          </h2>
          <p className={style.subtitle}>
            {t('bulletproof-subtitle')}
          </p>
        </div>
        <div className={`${style.vpsTitle} ${activeBlock === 'Bulletproof Hosting' ? style.visible : ''}`}>
          <h2 className={`${['h2-title']} ${style.title}`}>
            Bulletproof Hosting
          </h2>
          <p className={style.subtitle}>
            {t('abuse-hosting-about')}
          </p>
        </div>

        <ul className={style.pageList}>
          <li
            onClick={changePage}
            className={`${style.pageItem} ${activeBlock === 'Bulletproof VPS/VDS' ? style.pageItemActive : ''}`}
          >
            Bulletproof VPS/VDS
          </li>
          <li
            onClick={changePage}
            className={`${style.pageItem} ${activeBlock === 'Bulletproof Hosting' ? style.pageItemActive : ''}`}
          >
            Bulletproof Hosting
          </li>
        </ul>

        {activeBlock === 'Bulletproof VPS/VDS' && <AbusePage />}
        {activeBlock === 'Bulletproof Hosting'&& <HostingPage />}
      </section>

      <section className={`${styleAdvantages['advantages']} ${style.advantages}`}>
        <h2 className={`${['h2-title']} ${styleAdvantages['section-title']} ${style.blockTitle}`}>
          {t('advantages-title-vds')}
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
                src='/abuse_icon.svg'
                alt='icon bulletproof'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-two')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-two-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
              <Image
                src='/crypto.svg'
                alt='icon crypto'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-four')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-four1-about')}
                <br />
                {t('advantages-four2-about')}
                <br />
                {t('advantages-four3-about')}
                <br />
                {t('advantages-four4-about')}
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

Abuse.getLayout = function getLayout(page) {
  return (
    <Layout title='- VPS/VDS'>
      {page}
    </Layout>
  );
}

export default connect(state => state)(Abuse);
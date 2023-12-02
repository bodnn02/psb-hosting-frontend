import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/image';
import { Rubik } from "next/font/google";

import Layout from '../compontens/Layout/Layout';
import { REVIEW_EN, REVIEW_RU } from '../utils/constants';

import style from '../styles/Company.module.scss';
import styleAdvantages from '../styles/Advantages.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
});

const Company = () => {
  const { t } = useTranslation("landing");

  return (
    <main className={`${['main']} ${style.main}`}>
      <section className={style['about']}>
        <div className={style.imgWrap}>
          <img alt='picture company' src='/about.jpg' className={style['about__img']} />
        </div>
        <div className={style['about__text']}>
          <h2 className={`${['h2-title']} ${style.title}`}>
            <div className={rubik.className}>
              {t('company')}
            </div>
          </h2>
          <p>{t('company-about')}</p>
          <p>{t('company-about-two')}</p>
          <ul className={style['about__list']}>
            <li>{t('company-one')}</li>
            <li>{t('company-two')}</li>
            <li>{t('company-three')}</li>
            <li>{t('company-four')}</li>
            <li>{t('company-five')}</li>
            <li>{t('company-six')}</li>
            <li>{t('company-seven')}</li>
            <li>{t('company-eigth')}</li>
          </ul>
          <p className={style['about__telegram']}>
            <span className={style['about__span']}>
              {t('more')}&nbsp;
            </span>
            <span className={style['about__span']}>
              <Link href='https://psb-offshore.pro/'>
                {t('site')}
              </Link>
              &nbsp;{t('and')}&nbsp;
              <Link href='https://telegram.me/PSB_Wallet_Bot'>
                {t('tg')}
              </Link>
            </span>
          </p>
        </div>
      </section>

      <section className={styleAdvantages['advantages']}>
        <h2 className={`${['h2-title']} ${styleAdvantages['section-title']} ${style.blockTitle}`}>
          {t('advantages-title-main')}
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
                src='/vps_adv.svg'
                alt='icon vps'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-vps')}
              </h4>
              <p className={`${styleAdvantages['advantages__description']} ${style.advantagesItem}`}>
                {t('advantages-vps-about')}
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
                {t('advantages-nine')}
              </h4>
              <p className={`${styleAdvantages['advantages__description']} ${style.advantagesItem}`}>
                {t('advantages-ten')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
              <Image
                src='/security.svg'
                alt='icon security'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-one')}
              </h4>
              <p className={`${styleAdvantages['advantages__description']} ${style.advantagesItem}`}>
                <span className={styleAdvantages['advantages__span']}>
                  {t('advantages-coenf')}
                </span>
                <span className={styleAdvantages['advantages__span']}>
                  {t('advantages-coenf-two')}
                </span>
                <span className={styleAdvantages['advantages__span']}>
                  {t('advantages-coenf-three')}
                </span>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styleAdvantages['advantages__list-item']} ${style.advantagesItem}`}>
              <Image
                src='/vpn_adv.svg'
                alt='icon vpn'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-seven')}
              </h4>
              <p className={`${styleAdvantages['advantages__description']} ${style.advantagesItem}`}>
                {t('advantages-seven-about')}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className={style['review']}>
        <h2 className={`${['h2-title']}  ${style['review__title']}`}>
          {t('review')}
        </h2>
        <Swiper
          modules={[ Pagination ]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            660: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1350: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          pagination={{
            renderBullet: function (index, className) {
              return '<span class="' + className + '"></span>';
            },
            clickable: true,
          }}
          className='mySwiperReview'
        >
          {t('faq-lang') === 'ru' && REVIEW_RU.map((el, ind) => {
            return (
              <SwiperSlide key={ind}>
                <Link href={el.link} target="_blank">
                  <div className={style['review__item']}>
                    <p className={style['review__name']}>
                      {el.name}
                    </p>
                    <div className={style['review__rating']}>
                      <p className={style['review__number']}>
                        {el.number}
                      </p>
                      <img alt='review' src={el.img} className={style['review__img']} />
                      <p className={style['review__text']}>
                        {el.text}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          {t('faq-lang') === 'en' && REVIEW_EN.map((el, ind) => {
            return (
              <SwiperSlide key={ind}>
                <Link href={el.link} target="_blank">
                  <div className={style['review__item']}>
                    <p className={style['review__name']}>
                      {el.name}
                    </p>
                    <div className={style['review__rating']}>
                      <p className={style['review__number']}>
                        {el.number}
                      </p>
                      <img alt='review' src={el.img} className={style['review__img']} />
                      <p className={style['review__text']}>
                        {el.text}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </main>
  );
}

Company.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default connect(state => state)(Company);
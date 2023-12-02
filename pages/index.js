import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import Layout from '../compontens/Layout/Layout';
import FaqItem from '../compontens/FaqItem/FaqItem';

import { PAYMENTS, FAQ_LIST_RU, FAQ_LIST_EN, REVIEW_EN, REVIEW_RU } from '../utils/constants';

import style from '../styles/Main.module.scss';
import styleAdvantages from '../styles/Advantages.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default function Home() {
  const { t } = useTranslation("landing");

  return (
    <main className='main'>
      <section className={style.hero}>
        <div className={style.hero__info}>
          <h2 className={`${['h2-title']} ${style.hero__title}`}>
            PSB HOSTING
          </h2>
          <p className={style.hero__text}>{t('hero-one')}</p>
          <p className={style.hero__text}>{t('hero-two')}</p>
          <button className={style.hero__btn}>
            <Link href="/company">
              <span>
                {t('company')}
              </span>
            </Link>
          </button>
        </div>
        <div className={style.hero__img}>
          <Image
            src="/main_img.png"
            alt="PSB hosting image"
            width='522'
            height='472'
            className={style.img}
          />
        </div>
      </section>

      <section className={styleAdvantages['advantages']}>
        <h2 className={`${['h2-title']} ${styleAdvantages['section-title']}`}>
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
            <div className={styleAdvantages['advantages__list-item']}>
              <Image
                src='/equipment.svg'
                alt='icon equipment'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-fix-one')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-fix-one-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styleAdvantages['advantages__list-item']}>
              <Image
                src='/abuse.svg'
                alt='icon Bulletproof'
                width={81}
                height={77}
                className={styleAdvantages.icon}
              />
              <h4 className={`${['h4-title']} ${styleAdvantages['advantages__title']}`}>
                {t('advantages-two')}
              </h4>
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-two1-about')}
                &nbsp;
                {t('advantages-two2-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styleAdvantages['advantages__list-item']}>
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
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-one-about')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styleAdvantages['advantages__list-item']}>
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
              <p className={styleAdvantages['advantages__description']}>
                {t('advantages-seven-about')}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className={style.servises}>
        <h2 className={`${['h2-title']} ${style.servises__title}`}>
          {t('servises')}
        </h2>
        <ul className={style.servises__wrapper}>
          <li>
            <Link className={`${style.servises__item} ${style.servises__vps}`} href='/vps'>
              <h3 className={style['servises__item-title']}>
                VPS
              </h3>
              <p className={style.servises__text}>
                {t('servises-vps')}
              </p>
            </Link>
          </li>
          <li>
            <Link className={`${style.servises__item} ${style.servises__abuse}`} href='/abuse'>
            <h3 className={style['servises__item-title']}>
                Bulletproof
              </h3>
              <p className={style.servises__text}>
                {t('servises-bulletproof')}
              </p>
            </Link>
          </li>
          <li>
            <Link className={`${style.servises__item} ${style.servises__vpn}`} href='/vpn'>
              <h3 className={style['servises__item-title']}>
                VPN
              </h3>
              <p className={style.servises__text}>
                {t('servises-vpn')}
              </p>
            </Link>
          </li>
        </ul>
      </section>
      <section className={style['payment']}>
        <h2 className={`${['h2-title']} ${style.payment__title}`}>
          {t('payment')}
        </h2>
        <ul className={style.payment__wrapper}>
          {PAYMENTS.map((el, ind) => {
            return (
              <li key={ind} className={style['payment__wrapper-item']}>
                <Image
                  className={style["payment__wrapper-img"]}
                  src={el.img}
                  alt={el.name}
                  width={80}
                  height={80}
                />
                <p className={style["payment__wrapper-text"]}>{el.name}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={style['faq']}>
        <h2 className={`${['h2-title']}  ${style['faq__title']}`}>
          {t('faq')}
        </h2>
        <ul className={style['faq__list']}>
          {t('faq-lang') === 'ru' && FAQ_LIST_RU.map((el, ind) => {
            return (
              <FaqItem
                key={ind}
                answer={el.answer}
                question={el.question}
              />
            );
          })}
          {t('faq-lang') === 'en' && FAQ_LIST_EN.map((el, ind) => {
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

      <section className={style['review']}>
        <h2 className={`${['h2-title']}  ${style['faq__title']}`}>
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
              spaceBetween: 60,
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

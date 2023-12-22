import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { VPN_COUNTRIES } from '../../utils/constants';

import style from '../../styles/ItemCard.module.scss';

const VpnCard = ({ vpnItem }) => {
  const { t } = useTranslation("landing");

  return (
    <li className={`${style['card']} ${style['card-vpn']}`}>
      <div className={`${style.title} ${style.titleVpn}`}>
        {vpnItem.country !== 'Great Britain' && VPN_COUNTRIES.map(item => {
          return (
            item.country === vpnItem.country &&
              <img
                key={vpnItem.id}
                src={item.flag}
                alt={vpnItem.country}
                className={style['card__img']}
              />
          )
        })}
        {vpnItem.country === 'Great Britain' && VPN_COUNTRIES.map(item => {
          return (
            item.country === 'UK' &&
              <img
                key={vpnItem.id}
                src={item.flag}
                alt={vpnItem.country}
                className={style['card__img']}
              />
          )
        })}
        <h3 className={style['card__title']}>
          {vpnItem.country !== 'Great Britain' && vpnItem.country}
          {vpnItem.country === 'Great Britain' && 'UK'}
        </h3>
      </div>
      <p className={style.price}>
        {`$${vpnItem.price}/${t('order-price-period')}`}
      </p>
      <p className={style.column}>
        <span>{`${t('card-item-port')}:`}</span>
        <span>{t('card-item-port-value')}</span>
      </p>
      <p className={style.column}>
        <span>{`${t('card-item-traffic')}:`}</span>
        <span>{t('card-item-traffic-value')}</span>
      </p>
      <p className={style.column}>
        <span>{`${t('card-item-connect')}:`}</span>
        <span>{t('card-item-connect-value')}</span>
      </p>
      <ul className={style.caracters}>
        <li>
          <span>{`${t('card-item-port')}:`}</span>
          <span>{t('card-item-port-value')}</span>
        </li>
        <li>
          <span>{`${t('card-item-traffic')}:`}</span>
          <span>{t('card-item-traffic-value')}</span>
        </li>
        <li>
          <span>{`${t('card-item-connect')}:`}</span>
          <span>{t('card-item-connect-value')}</span>
        </li>
      </ul>
      <div className={style['card__order']}>
        <p className={style['card__price']}>
          {`$${vpnItem.price}/${t('order-price-period')}`}
        </p>
        <Link href={`/account/shop/vpn`}>
          {t('button-buy-item')}
        </Link>
      </div>
    </li>
  );
}

export default VpnCard;
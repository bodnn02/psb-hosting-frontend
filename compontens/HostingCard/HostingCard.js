import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import style from '../../styles/ItemCard.module.scss';

const HostingCard = ({ hostingItem }) => {
  const { t } = useTranslation("landing");

  return (
    <li className={`${style['card']} ${style['card_hosting']}`}>
      <h3 className={style['card__title']}>{hostingItem.title}</h3>
      <p className={style.price}>
        {`$${hostingItem.price}/${t('order-price-period')}`}
      </p>
      {hostingItem.characters &&
        <>
          <>
            {hostingItem.characters[1] &&
              <p className={style.column}>
                <span>{`${t('card-item-site')}:`}</span>
                <span>
                  {`${hostingItem.characters[1].name} ${hostingItem.characters[1].content}`}
                </span>
              </p>
            }
            {hostingItem.characters[0] &&
              <p className={style.column}>
                <span>{t('card-item-memory')}</span>
                <span>
                  {`SSD ${hostingItem.characters[0].name}${hostingItem.characters[0].content}`}
                </span>
              </p>
            }
          </>
          <ul className={style.caracters}>
            {hostingItem.characters[1] &&
              <li>
                <span>{`${t('card-item-site')}:`}</span>
                <span>
                  {`${hostingItem.characters[1].name} ${hostingItem.characters[1].content}`}
                </span>
              </li>
            }
            {hostingItem.characters[0] &&
              <li>
                <span>{t('card-item-memory')}</span>
                <span>
                  {`SSD ${hostingItem.characters[0].name}${hostingItem.characters[0].content}`}
                </span>
              </li>
            }
          </ul>
        </>
      }
      <div className={style['card__order']}>
        <p className={style['card__price']}>
          {`$${hostingItem.price}/${t('order-price-period')}`}
        </p>
        <Link href={`/account/shop/hosting/${hostingItem.id}`}>
          {t('button-buy-item')}
        </Link>
      </div>
    </li>
  );
}

export default HostingCard;
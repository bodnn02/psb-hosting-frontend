import Link from 'next/link';
import 'iconify-icon';
import style from './ButtonTelegram.module.scss';

const ButtonTelegram = () => {
  return (
    <Link href='https://t.me/psbhosting' className={style.button}>
      <iconify-icon icon="logos:telegram" width='60' height='60'></iconify-icon>
    </Link>
  );
}

export default ButtonTelegram;
import 'iconify-icon';
import useScrollToTop from '../../hooks/useScrollToTop';
import style from './ButtonToTop.module.scss';

const ButtonToTop = () => {
  const { scroll, goToTop } = useScrollToTop();

  return (
    <button
      type='buuton'
      onClick={goToTop}
      className={`${style.button} ${scroll > 20 ? style['button_visible'] : ''}`}
    >
      <iconify-icon icon="mdi:chevron-up"></iconify-icon>
    </button>
  );
}

export default ButtonToTop;
import style from './Preloader.module.scss';

const Preloader = ({ isLoading }) => {
  return (
    <img
      alt='preloader'
      className={`${style.preloader} ${isLoading ? style['preloader_visible'] : ''}`}
      src='/loader.svg'
    />
  );
}

export default Preloader;
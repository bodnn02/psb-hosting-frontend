import Link from 'next/link';
import 'iconify-icon';

import style from '../../styles/Auth.module.scss';

const AuthForm = ({
  title,
  children,
  button,
  bottomLink,
  bottomLinkHref,
  handleSubmitForm,
  isActiveButton,
  formRef
}) => {
  return (
    <form
      className={style['form']}
      onSubmit={handleSubmitForm}
      noValidate
      ref={formRef}
    >
      <p className={style['form__title']}>
        {title}
      </p>
      {children}
      <button
        type='submit'
        className={style['form__button-submit']}
        disabled={!isActiveButton}
      >
        {button}
      </button>
      {button === 'Вход' &&
        <p className={style['form__link-reset-password']}>
          Забыли&nbsp;
          <Link href='/password' className={style['form__link']}>
            имя пользователя / пароль?
          </Link>
        </p>
      }
      {button === 'Log in' &&
        <p className={style['form__link-reset-password']}>
          Forgot&nbsp;
          <Link href='/password' className={style['form__link']}>
            user name / password?
          </Link>
        </p>
      }
      {bottomLinkHref &&
        <Link href={bottomLinkHref} className={`${style['form__link']} ${style['form__link-bottom']}`}>
          {bottomLink}
          <iconify-icon icon="material-symbols:arrow-right-alt-rounded"></iconify-icon>
        </Link>
      }
    </form>
  );
}

export default AuthForm;
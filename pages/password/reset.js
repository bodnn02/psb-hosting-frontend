import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import 'iconify-icon';

import LayoutAuth from '../../compontens/LayoutAuth/LayoutAuth';
import AuthForm from '../../compontens/AuthForm/AuthForm';

import style from '../../styles/Auth.module.scss';

export default function ResetPasswordDone() {
  const router = useRouter();
  const { t } = useTranslation('auth');

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    router.push('/login');
  }

  return (
    <LayoutAuth>
      <AuthForm
        title={t('reset-password-success-title')}
        button={t('button-go-back')}
        bottomLink={t('reset-password-link')}
        bottomLinkHref='/login'
        handleSubmitForm={handleSubmitForm}
        isActiveButton={true}
      >
        <p className={style['form__message']}>
          {t('reset-password-success-text')}
        </p>
      </AuthForm>
    </LayoutAuth>
  );
}
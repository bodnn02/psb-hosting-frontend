import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { connect } from 'react-redux';

import AuthForm from '../compontens/AuthForm/AuthForm';
import { useAppDispatch } from '../store/hooks';
import { fetchVdsVps } from '../store/slices/vdsVps';
import { fetchVpn } from '../store/slices/vpn';
import { fetchVdsVpsBulletproof } from '../store/slices/vdsVpsBulletproof';
import { fetchHosting } from '../store/slices/hosting';
import { fetchUser } from '../store/slices/user';
import { fetchOrders } from '../store/slices/orders';
import { fetchCurrentOrder } from '../store/slices/currentOrder';
import { fetchPaymentHistory } from '../store/slices/paymentHystory';
import { setAppLogin } from '../store/slices/login';
import { logout } from '../api/logout';
import LayoutAuth from '../compontens/LayoutAuth/LayoutAuth';

import style from '../styles/Auth.module.scss';

const Logout = () => {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const handleLogout = (evt) => {
    evt.preventDefault();
    const token = typeof window !== 'undefined' && localStorage.getItem('token');

    if (typeof window !== 'undefined') localStorage.setItem('token', '');
    if (typeof window !== 'undefined') localStorage.setItem('username', '');
    dispatch(fetchHosting(null));
    dispatch(fetchOrders(null));
    dispatch(fetchUser(null));
    dispatch(fetchVdsVps(null));
    dispatch(fetchVpn(null));
    dispatch(fetchVdsVpsBulletproof(null));
    dispatch(fetchCurrentOrder({}));
    dispatch(fetchPaymentHistory(null));
    dispatch(setAppLogin(false));
    logout(token);

    router.push('/login');
  }

  return (
    <LayoutAuth>
      <AuthForm
        title={t('logout')}
        button={t('logout-button')}
        handleSubmitForm={handleLogout}
        isActiveButton={true}
      >
        <p className={`${style['form__message']} ${style['form__message_logout']}`}>
          {t('logout-text')}
        </p>
      </AuthForm>
    </LayoutAuth>
  );
}

export default connect(state => state)(Logout);
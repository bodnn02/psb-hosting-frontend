import { Provider } from 'react-redux';
import { appWithI18Next, useSyncLanguage } from 'ni18n';
import { ni18nConfig } from '../ni18n.config';

import { wrapper } from '../store/store';

import '../styles/reset.css';
import '../styles/globals.css';

const App = ({ Component, ...pageProps }) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const getLayout = Component.getLayout || ((page) => page);
  const locale = typeof window !== 'undefined' && window.localStorage.getItem('MY_LANGUAGE');

  useSyncLanguage(locale);

  return (
    <Provider store={store}>
      {getLayout(<Component {...props} />)}
    </Provider>
  );
}

export default appWithI18Next(App, ni18nConfig);

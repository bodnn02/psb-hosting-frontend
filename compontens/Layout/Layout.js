import { Inter } from "next/font/google";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import ButtonTelegram from '../ButtonTelegram/ButtonTelegram';
import Preloader from '../Preloader/Preloader';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

const Layout = ({ children, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { ready, i18n } = useTranslation('translation');
  const router = useRouter();
  const { locale, pathname, asPatch, query } = router;

  const handleLoad = () => {
    if (isLoading) setIsLoading(false);
  }

  const handleRouteChange = () => {
    i18n.changeLanguage(locale);
  }

  useEffect(() => {
    if (ready) {
      // for Chrome
      window.addEventListener('load', handleLoad);

      // for yandex browser
      if (isLoading && document.readyState === 'complete') {
        handleLoad();
      }

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [ready]);

  useEffect(() => {
    if (ready) setIsLoading(false);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem('MY_LANGUAGE', locale);

    if (locale === 'en') {
      router.push({ pathname, query }, asPatch, { locale: 'en' });
    } else {
      router.push({ pathname, query }, asPatch, { locale: 'ru' });
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="PSB Hosting" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{`PSB Hosting ${title ? title : ''}`}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
      </Head>
      {isLoading && <Preloader /> }
      <div className={inter.className}>
        <div className={`container ${isLoading ? 'hidden' : ''}`}>
          <AppHeader setIsLoading={setIsLoading} />
            { children }
          <AppFooter />
          <ButtonTelegram />
        </div>
      </div>
    </>
  );
}

export default Layout;
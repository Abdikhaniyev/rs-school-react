import type { AppProps } from 'next/app';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import { Provider } from 'react-redux';

import { ErrorBoundary, Fallback, Footer, Header } from '@/components';

import { wrapper } from '../redux/store';

import '@/styles/globals.scss';

const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
});

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <div className={`${dm_sans.variable} ${bebas_neue.variable}`}>
        <ErrorBoundary fallback={<Fallback>Something went wrong</Fallback>}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

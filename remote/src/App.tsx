import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import Remote from './components/Remote';
import locales from './locales';

import type { FunctionComponent } from 'react';

i18next.use(initReactI18next);

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: locales,
  react: {
    useSuspense: false,
  },
});
export const App: FunctionComponent = () => {
  return <Remote />;
};

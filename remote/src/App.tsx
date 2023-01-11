import { i18nextOptions } from '@isomof/config/i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import Remote from './components/Remote';
import locales from './locales';

import type { FunctionComponent } from 'react';

i18next.use(initReactI18next);

i18next.init({
  lng: 'en',
  resources: locales,
  ...i18nextOptions,
});
export const App: FunctionComponent = () => {
  return <Remote />;
};

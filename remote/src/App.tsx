import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import Remote from './components/Remote';

import type { FunctionComponent } from 'react';

i18next.use(initReactI18next);

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        key: 'Remote',
      },
    },
    ru: {
      translation: {
        key: 'Удаленный',
      },
    },
  },
});
export const App: FunctionComponent = () => {
  return <Remote />;
};

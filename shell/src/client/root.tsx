import { i18nextOptions } from '@isomof/config/i18next';
import i18next from 'i18next';
import { hydrateRoot } from 'react-dom/client';
import { withSSR, initReactI18next } from 'react-i18next';

import { App } from 'src/shared/App';

i18next.use(initReactI18next);
i18next.init(i18nextOptions);

const ExtendedApp = withSSR()(App);

hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <ExtendedApp
    initialLanguage={window.initialLanguage}
    initialI18nStore={window.initialI18nStore}
  />
);

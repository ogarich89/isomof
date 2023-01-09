import { hydrateRoot } from 'react-dom/client';
import { withSSR } from 'react-i18next';

import 'src/client/i18next';
import { App } from 'src/shared/App';

const ExtendedApp = withSSR()(App);

hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <ExtendedApp
    initialLanguage={window.initialLanguage}
    initialI18nStore={window.initialI18nStore}
  />
);

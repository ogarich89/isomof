import i18next from 'i18next';
import Fetch from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import i18nextOptions from 'src/i18n';

import type { InitOptions } from 'i18next';

i18next.use(Fetch);
i18next.use(initReactI18next);
i18next.init(i18nextOptions() as InitOptions);

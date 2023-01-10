import type { InitOptions } from 'i18next';

export default {
  fallbackLng: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
} as InitOptions;

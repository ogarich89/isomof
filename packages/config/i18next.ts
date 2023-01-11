import type { InitOptions, Resource } from 'i18next';

export const i18nextOptions: InitOptions = {
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

export const getResources = (...locales: Resource[]) =>
  locales.reduce(
    (acc, { en, ru }) => ({
      ...acc,
      en: {
        ...acc.en,
        ...en,
      },
      ru: {
        ...acc.ru,
        ...ru,
      },
    }),
    {}
  );

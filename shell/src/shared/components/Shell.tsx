import { useTranslation } from 'react-i18next';

export const Shell = () => {
  const { t } = useTranslation();
  return <h1>{t('hello')}</h1>;
};

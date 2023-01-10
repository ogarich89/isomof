import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

const Remote: FunctionComponent = () => {
  const { t } = useTranslation('remote');
  useEffect(() => {
    console.log(1111);
  }, []);
  return <h2>{t('key')}</h2>;
};

export default Remote;

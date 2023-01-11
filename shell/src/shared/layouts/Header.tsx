import { useTranslation } from 'react-i18next';

import { session } from 'src/shared/session';

import type { FunctionComponent } from 'react';

export const Header: FunctionComponent = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    await session.set('language', { lng });
  };

  return (
    <header>
      <ul>
        <li>
          <span onClick={() => changeLanguage('ru')}>ru</span>
        </li>
        <li>
          <span onClick={() => changeLanguage('en')}>en</span>
        </li>
      </ul>
    </header>
  );
};

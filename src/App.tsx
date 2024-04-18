import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PLFlag from './assets/img/pl.png';
import ENFlag from './assets/img/en.png';
import { List } from './components/List/List';

interface IApp {
  i18n: any;
}

const App: FC<IApp> = ({
  i18n
}) => {

  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
  };

  return (
    <div>
      <LangSelector>
        <div onClick={() => changeLanguage('en')}><img src={ENFlag} /></div>
        <div onClick={() => changeLanguage('pl')}><img src={PLFlag} /></div>
      </LangSelector>
      <H1>{ t('header') }</H1>
      <List />
    </div>
  );
}

const LangSelector = styled.div`
  display: flex;
  flex-directiron: row;
  position: absolute;
  gap: 20px;
  padding: 10px;
  right: 0;
  cursor: pointer;
  items-align: center;

  :hover {
    opacity: 0.8;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const H1 = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;

export default App;

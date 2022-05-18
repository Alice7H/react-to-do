import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { IntlProvider } from 'react-intl';
import { getLang } from './lang/lang-conf';

const locale = navigator.language;
// const locale = document.documentElement.lang;
const lang = getLang(locale);

ReactDOM.render(
  <IntlProvider locale={locale} messages={lang}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
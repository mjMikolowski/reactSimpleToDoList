import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n/i18n.js';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App i18n={i18n}/>
  </React.StrictMode>
);

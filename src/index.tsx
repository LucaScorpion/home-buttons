import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import { App } from './App';
import { Injector } from './services/Injector';
import { InjectionProvider } from './hooks/useService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const injector = new Injector();

root.render(
  <React.StrictMode>
    <InjectionProvider value={injector}>
      <App />
    </InjectionProvider>
  </React.StrictMode>
);

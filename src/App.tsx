import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useService } from './hooks/useService';
import { HassService } from './services/HassService';

export const App = () => {
  const hass = useService(HassService);

  useEffect(() => {
    hass.ping().then(console.log);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

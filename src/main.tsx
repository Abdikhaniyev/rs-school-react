import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { StoreProvider } from './context/StoreContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

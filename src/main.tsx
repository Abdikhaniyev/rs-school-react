import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { StoreProvider } from './context/StoreContext';
import './index.scss';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StoreProvider>
          <Router />
        </StoreProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

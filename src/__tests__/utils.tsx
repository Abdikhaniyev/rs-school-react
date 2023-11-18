import { RenderOptions, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  MemoryRouter,
  MemoryRouterProps,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../redux/store';
import { PreloadedState } from '@reduxjs/toolkit';

interface Options extends RenderOptions {
  router?: 'memory' | 'browser';
  routerProps?: BrowserRouterProps | MemoryRouterProps;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function customRender(
  ui: ReactElement,
  {
    router,
    routerProps = {},
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: Options = {
    router: 'browser',
  }
) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const Router = router === 'browser' ? BrowserRouter : MemoryRouter;
    return (
      <Provider store={store}>
        <Router {...routerProps}>{children}</Router>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };

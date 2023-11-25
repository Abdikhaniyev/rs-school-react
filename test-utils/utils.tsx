import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';

import { AppStorePreloaded, RootState, setupStorePreloaded } from '../redux/store';

interface Options extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStorePreloaded;
}

function customRender(
  ui: ReactElement,
  {
    preloadedState = {} as PreloadedState<RootState>,
    store = setupStorePreloaded(preloadedState),
    ...renderOptions
  }: Options = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
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

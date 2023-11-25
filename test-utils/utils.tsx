import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { render, RenderOptions } from '@testing-library/react';

import { AppStore, setupStore } from '../redux/store';

interface Options extends RenderOptions {
  store?: AppStore;
}

function customRender(ui: ReactElement, { store = setupStore(), ...renderOptions }: Options = {}) {
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

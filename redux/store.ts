import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { CharacterApi } from './actions/character';
import { EpisodeApi } from './actions/episode';
import { layoutSlice } from './slices/layoutSlice';

const rootReducer = combineReducers({
  [CharacterApi.reducerPath]: CharacterApi.reducer,
  [EpisodeApi.reducerPath]: EpisodeApi.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([CharacterApi.middleware, EpisodeApi.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(setupStore, { debug: false });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CharacterApi } from './actions/character';

const rootReducer = combineReducers({
  layout: layoutReducer,
  [CharacterApi.reducerPath]: CharacterApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([CharacterApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import Auth from './Auth';
import { MMKVStorage } from './MmkvStorage';

const persistConfig = {
  key: 'root',
  storage: MMKVStorage,
  whitelist: ['Auth'],
};

const rootReducer = combineReducers({
  Auth,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(logger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

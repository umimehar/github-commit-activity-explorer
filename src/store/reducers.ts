import { CombinedState, combineReducers } from 'redux';
import { Reducer } from 'react';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';

import statsList from './get-stats';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['statsList'],
};

const rootReducer: Reducer<CombinedState<any>, any> = combineReducers({
  statsList,
});

export const persistedReducer: Reducer<any, any> = persistReducer(persistConfig, rootReducer);

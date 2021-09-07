import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { persistedReducer } from './reducers';

const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor: Persistor = persistStore(store);
export { store, persistor };

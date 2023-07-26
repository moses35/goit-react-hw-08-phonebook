import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from 'redux/filter/filterSlice';
import { contactsSlice } from 'redux/contacts/contactsSlice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistedAuthReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    phonebook: contactsSlice.reducer,
    filters: filterSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

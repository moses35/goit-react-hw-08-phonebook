import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logOut, loginUser, refreshUser, registerUser } from './operationsAuth';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(registerUser.rejected, state => {
        state.isLoggedIn = false;
        toast({
          title: 'Not enough data!',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      });
  },
});

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

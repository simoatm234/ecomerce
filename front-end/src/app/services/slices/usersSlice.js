import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { login, register } from '../thunkFunctions/AuthThunk';
import { me } from '../thunkFunctions/userThunk';

const initialState = {
  user: null,
  token: Cookies.get('token') || null,
  role: Cookies.get('role') || null,
  isAuthenticated: !!Cookies.get('token'),
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove('token', { path: '/' });
      Cookies.remove('role', { path: '/' });
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role ?? null;
        state.isAuthenticated = true;
        if (action.payload?.token && action.payload.user?.role) {
          Cookies.set('token', action.payload.token, {
            expires: 7,
            path: '/',
          });
          Cookies.set('role', action.payload.user.role, {
            expires: 7,
            path: '/',
          });
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role ?? null;
        state.isAuthenticated = true;
        if (action.payload?.token) {
          Cookies.set('token', action.payload.token, {
            expires: 7,
            path: '/',
          });
          if (action.payload.user?.role) {
            Cookies.set('role', action.payload.user.role, {
              expires: 7,
              path: '/',
            });
          }
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Me (check auth on app load)
      .addCase(me.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.role = action.payload.user?.role ?? state.role;
        state.isAuthenticated = true;
        if (action.payload.user?.role) {
          Cookies.set('role', action.payload.user.role, {
            expires: 7,
            path: '/',
          });
        }
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        Cookies.remove('token', { path: '/' });
        Cookies.remove('role', { path: '/' });
      });
  },
});

export const { logout, clearError } = usersSlice.actions;

export default usersSlice.reducer;

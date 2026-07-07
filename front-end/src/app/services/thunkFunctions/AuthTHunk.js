import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/Api';

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.auth.login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during login'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.auth.register(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during registration'
      );
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.auth.forgotPasswordApi(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send reset link.'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.auth.resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to reset password.'
      );
    }
  }
);
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.auth.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to reset password.'
      );
    }
  }
);

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
  'auth/register', // ✅ Fixed: was 'auth/login'
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.auth.register(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during registration' // ✅ Fixed message too
      );
    }
  }
);

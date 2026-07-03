import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/Api';

export const me = createAsyncThunk(
  'user/me', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.auth.me();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred during registration' // ✅ Fixed message too
      );
    }
  }
);

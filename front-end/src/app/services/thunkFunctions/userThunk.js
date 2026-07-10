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
        error.response?.data?.message || 'Failed to fetch current user.'
      );
    }
  }
);

export const allUsers = createAsyncThunk(
  'users/allUsers',
  async ({ page = 1, per_page = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await api.admin.users.index({ page, per_page });
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users.'
      );
    }
  }
);

export const showUser = createAsyncThunk(
  'users/showUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.admin.users.show(id); // ✅ fixed — was api.users.show
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user.'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.admin.users.update({id, formData});
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user.'
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.admin.users.destroy(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete user.'
      );
    }
  }
);

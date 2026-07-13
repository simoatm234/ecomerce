import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/Api';

export const allProducts = createAsyncThunk(
  'products/allProducts',
  async (
    { page = 1, per_page = 10, category_id, is_active, search } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.products.index({
        page,
        per_page,
        ...(category_id !== undefined && { category_id }),
        ...(is_active !== undefined && { is_active }),
        ...(search !== undefined && { search }),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products.'
      );
    }
  }
);

export const showProduct = createAsyncThunk(
  'products/showProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.products.show(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product.'
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.products.store(formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product.'
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.products.update(id, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update product.'
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.products.destroy(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product.'
      );
    }
  }
);

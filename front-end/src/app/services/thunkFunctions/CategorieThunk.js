// src/redux/thunks/categoriesThunk.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/Api';

/**
 * Get All Categories
 */
export const allCategories = createAsyncThunk(
  'categories/all',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.categories.index(params);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories.'
      );
    }
  }
);

/**
 * Get Single Category
 */
export const showCategory = createAsyncThunk(
  'categories/show',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.categories.show(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category.'
      );
    }
  }
);

/**
 * Create Category
 */
export const createCategory = createAsyncThunk(
  'categories/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.categories.store(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create category.'
      );
    }
  }
);

/**
 * Update Category
 */
export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.categories.update(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update category.'
      );
    }
  }
);

/**
 * Delete Category
 */
export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.categories.destroy(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete category.'
      );
    }
  }
);

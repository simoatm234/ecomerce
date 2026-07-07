import { createSlice } from '@reduxjs/toolkit';
import {
  allCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  showCategory,
} from '../thunkFunctions/CategorieThunk';

const initialState = {
  categories: [],
  category: null,

  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },

  loading: false,
  error: null,
  fetched: false,
};

export const CategoriesSlice = createSlice({
  name: 'categorie',
  initialState,

  reducers: {
    // Finds a category already loaded in `categories` and sets it as
    // the "current" category — used by UpdateCategoryForm to avoid an
    // extra API call when the list is already in Redux state.
    findCategoreyById: (state, action) => {
      state.category = state.categories.find((d) => d.id == action.payload);
    },

    resetCategory(state) {
      state.category = null;
    },

    resetCategories() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // GET ALL
      // ======================

      .addCase(allCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(allCategories.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload.data;

        state.categories = response.data ?? [];

        state.pagination = {
          current_page: response.current_page ?? 1,
          last_page: response.last_page ?? 1,
          per_page: response.per_page ?? 10,
          total: response.total ?? 0,
        };

        state.fetched = true;
      })

      .addCase(allCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // SHOW
      // ======================

      .addCase(showCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(showCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })

      .addCase(showCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // CREATE
      // ======================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.unshift(action.payload.data);

        if (state.pagination) {
          state.pagination.total += 1;
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // UPDATE
      // ======================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.data;

        const index = state.categories.findIndex(
          (category) => category.id === updated.id
        );

        if (index !== -1) {
          state.categories[index] = updated;
        }

        if (state.category?.id === updated.id) {
          state.category = updated;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // DELETE
      // ======================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.categories = state.categories.filter(
          (category) => category.id != deletedId
        );

        if (state.pagination.total > 0) {
          state.pagination.total--;
        }

        if (state.category?.id === deletedId) {
          state.category = null;
        }
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { findCategoreyById, resetCategory, resetCategories } =
  CategoriesSlice.actions;

export default CategoriesSlice.reducer;

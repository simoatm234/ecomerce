import { createSlice } from '@reduxjs/toolkit';
import {
  allProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../thunkFunctions/ProductThunk';

const initialState = {
  products: [],
  product: null,

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

export const ProductsSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    findProductById: (state, action) => {
      state.product = state.products.find((p) => p.id == action.payload);
    },

    resetProduct(state) {
      state.product = null;
    },

    resetProducts() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // GET ALL
      // ======================

      .addCase(allProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(allProducts.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload.data;

        state.products = response.data ?? [];

        state.pagination = {
          current_page: response.current_page ?? 1,
          last_page: response.last_page ?? 1,
          per_page: response.per_page ?? 10,
          total: response.total ?? 0,
        };

        state.fetched = true;
      })

      .addCase(allProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // SHOW
      // ======================

      .addCase(showProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(showProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })

      .addCase(showProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // CREATE
      // ======================

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products.unshift(action.payload.data);

        if (state.pagination) {
          state.pagination.total += 1;
        }
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // UPDATE
      // ======================

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.data;

        const index = state.products.findIndex(
          (product) => product.id === updated.id
        );

        if (index !== -1) {
          state.products[index] = updated;
        }

        if (state.product?.id === updated.id) {
          state.product = updated;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // DELETE
      // ======================

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.meta.arg;

        state.products = state.products.filter(
          (product) => product.id != deletedId
        );

        if (state.pagination.total > 0) {
          state.pagination.total--;
        }

        if (state.product?.id === deletedId) {
          state.product = null;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { findProductById, resetProduct, resetProducts } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  allUsers,
  deleteUser,
  showUser,
  updateUser,
} from '../thunkFunctions/userThunk';

const initialState = {
  users: [],
  user: null,

  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },

  isLoading: false,
  error: null,
  successMessage: null,
  fetched: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    // Finds a user already loaded in `users` and sets it as the
    // "current" user — avoids an extra API call when the list is
    // already in Redux state (same pattern as findCategoreyById).
    findUserById: (state, action) => {
      state.user = state.users.find((u) => u.id == action.payload);
    },

    resetUser(state) {
      state.user = null;
    },

    resetUsers() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      // ======================
      // GET ALL
      // ======================
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        const response = action.payload.data;

        state.users = response.data ?? [];

        state.pagination = {
          current_page: response.current_page ?? 1,
          last_page: response.last_page ?? 1,
          per_page: response.per_page ?? 10,
          total: response.total ?? 0,
        };

        state.fetched = true;
      })

      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ======================
      // SHOW
      // ======================
      .addCase(showUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(showUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })

      .addCase(showUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ======================
      // UPDATE
      // ======================
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const updated = action.payload.data;

        const index = state.users.findIndex((u) => u.id === updated.id);

        if (index !== -1) {
          state.users[index] = updated;
        }

        if (state.user?.id === updated.id) {
          state.user = updated;
        }

        state.successMessage = 'User updated successfully.';
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ======================
      // DELETE
      // ======================
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const deletedId = action.meta.arg;

        state.users = state.users.filter((u) => u.id != deletedId);

        if (state.pagination.total > 0) {
          state.pagination.total--;
        }

        if (state.user?.id === deletedId) {
          state.user = null;
        }
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearMessages,
  findUserById,
  resetUser,
  resetUsers,
} = usersSlice.actions;
export default usersSlice.reducer;

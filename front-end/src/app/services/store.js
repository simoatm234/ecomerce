import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/usersSlice';
import { CategoriesSlice } from './slices/CategoriesSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    categorie: CategoriesSlice.reducer,
  },
});

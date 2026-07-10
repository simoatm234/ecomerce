import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/usersSlice';
import { CategoriesSlice } from './slices/CategoriesSlice';
import {authSlice} from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    categorie: CategoriesSlice.reducer,
  },
});

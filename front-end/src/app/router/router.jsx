import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import AuthLayout from './AuthLayout';
import LoginForm from '../../pages/auth/LoginForm';
import RegisterForm from '../../pages/auth/RegisterForm';
import ForgotPasswordPage from '../../pages/auth/ForgotPasswordPage';
import GoogleCallback from '../../pages/auth/GoogleCallback';
import { ProtectedRoute } from './ProtectedRoute';
import DashboardAdmin from './../../pages/admin/DashboardAdmin';
import AdminLayOut from './AdminLayOut';
import UserLayOut from './UserLayOut';
import DashboardUser from './../../pages/user/DashboardUser';
import ResetPasswordPage from '../../pages/auth/ResetPasswordPage';
import Products from '../../pages/admin/Product/Products';
import CategoriesPage from '../../pages/admin/Categorie/CategoriesPage';
import CreateCategorie from '../../pages/admin/Categorie/CreateCategorie';
import UpdateCategories from '../../pages/admin/Categorie/UpdateCategories';
import ShowCategorie from '../../pages/admin/Categorie/ShowCategorie';
import AllUsers from '../../pages/admin/users/AllUsers';
import ShowUser from '../../pages/admin/users/ShowUser';
import UpdateUser from '../../pages/admin/users/UpdateUser';
import CreateUser from '../../pages/admin/users/CreateUser';
import CreateProduct from '../../pages/admin/Product/CreateProduct';

export const router = createBrowserRouter([
  // Root — redirect based on auth state
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginForm /> },
          { path: 'register', element: <RegisterForm /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
          { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
    ],
  },

  // Google OAuth callback — standalone, not guarded
  {
    path: '/auth/google/callback',
    element: <GoogleCallback />,
  },

  // Admin routes
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayOut />,
        children: [
          { path: 'dashboard', element: <DashboardAdmin /> },
          { path: 'products', element: <Products /> },
          { path: 'products/create', element: <CreateProduct /> },
          { path: 'categories', element: <CategoriesPage /> },
          { path: 'categories/create', element: <CreateCategorie /> },
          { path: 'categories/:id/edit', element: <UpdateCategories /> },
          { path: 'categories/:id/show', element: <ShowCategorie /> },
          { path: 'users', element: <AllUsers /> },
          { path: 'users/create', element: <CreateUser /> },
          { path: 'users/:id', element: <ShowUser /> },
          { path: 'users/:id/edit', element: <UpdateUser /> },
        ],
      },
    ],
  },

  // Customer routes
  {
    element: <ProtectedRoute allowedRoles={['customer']} />,
    children: [
      {
        path: '/user',
        element: <UserLayOut />,
        children: [{ path: 'dashboard', element: <DashboardUser /> }],
      },
    ],
  },
]);

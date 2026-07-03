import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayOut from './AdminLayOut';
import UserLayOut from './UserLayOut';
import AuthPage from '../../pages/auth/AuthPage';
import DashboardUser from '../../pages/user/DashboardUser';
import DashboardAdmin from '../../pages/admin/DashboardAdmin';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [{ index: true, element: <Navigate to="/auth" replace /> }],
  },
  {
    element: <PublicRoute />,
    children: [{ path: '/auth', element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayOut />,
        children: [{ path: 'dashboard', element: <DashboardAdmin /> }],
      },
    ],
  },
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

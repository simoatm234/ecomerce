import { createBrowserRouter } from 'react-router-dom';
import AdminLayOut from './AdminLayOut';
import UserLayOut from './UserLayOut';
import AuthPage from '../../pages/auth/AuthPage';
import DashboardUser from '../../pages/user/DashboardUser';
import DashboardAdmin from '../../pages/admin/DashboardAdmin';

export const router = createBrowserRouter([
  {
    path: '/admin/',
    element: <AdminLayOut />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardAdmin />,
      },
    ],
  },
  {
    path: '/user/',
    element: <UserLayOut />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardUser />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

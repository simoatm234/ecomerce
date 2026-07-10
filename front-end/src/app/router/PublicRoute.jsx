import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  const { isAuthenticated, role, isLoading } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <span className="text-sm text-[#494551]">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
        replace
      />
    );
  }

  return <Outlet />;
}

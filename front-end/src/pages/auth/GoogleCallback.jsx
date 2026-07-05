import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const role = searchParams.get('role');
    const error = searchParams.get('error');

    if (error) {
      navigate('/auth?error=google_failed');
      return;
    }

    if (token) {
      Cookies.set('token', token, { expires: 7, path: '/' });
      if (role) {
        Cookies.set('role', role, { expires: 7, path: '/' });
      }
      window.location.href =
        role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    } else {
      navigate('/auth?error=google_failed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
      <span className="text-sm text-[#494551]">Signing you in...</span>
    </div>
  );
}

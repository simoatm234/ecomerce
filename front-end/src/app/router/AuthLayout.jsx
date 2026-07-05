import { ShoppingBag, Headphones } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api } from '../lib/Api';

export default function AuthLayout() {
  const { error } = useSelector((state) => state.users);
  const location = useLocation();

  const isLoginOrRegister =
    location.pathname === '/auth' || location.pathname === '/auth/register';

  const tabClass = ({ isActive }) =>
    `flex-1 py-4 text-sm font-medium text-center transition-colors relative ${
      isActive
        ? 'text-[#14B8A6] border-b-2 border-[#14B8A6]'
        : 'text-[#494551] hover:text-[#14B8A6]'
    }`;

  const handleGoogleLogin = async () => {
    try {
      const response = await api.auth.googleAuth();
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#FAFAF9]">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#14B8A6]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F97066]/5 rounded-full blur-3xl" />

      <main className="w-full max-w-5xl flex flex-col md:flex-row bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-sm z-10">
        {/* Brand/Visual Side */}
        <div className="hidden md:flex md:w-1/2 bg-[#F2ECF4] relative overflow-hidden flex-col justify-between p-8">
          <div className="z-20">
            <h1 className="text-3xl font-medium text-[#4F378A] mb-4 leading-tight tracking-tight">
              Welcome to E-Commerce Pro
            </h1>
            <p className="text-base text-[#494551] max-w-sm leading-relaxed">
              Experience the future of professional retail with our curated
              collections and seamless shopping journey.
            </p>
          </div>

          <div className="relative z-10 w-full h-64 mt-8 rounded-lg overflow-hidden border border-[#CBC4D2]">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"
              alt="Minimalist living room with designer furniture and warm natural light"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="z-20 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#FDF7FF] bg-slate-200" />
                <div className="w-8 h-8 rounded-full border-2 border-[#FDF7FF] bg-slate-300" />
                <div className="w-8 h-8 rounded-full border-2 border-[#FDF7FF] bg-slate-400" />
              </div>
              <span className="text-sm text-[#494551]">
                Join 10k+ shopping enthusiasts
              </span>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white">
          <div className="md:hidden mb-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-[#14B8A6] rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#4F378A]">Pro Store</span>
          </div>

          {isLoginOrRegister && (
            <>
              {/* Tabs */}
              <div className="flex border-b border-[#CBC4D2] mb-8">
                <NavLink to="/auth" end className={tabClass}>
                  Login
                </NavLink>
                <NavLink to="/auth/register" className={tabClass}>
                  Register
                </NavLink>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Social Logins */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-[#CBC4D2] rounded-lg hover:bg-[#F8F2FA] transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-[#CBC4D2] rounded-lg hover:bg-[#F8F2FA] transition-colors text-sm font-medium">
                  <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#CBC4D2]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs text-[#494551] uppercase tracking-widest">
                    or
                  </span>
                </div>
              </div>
            </>
          )}

          {!isLoginOrRegister && error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Nested route content renders here */}
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-6 right-6 flex items-center gap-2 group cursor-pointer z-50">
        <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-[#CBC4D2] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <span className="text-sm text-[#1D1B20]">Need help?</span>
        </div>
        <div className="w-12 h-12 bg-[#4F378A] rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform">
          <Headphones className="w-5 h-5" />
        </div>
      </div>

      <footer className="fixed bottom-4 left-0 w-full text-center pointer-events-none">
        <span className="text-xs text-[#494551]/50">
          © 2024 E-Commerce Pro. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

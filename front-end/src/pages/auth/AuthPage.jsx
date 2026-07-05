import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ShoppingBag, Headphones } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../app/services/thunkFunctions/AuthThunk';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.mjs';
import { api } from '../../app/lib/Api';

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

// Register validation schema (matches Laravel backend)
const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z
    .string()
    .max(30, 'Phone must be less than 30 characters')
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .max(1000, 'Address must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.users);

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const {
    register: registerField,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    },
  });

  const onLoginSubmit = async (data) => {
    try {
      const result = await dispatch(
        login({
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      if (result.user.role == 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await api.auth.googleAuth();
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      const result = await dispatch(
        register({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone || null,
          address: data.address || null,
        })
      ).unwrap();

      const role = result?.user?.role?.toLowerCase();

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Switch tab and clear errors
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#FAFAF9]">
      {/* Background Decoration */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#14B8A6]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F97066]/5 rounded-full blur-3xl" />

      {/* Main Content */}
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

          {/* Image */}
          <div className="relative z-10 w-full h-64 mt-8 rounded-lg overflow-hidden border border-[#CBC4D2]">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"
              alt="Minimalist living room with designer furniture and warm natural light"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Avatars */}
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
          {/* Mobile Logo */}
          <div className="md:hidden mb-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-[#14B8A6] rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#4F378A]">Pro Store</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#CBC4D2] mb-8">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors relative ${
                activeTab === 'login'
                  ? 'text-[#14B8A6] border-b-2 border-[#14B8A6]'
                  : 'text-[#494551] hover:text-[#14B8A6]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchTab('register')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors relative ${
                activeTab === 'register'
                  ? 'text-[#14B8A6] border-b-2 border-[#14B8A6]'
                  : 'text-[#494551] hover:text-[#14B8A6]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Redux Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Social Logins */}
          <div className="space-y-3 mb-8">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-[#CBC4D2] rounded-lg hover:bg-[#F8F2FA] transition-colors text-sm font-medium"
              onClick={handleGoogleLogin}
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

          {/* Divider */}
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

          {/* Login Form */}
          {activeTab === 'login' && (
            <form
              className="space-y-4"
              onSubmit={handleLoginSubmit(onLoginSubmit)}
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Email Address
                </label>
                <input
                  type="email"
                  {...registerLogin('email')}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    loginErrors.email ? 'border-red-500' : 'border-[#CBC4D2]'
                  }`}
                />
                {loginErrors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#1D1B20]">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#14B8A6] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  {...registerLogin('password')}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    loginErrors.password ? 'border-red-500' : 'border-[#CBC4D2]'
                  }`}
                />
                {loginErrors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  {...registerLogin('remember')}
                  id="remember"
                  className="w-4 h-4 text-[#14B8A6] border-[#CBC4D2] rounded focus:ring-[#14B8A6]"
                />
                <label htmlFor="remember" className="text-sm text-[#494551]">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#14B8A6] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Login to Account'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form
              className="space-y-4"
              onSubmit={handleRegisterSubmit(onRegisterSubmit)}
            >
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Full Name
                </label>
                <input
                  type="text"
                  {...registerField('name')}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    registerErrors.name ? 'border-red-500' : 'border-[#CBC4D2]'
                  }`}
                />
                {registerErrors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerErrors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Email Address
                </label>
                <input
                  type="email"
                  {...registerField('email')}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    registerErrors.email ? 'border-red-500' : 'border-[#CBC4D2]'
                  }`}
                />
                {registerErrors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Password
                </label>
                <input
                  type="password"
                  {...registerField('password')}
                  placeholder="Min. 8 characters"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    registerErrors.password
                      ? 'border-red-500'
                      : 'border-[#CBC4D2]'
                  }`}
                />
                {registerErrors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Phone{' '}
                  <span className="text-[#494551] font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  {...registerField('phone')}
                  placeholder="+1 234 567 890"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
                    registerErrors.phone ? 'border-red-500' : 'border-[#CBC4D2]'
                  }`}
                />
                {registerErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerErrors.phone.message}
                  </p>
                )}
              </div>

              {/* Address (optional) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1D1B20]">
                  Address{' '}
                  <span className="text-[#494551] font-normal">(optional)</span>
                </label>
                <textarea
                  {...registerField('address')}
                  placeholder="Enter your address"
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base resize-none ${
                    registerErrors.address
                      ? 'border-red-500'
                      : 'border-[#CBC4D2]'
                  }`}
                />
                {registerErrors.address && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerErrors.address.message}
                  </p>
                )}
              </div>

              <p className="text-xs text-[#494551]">
                By signing up, you agree to our{' '}
                <a href="#" className="text-[#14B8A6] underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#14B8A6] underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#14B8A6] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Create Free Account'}
              </button>
            </form>
          )}

          {/* Footer Toggle */}
          <div className="mt-8 text-center">
            <p className="text-base text-[#494551]">
              {activeTab === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => switchTab('register')}
                    className="text-[#14B8A6] font-bold hover:underline"
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => switchTab('login')}
                    className="text-[#14B8A6] font-bold hover:underline"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 group cursor-pointer z-50">
        <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-[#CBC4D2] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <span className="text-sm text-[#1D1B20]">Need help?</span>
        </div>
        <div className="w-12 h-12 bg-[#4F378A] rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform">
          <Headphones className="w-5 h-5" />
        </div>
      </div>

      {/* Copyright */}
      <footer className="fixed bottom-4 left-0 w-full text-center pointer-events-none">
        <span className="text-xs text-[#494551]/50">
          © 2024 E-Commerce Pro. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

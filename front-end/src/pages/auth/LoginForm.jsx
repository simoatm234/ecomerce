import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../app/services/thunkFunctions/AuthThunk';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        login({ email: data.email, password: data.password })
      ).unwrap();

      const role = result?.user?.role?.toLowerCase();
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#1D1B20]">
          Email Address
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="name@company.com"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
            errors.email ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-[#1D1B20]">Password</label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-[#14B8A6] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          {...register('password')}
          placeholder="••••••••"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
            errors.password ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 py-1">
        <input
          type="checkbox"
          {...register('remember')}
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

      <div className="mt-8 text-center">
        <p className="text-base text-[#494551]">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-[#14B8A6] font-bold hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </form>
  );
}

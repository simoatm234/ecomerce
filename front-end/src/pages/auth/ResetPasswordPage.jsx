import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../../app/services/thunkFunctions/AuthThunk';
import { clearMessages } from '../../app/services/slices/usersSlice';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', password_confirmation: '' },
  });

 

  useEffect(() => {
    if (successMessage) {
      navigate('/auth', { state: { successMessage }, replace: true });
    }
  }, [successMessage]);

  const onSubmit = (data) => {
    dispatch(
      resetPassword({
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
    );
  };

  if (!token || !email) {
    return (
      <div className="text-center">
        <p className="text-sm text-red-600 mb-4">
          This reset link is invalid or incomplete.
        </p>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-[#14B8A6] hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-medium text-[#4F378A] mb-2">
        Reset your password
      </h1>
      <p className="text-sm text-[#494551] mb-6">
        Choose a new password for <strong>{email}</strong>.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#1D1B20]">
            New Password
          </label>
          <input
            type="password"
            {...register('password')}
            placeholder="Min. 8 characters"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
              errors.password ? 'border-red-500' : 'border-[#CBC4D2]'
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#1D1B20]">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('password_confirmation')}
            placeholder="Re-enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
              errors.password_confirmation
                ? 'border-red-500'
                : 'border-[#CBC4D2]'
            }`}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#14B8A6] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/auth" className="text-sm text-[#14B8A6] hover:underline">
          Back to login
        </Link>
      </div>
    </>
  );
}

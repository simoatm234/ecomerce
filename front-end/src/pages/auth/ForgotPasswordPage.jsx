import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearMessages } from '../../app/services/slices/usersSlice';
import { forgotPasswordThunk } from '../../app/services/thunkFunctions/AuthThunk';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, successMessage } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

 

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => navigate('/auth'), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = (data) => {
    dispatch(forgotPasswordThunk(data.email));
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-[#4F378A] mb-2">
        Forgot your password?
      </h1>
      <p className="text-sm text-[#494551] mb-6">
        Enter your email and we'll send you a link to reset it.
      </p>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {successMessage} Redirecting to login...
        </div>
      )}

      {!successMessage && (
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
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#14B8A6] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link to="/auth" className="text-sm text-[#14B8A6] hover:underline">
          Back to login
        </Link>
      </div>
    </>
  );
}

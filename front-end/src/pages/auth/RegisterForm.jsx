import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.mjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser } from '../../app/services/thunkFunctions/AuthThunk';

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

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone || null,
          address: data.address || null,
        })
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
        <label className="text-sm font-medium text-[#1D1B20]">Full Name</label>
        <input
          type="text"
          {...register('name')}
          placeholder="John Doe"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
            errors.name ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

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
        <label className="text-sm font-medium text-[#1D1B20]">Password</label>
        <input
          type="password"
          {...register('password')}
          placeholder="Min. 8 characters"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
            errors.password ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#1D1B20]">
          Phone <span className="text-[#494551] font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="+1 234 567 890"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base ${
            errors.phone ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#1D1B20]">
          Address <span className="text-[#494551] font-normal">(optional)</span>
        </label>
        <textarea
          {...register('address')}
          placeholder="Enter your address"
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all text-base resize-none ${
            errors.address ? 'border-red-500' : 'border-[#CBC4D2]'
          }`}
        />
        {errors.address && (
          <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
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

      <div className="mt-8 text-center">
        <p className="text-base text-[#494551]">
          Already have an account?{' '}
          <Link to="/auth" className="text-[#14B8A6] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}

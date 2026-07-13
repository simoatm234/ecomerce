// src/Components/admin/users/CreateUserForm.jsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../../app/services/thunkFunctions/userThunk';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(255, 'Name may not exceed 255 characters.'),

  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.')
    .max(255),

  password: z.string().min(8, 'Password must be at least 8 characters.'),

  role: z.enum(['customer', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid role.' }),
  }),

  phone: z.string().max(30).optional().or(z.literal('')),

  address: z.string().max(1000).optional().or(z.literal('')),
});

export default function CreateUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertError, setAlertError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (values) => {
    setAlertError(null);

    try {
      await dispatch(
        createUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          phone: values.phone || null,
          address: values.address || null,
        })
      ).unwrap();

      navigate('/admin/users');
    } catch (error) {
      console.error(error);

      const message =
        error?.message ||
        error?.error ||
        'Failed to create user. Please check your input and try again.';

      setAlertError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-[#cbc4d2] p-8 space-y-8"
    >
      {/* Error Alert */}
      {alertError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-700 rounded-lg p-4">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />

          <p className="flex-1 text-sm">{alertError}</p>

          <button
            type="button"
            onClick={() => setAlertError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block mb-2 font-medium">Full Name</label>

        <input
          {...register('name')}
          className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 font-medium">Email Address</label>

        <input
          type="email"
          {...register('email')}
          className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 font-medium">Password</label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 pr-12 focus:border-[#6750A4] outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#494551]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
      </div>

      {/* Role */}
      <div>
        <label className="block mb-2 font-medium">Role</label>

        <select
          {...register('role')}
          className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none bg-white"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-2 font-medium">Phone Number</label>

        <input
          {...register('phone')}
          className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
      </div>

      {/* Address */}
      <div>
        <label className="block mb-2 font-medium">Address</label>

        <textarea
          rows={4}
          {...register('address')}
          className="w-full rounded-lg border border-[#cbc4d2] p-4 focus:border-[#6750A4] outline-none resize-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          to={'/admin/users'}
          className="px-5 py-3 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7]"
        >
          <X size={18} />
        </Link>

        <button
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a]"
        >
          <Save size={18} />
          Create User
        </button>
      </div>
    </form>
  );
}

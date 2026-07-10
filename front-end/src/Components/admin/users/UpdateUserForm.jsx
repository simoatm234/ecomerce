import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { findUserById } from '../../../app/services/slices/usersSlice';
import {
  showUser,
  updateUser,
} from '../../../app/services/thunkFunctions/userThunk';

const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must contain at least 3 characters.').max(255),

  email: z.string().email('Please enter a valid email address.'),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .optional()
    .or(z.literal('')),

  role: z.enum(['customer', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid role.' }),
  }),

  phone: z.string().max(30, 'Phone must not exceed 30 characters').optional(),

  address: z
    .string()
    .max(1000, 'Address must not exceed 1000 characters')
    .optional(),
});

export default function UpdateUserForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(true);
  const [alertError, setAlertError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
      phone: '',
      address: '',
    },
  });

  const populateForm = (u) => {
    reset({
      name: u.name || '',
      email: u.email || '',
      password: '',
      role: u.role || 'customer',
      phone: u.phone || '',
      address: u.address || '',
    });
  };

  useEffect(() => {
    const existsInList = users.some((u) => u.id == id);

    if (existsInList) {
      dispatch(findUserById(id));
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      setLoading(true);

      try {
        await dispatch(showUser(id)).unwrap();
      } catch (error) {
        console.error(error);
        setAlertError(
          error?.message || 'Failed to load user. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, users, dispatch]);

  useEffect(() => {
    if (user) {
      populateForm(user);
    }
  }, [user]);

  const onSubmit = async (values) => {
    setAlertError(null);

    try {
      const formData = {
        name: values.name,
        role: values.role,
        phone: values.phone,
        address: values.address,
      };

      if (!user?.google_id) {
        formData.email = values.email;
      }

      if (!user?.google_id && values.password?.trim()) {
        formData.password = values.password;
      }

      if (values.password?.trim()) {
        formData.password = values.password;
      }
      if (!user?.google_id && values.password?.trim()) {
        formData.password = values.password;
      }

      await dispatch(
        updateUser({
          id,
          formData,
        })
      ).unwrap();

      navigate('/admin/users');
    } catch (error) {
      console.error(error);

      const message =
        error?.message ||
        error?.error ||
        'Failed to update user. Please check your input and try again.';

      setAlertError(message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
        Loading user...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-[#cbc4d2] p-8 space-y-6"
    >
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

      <div>
        <label className="block mb-2 font-medium">Email Address</label>

        <input
          type="email"
          {...register('email')}
          disabled={!!user?.google_id}
          className={`w-full h-12 rounded-lg border px-4 outline-none ${
            user?.google_id
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
              : 'border-[#cbc4d2] focus:border-[#6750A4]'
          }`}
        />

        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

        {user?.google_id && (
          <p className="text-sm text-blue-600 mt-1">
            Email is managed by Google and cannot be changed.
          </p>
        )}
      </div>

      {!user?.google_id && (
        <div>
          <label className="block mb-2 font-medium">
            New Password (Optional)
          </label>

          <input
            type="password"
            {...register('password')}
            placeholder="Leave blank to keep current password"
            className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>
      )}

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
        <label className="block mb-2 font-medium">Phone</label>

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
          className="w-full rounded-lg border border-[#cbc4d2] px-4 py-3 focus:border-[#6750A4] outline-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          to="/admin/users"
          className="px-5 py-3 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7]"
        >
          <X size={18} />
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] disabled:opacity-50"
        >
          <Save size={18} />
          {isSubmitting ? 'Updating...' : 'Update User'}
        </button>
      </div>
    </form>
  );
}

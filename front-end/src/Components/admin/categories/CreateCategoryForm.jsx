import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Save, X } from 'lucide-react';

import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../app/services/thunkFunctions/CategorieThunk';
import { Link, useNavigate } from 'react-router-dom';

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Category name must contain at least 3 characters.')
    .max(255),

  description: z.string().max(1000).optional(),

  is_active: z.boolean(),

  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Category image is required.',
    })
    .refine(
      (file) => file?.size <= 2 * 1024 * 1024,
      'Image must be less than 2MB.'
    )
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          file?.type
        ),
      'Only JPG, PNG and WEBP are allowed.'
    ),
});
export default function CreateCategoryForm() {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
      image: null,
    },
  });

  const image = watch('image');

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue('image', file, {
      shouldValidate: true,
    });

    setPreview(URL.createObjectURL(file));
  };
const onSubmit = async (values) => {
  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('description', values.description || '');
  formData.append('is_active', values.is_active ? 1 : 0);
  formData.append('image', values.image);

  try {
    await dispatch(createCategory(formData)).unwrap();

    navigate('/admin/categories');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-[#cbc4d2] p-8 space-y-8"
    >
      {/* Name */}
      <div>
        <label className="block mb-2 font-medium">Category Name</label>

        <input
          {...register('name')}
          className="w-full h-12 rounded-lg border border-[#cbc4d2] px-4 focus:border-[#6750A4] outline-none"
        />

        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows={5}
          {...register('description')}
          className="w-full rounded-lg border border-[#cbc4d2] p-4 focus:border-[#6750A4] outline-none resize-none"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>

      {/* Image */}
      <div>
        <label className="block mb-3 font-medium">Category Image</label>

        <label className="border-2 border-dashed border-[#cbc4d2] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#6750A4] transition">
          {preview ? (
            <img src={preview} className="w-52 h-52 object-cover rounded-xl" />
          ) : (
            <>
              <Upload size={42} className="text-[#6750A4]" />

              <p className="mt-3 text-[#494551]">Click to upload image</p>
            </>
          )}

          <input hidden type="file" accept="image/*" onChange={handleImage} />
        </label>

        <p className="text-red-500 text-sm mt-2">{errors.image?.message}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register('is_active')}
          className="w-5 h-5 accent-[#6750A4]"
        />

        <label>Active category</label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          to={'/admin/categories'}
          className="px-5 py-3 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7]"
        >
          <X size={18} />
        </Link>

        <button
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a]"
        >
          <Save size={18} />
          Create Category
        </button>
      </div>
    </form>
  );
}

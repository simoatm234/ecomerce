import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Save, X, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  showCategory,
  updateCategory,
} from '../../../app/services/thunkFunctions/CategorieThunk';
import { findCategoreyById } from '../../../app/services/slices/CategoriesSlice';
import ShowImage from '../../ShowImage';
// ^ adjust paths to match your actual file locations

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, 'Category name must contain at least 3 characters.')
    .max(255),

  description: z.string().max(1000).optional(),

  is_active: z.boolean(),

  image: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: 'Invalid file.',
    })
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      'Image must be less than 2MB.'
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          file.type
        ),
      'Only JPG, PNG and WEBP are allowed.'
    ),
});

export default function UpdateCategoryForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, category } = useSelector((state) => state.categorie);

  // Local blob preview — only set when the user picks a NEW file
  const [localPreview, setLocalPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertError, setAlertError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
      image: null,
    },
  });

  const populateForm = (cat) => {
    reset({
      name: cat.name,
      description: cat.description || '',
      is_active: !!cat.is_active,
      image: null,
    });
  };

  useEffect(() => {
    const existsInList = categories.some((c) => c.id == id);

    if (existsInList) {
      dispatch(findCategoreyById(id));
      setLoading(false);
      return;
    }

    const loadCategory = async () => {
      setLoading(true);

      try {
        await dispatch(showCategory(id)).unwrap();
      } catch (error) {
        console.error(error);
        setAlertError(
          error?.message || 'Failed to load category. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, categories]);

  useEffect(() => {
    if (category) {
      populateForm(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue('image', file, {
      shouldValidate: true,
    });

    // Local blob URL for instant preview of the newly picked file
    setLocalPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values) => {
    setAlertError(null);

    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description || '');
    formData.append('is_active', values.is_active ? 1 : 0);

    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    formData.append('_method', 'PUT');

    try {
      await dispatch(updateCategory({ id, formData })).unwrap();

      navigate('/admin/categories');
    } catch (error) {
      console.error(error);

      const message =
        error?.message ||
        error?.error ||
        'Failed to update category. Please check your input and try again.';

      setAlertError(message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
        Loading category...
      </div>
    );
  }

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
          {localPreview ? (
            // User just picked a new file — show it via local blob URL
            <img
              src={localPreview}
              className="w-52 h-52 object-cover rounded-xl"
              alt="New preview"
            />
          ) : category?.image_path ? (
            // No new file picked — show the existing saved image via ShowImage
            <ShowImage
              url={category.image_path}
              alt={category.name}
              className="w-52 h-52"
            />
          ) : (
            <>
              <Upload size={42} className="text-[#6750A4]" />
              <p className="mt-3 text-[#494551]">Click to upload image</p>
            </>
          )}

          <input hidden type="file" accept="image/*" onChange={handleImage} />
        </label>

        <p className="text-red-500 text-sm mt-2">{errors.image?.message}</p>
        <p className="text-[#494551] text-xs mt-1">
          Leave empty to keep the current image.
        </p>
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
          Update Category
        </button>
      </div>
    </form>
  );
}

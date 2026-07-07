import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, AlertCircle } from 'lucide-react';

import { showCategory } from '../../../app/services/thunkFunctions/CategorieThunk';
import { findCategoreyById } from '../../../app/services/slices/CategoriesSlice';
import ShowImage from '../../../Components/ShowImage';

export default function ShowCategorie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, category } = useSelector((state) => state.categorie);

  const [loading, setLoading] = useState(true);
  const [alertError, setAlertError] = useState(null);

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

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
          Loading category...
        </div>
      </div>
    );
  }

  if (alertError) {
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-700 rounded-lg p-4">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="flex-1 text-sm">{alertError}</p>
        </div>

        <Link
          to="/admin/categories"
          className="inline-flex items-center gap-2 mt-4 text-[#6750A4] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to categories
        </Link>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
          Category not found.
        </div>

        <Link
          to="/admin/categories"
          className="inline-flex items-center gap-2 mt-4 text-[#6750A4] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-2 text-sm text-[#6750A4] hover:underline mb-2"
          >
            <ArrowLeft size={16} />
            Back to categories
          </Link>

          <h1 className="text-3xl font-bold text-[#4f378a]">{category.name}</h1>

          <p className="text-[#494551] mt-1">Category details</p>
        </div>

        <button
          onClick={() => navigate(`/admin/categories/${category.id}/edit`)}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition"
        >
          <Pencil size={18} />
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 space-y-8">
        {/* Image */}
        <div>
          <label className="block mb-3 font-medium text-[#494551]">
            Category Image
          </label>

          <ShowImage
            url={category.image_path}
            alt={category.name}
            className="w-52 h-52"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-[#494551]">
            Category Name
          </label>
          <p className="text-lg text-[#1a1a1a]">{category.name}</p>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-[#494551]">
            Description
          </label>
          <p className="text-[#1a1a1a] whitespace-pre-wrap">
            {category.description || (
              <span className="text-[#494551] italic">
                No description provided.
              </span>
            )}
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium text-[#494551]">
            Status
          </label>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              category.is_active
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {category.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#cbc4d2]">
          <div>
            <label className="block mb-1 text-sm font-medium text-[#494551]">
              Created At
            </label>
            <p className="text-sm text-[#1a1a1a]">
              {category.created_at
                ? new Date(category.created_at).toLocaleString()
                : '—'}
            </p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#494551]">
              Last Updated
            </label>
            <p className="text-sm text-[#1a1a1a]">
              {category.updated_at
                ? new Date(category.updated_at).toLocaleString()
                : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

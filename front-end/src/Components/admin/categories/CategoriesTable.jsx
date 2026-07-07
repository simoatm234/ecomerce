// src/components/admin/categories/CategoriesTable.jsx

import { Eye, Pencil, Trash2 } from 'lucide-react';
import ShowImage from '../../ShowImage';

export default function CategoriesTable({
  categories = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  const badgeStyle = (status) => {
    return status
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-[#6750A4] font-medium">
        Loading categories...
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="p-10 text-center text-[#494551]">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#f3edf7] border-y border-[#cbc4d2]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Description
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Products
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-[#ebe6ef] hover:bg-[#faf7fc] transition"
            >
              {/* Category */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <ShowImage
                    url={category.image_path}
                    alt={category.name}
                    className="w-14 h-14 shrink-0"
                  />

                  <div>
                    <h3 className="font-semibold text-[#1d1b20]">
                      {category.name}
                    </h3>

                    <p className="text-sm text-[#6b7280]">
                      CAT-{String(category.id).padStart(3, '0')}
                    </p>
                  </div>
                </div>
              </td>

              {/* Description */}
              <td className="px-6 py-4">
                <p className="max-w-sm text-sm text-[#494551]">
                  {category.description || '-'}
                </p>
              </td>

              {/* Products */}
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center min-w-[60px] rounded-full bg-[#e9ddff] px-3 py-1 text-sm font-semibold text-[#4f378a]">
                  {category.products_count}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle(
                    category.is_active
                  )}`}
                >
                  {category.is_active ? 'Active' : 'Hidden'}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView?.(category)}
                    className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                  >
                    <Eye size={18} className="text-[#6750A4]" />
                  </button>

                  <button
                    onClick={() => onEdit?.(category)}
                    className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                  >
                    <Pencil size={18} className="text-[#6750A4]" />
                  </button>

                  <button
                    onClick={() => onDelete?.(category)}
                    className="p-2 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

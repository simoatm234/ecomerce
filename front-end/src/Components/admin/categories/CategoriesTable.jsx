// src/components/admin/categories/CategoriesTable.jsx

import { Eye, Pencil, Trash2 } from 'lucide-react';

const categories = [
  {
    id: 1,
    image: 'https://placehold.co/60x60/E9DDFF/4F378A?text=E',
    name: 'Electronics',
    description: 'Phones, laptops, accessories and gadgets.',
    products: 326,
    status: 'Active',
  },
  {
    id: 2,
    image: 'https://placehold.co/60x60/E9DDFF/4F378A?text=F',
    name: 'Fashion',
    description: 'Clothing, shoes and accessories.',
    products: 218,
    status: 'Active',
  },
  {
    id: 3,
    image: 'https://placehold.co/60x60/E9DDFF/4F378A?text=H',
    name: 'Home & Living',
    description: 'Furniture and home decoration.',
    products: 154,
    status: 'Hidden',
  },
  {
    id: 4,
    image: 'https://placehold.co/60x60/E9DDFF/4F378A?text=S',
    name: 'Sports',
    description: 'Fitness and outdoor products.',
    products: 97,
    status: 'Active',
  },
];

export default function CategoriesTable() {
  const badgeStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';

      case 'Hidden':
        return 'bg-yellow-100 text-yellow-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#cbc4d2]"
                  />

                  <div>
                    <h3 className="font-semibold text-[#1d1b20]">
                      {category.name}
                    </h3>

                    <p className="text-sm text-[#6b7280]">
                      CAT-{category.id.toString().padStart(3, '0')}
                    </p>
                  </div>
                </div>
              </td>

              {/* Description */}
              <td className="px-6 py-4">
                <p className="max-w-sm text-sm text-[#494551]">
                  {category.description}
                </p>
              </td>

              {/* Products */}
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center min-w-[60px] rounded-full bg-[#e9ddff] px-3 py-1 text-sm font-semibold text-[#4f378a]">
                  {category.products}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle(
                    category.status
                  )}`}
                >
                  {category.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-[#f3edf7] transition">
                    <Eye size={18} className="text-[#6750A4]" />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-[#f3edf7] transition">
                    <Pencil size={18} className="text-[#6750A4]" />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-red-50 transition">
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

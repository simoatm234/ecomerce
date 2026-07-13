// src/components/admin/products/ProductsTable.jsx

import { Pencil, Trash2, Eye } from 'lucide-react';
import ShowImage from '../../ShowImage';

export default function ProductsTable({
  products = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  const getStatus = (product) => {
    if (!product.is_active) return 'Hidden';
    if (product.stock === 0) return 'Out of Stock';
    if (product.stock <= 10) return 'Low Stock';
    return 'Active';
  };

  const statusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';

      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700';

      case 'Out of Stock':
        return 'bg-red-100 text-red-700';

      case 'Hidden':
        return 'bg-gray-100 text-gray-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? '-' : `$${num.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-[#6750A4] font-medium">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="p-10 text-center text-[#494551]">No products found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#f3edf7] border-b border-[#cbc4d2]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Stock
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const status = getStatus(product);

            return (
              <tr
                key={product.id}
                className="border-b border-[#ebe6ef] hover:bg-[#faf7fc] transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <ShowImage
                      url={product.image}
                      alt={product.name}
                      className="w-14 h-14 shrink-0"
                    />

                    <div>
                      <h3 className="font-semibold text-[#1d1b20]">
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#6b6b6b]">
                        PRD-{String(product.id).padStart(3, '0')}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#494551]">
                  {product.category?.name || '-'}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {formatPrice(product.price)}
                </td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView?.(product)}
                      className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                    >
                      <Eye size={18} className="text-[#6750A4]" />
                    </button>

                    <button
                      onClick={() => onEdit?.(product)}
                      className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                    >
                      <Pencil size={18} className="text-[#6750A4]" />
                    </button>

                    <button
                      onClick={() => onDelete?.(product)}
                      className="p-2 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

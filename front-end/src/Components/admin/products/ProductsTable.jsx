// src/components/admin/products/ProductsTable.jsx

import { Pencil, Trash2, Eye } from 'lucide-react';

const products = [
  {
    id: 1,
    image: 'https://placehold.co/60x60',
    name: 'MacBook Pro M3',
    category: 'Laptop',
    price: '$2,199',
    stock: 15,
    status: 'Active',
  },
  {
    id: 2,
    image: 'https://placehold.co/60x60',
    name: 'iPhone 16 Pro',
    category: 'Phone',
    price: '$1,299',
    stock: 8,
    status: 'Low Stock',
  },
  {
    id: 3,
    image: 'https://placehold.co/60x60',
    name: 'AirPods Pro',
    category: 'Accessories',
    price: '$249',
    stock: 0,
    status: 'Out of Stock',
  },
  {
    id: 4,
    image: 'https://placehold.co/60x60',
    name: 'Gaming Mouse',
    category: 'Gaming',
    price: '$79',
    stock: 25,
    status: 'Active',
  },
];

export default function ProductsTable() {
  const statusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';

      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700';

      case 'Out of Stock':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#cbc4d2] overflow-hidden shadow-sm">
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#ebe6ef] hover:bg-[#faf7fc] transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <div>
                      <h3 className="font-semibold text-[#1d1b20]">
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#6b6b6b]">ID #{product.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#494551]">{product.category}</td>

                <td className="px-6 py-4 font-semibold">{product.price}</td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>

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
    </div>
  );
}

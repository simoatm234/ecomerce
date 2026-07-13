// src/components/admin/products/ProductToolbar.jsx

import { useSelector } from 'react-redux';
import { Search, Plus } from 'lucide-react';

export default function ProductToolbar({
  onSearch,
  onStatusChange,
  onCategoryChange,
  onAddProduct,
}) {
  const { categories } = useSelector((state) => state.categorie);

  return (
    <div className="bg-white border-b border-[#cbc4d2] p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#494551]"
            />

            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4] transition"
            />
          </div>

          {/* Category */}
          <select
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]"
            defaultValue=""
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]"
            defaultValue=""
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Hidden</option>
          </select>
        </div>

        {/* Right */}
        <button
          onClick={onAddProduct}
          className="flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>
    </div>
  );
}

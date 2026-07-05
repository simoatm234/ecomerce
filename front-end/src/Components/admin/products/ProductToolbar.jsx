// src/components/admin/products/ProductToolbar.jsx

import { Search, Plus, Filter } from 'lucide-react';

export default function ProductToolbar() {
  return (
    <div className="bg-white border border-[#cbc4d2] rounded-xl p-5 mb-6">
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
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4] transition"
            />
          </div>

          {/* Category */}
          <select className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
            <option>Sports</option>
          </select>

          {/* Status */}
          <select className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]">
            <option>All Status</option>
            <option>Active</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 h-11 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
            <Filter size={18} />
            Filter
          </button>

          <button className="flex items-center gap-2 px-5 h-11 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

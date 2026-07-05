// src/components/admin/categories/CategoryToolbar.jsx

import { Search, Plus, Filter } from 'lucide-react';

export default function CategoryToolbar() {
  return (
    <div className="bg-white border-b border-[#cbc4d2] p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#494551]"
            />

            <input
              type="text"
              placeholder="Search categories..."
              className="w-full h-11 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] pl-11 pr-4 outline-none focus:border-[#6750A4] transition"
            />
          </div>

          {/* Status */}
          <select className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]">
            <option>All Status</option>
            <option>Active</option>
            <option>Hidden</option>
          </select>

          {/* Sort */}
          <select className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]">
            <option>Sort by</option>
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
            <option>Products ↑</option>
            <option>Products ↓</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 h-11 px-4 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
            <Filter size={18} />
            Filter
          </button>

          <button className="flex items-center gap-2 h-11 px-5 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition">
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}

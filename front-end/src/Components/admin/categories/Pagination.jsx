// src/components/admin/categories/Pagination.jsx

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#cbc4d2] bg-white">
      {/* Info */}
      <p className="text-sm text-[#494551]">
        Showing <span className="font-semibold">1</span> to{' '}
        <span className="font-semibold">10</span> of{' '}
        <span className="font-semibold">24</span> categories
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
          <ChevronLeft size={18} />
        </button>

        <button className="w-10 h-10 rounded-lg bg-[#6750A4] text-white font-semibold">
          1
        </button>

        <button className="w-10 h-10 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
          2
        </button>

        <button className="w-10 h-10 rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
          3
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

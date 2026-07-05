// src/components/admin/categories/Pagination.jsx

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const { current_page, last_page, per_page, total } = pagination;

  const start = (current_page - 1) * per_page + 1;
  const end = Math.min(current_page * per_page, total);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#cbc4d2] bg-white">
      {/* Info */}
      <p className="text-sm text-[#494551]">
        Showing <span className="font-semibold">{start}</span> to{' '}
        <span className="font-semibold">{end}</span> of{' '}
        <span className="font-semibold">{total}</span> categories
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          disabled={current_page === 1}
          onClick={() => onPageChange(current_page - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              current_page === page
                ? 'bg-[#6750A4] text-white'
                : 'border border-[#cbc4d2] hover:bg-[#f3edf7]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={current_page === last_page}
          onClick={() => onPageChange(current_page + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

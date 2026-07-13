// src/components/admin/products/Pagination.jsx

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  const {
    current_page: currentPage = 1,
    last_page: lastPage = 1,
    per_page: perPage = 10,
    total = 0,
  } = pagination || {};

  const startItem = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    onPageChange?.(page);
  };

  // Build a compact page list: first, last, current ± 1, with "..." gaps
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 ||
        i === lastPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#cbc4d2] bg-white">
      {/* Left */}
      <p className="text-sm text-[#494551]">
        Showing <span className="font-semibold">{startItem}</span> to{' '}
        <span className="font-semibold">{endItem}</span> of{' '}
        <span className="font-semibold">{total}</span> products
      </p>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-[#494551]">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${
                page === currentPage
                  ? 'bg-[#6750A4] text-white'
                  : 'border border-[#cbc4d2] hover:bg-[#f3edf7]'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#cbc4d2] hover:bg-[#f3edf7] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

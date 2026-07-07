import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryStats from '../../../Components/admin/categories/CategoryStats';
import CategoryToolbar from '../../../Components/admin/categories/CategoryToolbar';
import CategoriesTable from '../../../Components/admin/categories/CategoriesTable';
import Pagination from '../../../Components/admin/categories/Pagination';

import {
  allCategories,
  deleteCategory,
} from '../../../app/services/thunkFunctions/CategorieThunk';
import { useNavigate } from 'react-router-dom';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error, pagination, fetched } = useSelector(
    (state) => state.categorie
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', '1', '0'
  const [page, setPage] = useState(1);

  // ================= Fetch Categories =================
  useEffect(() => {
    if (!fetched) {
      dispatch(
        allCategories({
          page: 1,
          per_page: 10,
        })
      );
    }
  }, [fetched]);

  // ================= Derived Filtered List =================
  // Recomputes automatically whenever categories, searchTerm, OR statusFilter change.
  // No manual syncing, no stale snapshots.
  const filteredCategories = useMemo(() => {
    let result = categories;

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      result = result.filter(
        (category) =>
          category.name.toLowerCase().includes(keyword) ||
          category.description?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== '') {
      const isActive = statusFilter === '1';

      result = result.filter((category) => category.is_active === isActive);
    }

    return result;
  }, [categories, searchTerm, statusFilter]);

  // ================= Search =================
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // ================= Status Filter =================
  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  // ================= Actions =================
  const handleAddCategory = () => {
    navigate('/admin/categories/create');
  };

  const handleView = (category) => {
   navigate(`/admin/categories/${category.id}/show`);
  };

  const handleEdit = (category) => {
    navigate(`/admin/categories/${category.id}/edit`);
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteCategory(category.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <CategoryStats categories={categories} />

      <div className="bg-white rounded-xl border border-[#cbc4d2] shadow-sm overflow-hidden">
        <CategoryToolbar
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onAddCategory={handleAddCategory}
        />

        <CategoriesTable
          categories={filteredCategories}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

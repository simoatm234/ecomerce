// src/pages/admin/CategoriesPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryStats from '../../../Components/admin/categories/CategoryStats';
import CategoryToolbar from '../../../Components/admin/categories/CategoryToolbar';
import CategoriesTable from '../../../Components/admin/categories/CategoriesTable';
import Pagination from '../../../Components/admin/categories/Pagination';

import { allCategories, deleteCategory } from '../../../app/services/thunkFunctions/CategorieThunk';
import { useNavigate } from 'react-router-dom';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error, pagination, fetched } = useSelector(
    (state) => state.categorie
  );

  const [filteredCategories, setFilteredCategories] = useState([]);
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

  // ================= Sync Local State =================
  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  // ================= Search =================
  const handleSearch = (value) => {
    if (!value.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const keyword = value.toLowerCase();

    const result = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(keyword) ||
        category.description?.toLowerCase().includes(keyword)
    );

    setFilteredCategories(result);
  };

  // ================= Status Filter =================
  const handleStatusChange = (status) => {
    if (status === '') {
      setFilteredCategories(categories);
      return;
    }

    const isActive = status === '1';

    const result = categories.filter(
      (category) => category.is_active === isActive
    );

    setFilteredCategories(result);
  };

  // ================= Actions =================
  const handleAddCategory = () => {
    navigate('/admin/categories/create');
  };

  const handleView = (category) => {
    console.log('View', category);
  };

  const handleEdit = (category) => {
    console.log('Edit', category);
  };

 const handleDelete = async (category) => {
   const confirmed = window.confirm(
     `Are you sure you want to delete "${category.name}"?`
   );

   if (!confirmed) return;

   try {
     await dispatch(deleteCategory(category.id)).unwrap();
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

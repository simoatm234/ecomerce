import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProductStats from '../../../Components/admin/products/ProductStats';
import ProductToolbar from '../../../Components/admin/products/ProductToolbar';
import ProductsTable from '../../../Components/admin/products/ProductsTable';
import Pagination from '../../../Components/admin/categories/Pagination';
// ^ reusing the same generic Pagination component

import {
  allProducts,
  deleteProduct,
} from '../../../app/services/thunkFunctions/ProductThunk';

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error, pagination, fetched } = useSelector(
    (state) => state.product
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', '1', '0'
  const [categoryFilter, setCategoryFilter] = useState(''); // '', category id
  const [page, setPage] = useState(1);

  // ================= Fetch Products =================
  useEffect(() => {
    if (!fetched) {
      const load = async () => {
        try {
          await dispatch(
            allProducts({
              page: 1,
              per_page: 10,
            })
          ).unwrap();
        } catch (error) {
          console.error('Failed to load products:', error);
        }
      };

      load();
    }
  }, [fetched]);

  // ================= Derived Filtered List =================
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(keyword) ||
          product.description?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== '') {
      const isActive = statusFilter === '1';

      result = result.filter((product) => product.is_active === isActive);
    }

    if (categoryFilter !== '') {
      result = result.filter(
        (product) => String(product.category_id) === String(categoryFilter)
      );
    }

    return result;
  }, [products, searchTerm, statusFilter, categoryFilter]);

  // ================= Handlers =================
  const handleSearch = (value) => setSearchTerm(value);
  const handleStatusChange = (value) => setStatusFilter(value);
  const handleCategoryChange = (value) => setCategoryFilter(value);

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  const handleView = (product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteProduct(product.id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <ProductStats products={products} />

      <div className="bg-white rounded-xl border border-[#cbc4d2] overflow-hidden shadow-sm">
        <ProductToolbar
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
          onAddProduct={handleAddProduct}
        />

        <ProductsTable
          products={filteredProducts}
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

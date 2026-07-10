import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserStats from '../../../Components/admin/users/UserStats';
import UserToolbar from '../../../Components/admin/users/UserToolbar';
import UsersTable from '../../../Components/admin/users/UsersTable';
import Pagination from '../../../Components/admin/categories/Pagination';
// ^ reusing the same generic Pagination component from categories

import {
  allUsers,
  deleteUser,
} from '../../../app/services/thunkFunctions/userThunk';

export default function AllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, error, pagination, fetched } = useSelector(
    (state) => state.users
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', '1', '0'
  const [roleFilter, setRoleFilter] = useState(''); // '', 'admin', 'customer'
  const [page, setPage] = useState(1);

  // ================= Fetch Users =================
  useEffect(() => {
    if (!fetched) {
      const load = async () => {
        try {
          await dispatch(
            allUsers({
              page: 1,
              per_page: 10,
            })
          ).unwrap();
        } catch (error) {
          console.error('Failed to load users:', error);
        }
      };

      load();
    }
  }, [fetched]);

  // ================= Derived Filtered List =================
  const filteredUsers = useMemo(() => {
    let result = users;

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== '') {
      const isActive = statusFilter === '1';

      result = result.filter((user) => user.is_active === isActive);
    }

    if (roleFilter !== '') {
      result = result.filter((user) => user.role === roleFilter);
    }

    return result;
  }, [users, searchTerm, statusFilter, roleFilter]);

  // ================= Search =================
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // ================= Status Filter =================
  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  // ================= Role Filter =================
  const handleRoleChange = (role) => {
    setRoleFilter(role);
  };

  // ================= Actions =================
  const handleView = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleEdit = (user) => {
    navigate(`/admin/users/${user.id}/edit`);
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.name}"?`
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteUser(user.id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <UserStats users={users} />

      <div className="bg-white rounded-xl border border-[#cbc4d2] shadow-sm overflow-hidden">
        <UserToolbar
          onSearch={handleSearch}
          
          onRoleChange={handleRoleChange}
        />

        <UsersTable
          users={filteredUsers}
          loading={isLoading}
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

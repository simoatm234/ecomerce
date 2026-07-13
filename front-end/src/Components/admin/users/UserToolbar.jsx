// src/components/admin/users/UserToolbar.jsx

import { Plus, Search } from 'lucide-react';

export default function UserToolbar({ onSearch, onRoleChange, onAddUser }) {
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
              placeholder="Search users..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-11 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] pl-11 pr-4 outline-none focus:border-[#6750A4] transition"
            />
          </div>

          {/* Role */}
          <select
            onChange={(e) => onRoleChange?.(e.target.value)}
            className="h-11 px-4 rounded-lg border border-[#cbc4d2] bg-[#fdf7ff] outline-none focus:border-[#6750A4]"
            defaultValue=""
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button
            onClick={onAddUser}
            className="flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

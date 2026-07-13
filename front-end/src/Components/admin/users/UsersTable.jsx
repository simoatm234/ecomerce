// src/components/admin/users/UsersTable.jsx

import { useSelector } from 'react-redux';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function UsersTable({
  users = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  // Adjust this selector path to match your actual auth slice/state shape
  const currentUserId = useSelector((state) => state.auth?.user?.id);

  const roleStyle = (role) => {
    return role === 'admin'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-[#e9ddff] text-[#4f378a]';
  };

  const initials = (name = '') =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  if (loading) {
    return (
      <div className="p-10 text-center text-[#6750A4] font-medium">
        Loading users...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="p-10 text-center text-[#494551]">No users found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#f3edf7] border-y border-[#cbc4d2]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              User
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#494551]">
              Phone
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Role
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#494551]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isSelf = currentUserId != null && user.id == currentUserId;

            return (
              <tr
                key={user.id}
                className="border-b border-[#ebe6ef] hover:bg-[#faf7fc] transition"
              >
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#e9ddff] flex items-center justify-center font-semibold text-[#4f378a]">
                      {initials(user.name)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#1d1b20] flex items-center gap-2">
                        {user.name}
                        {isSelf && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#e9ddff] text-[#4f378a]">
                            You
                          </span>
                        )}
                      </h3>

                      <p className="text-sm text-[#6b7280]">
                        USR-{String(user.id).padStart(3, '0')}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <p className="max-w-sm text-sm text-[#494551]">
                    {user.email}
                  </p>
                </td>

                {/* Phone */}
                <td className="px-6 py-4">
                  <p className="text-sm text-[#494551]">{user.phone || '-'}</p>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyle(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView?.(user)}
                      className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                    >
                      <Eye size={18} className="text-[#6750A4]" />
                    </button>

                    {!isSelf && (
                      <>
                        <button
                          onClick={() => onEdit?.(user)}
                          className="p-2 rounded-lg hover:bg-[#f3edf7] transition"
                        >
                          <Pencil size={18} className="text-[#6750A4]" />
                        </button>

                        <button
                          onClick={() => onDelete?.(user)}
                          className="p-2 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

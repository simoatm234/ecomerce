// src/pages/admin/users/UpdateUser.jsx

import UpdateUserForm from "../../../Components/admin/users/UpdateUserForm";

export default function UpdateUser() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4f378a]">Update User</h1>
        <p className="text-[#494551] mt-1">
          Update user account details and permissions.
        </p>
      </div>

      <UpdateUserForm />
    </div>
  );
}

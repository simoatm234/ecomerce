import React from 'react';
import CreateUserForm from '../../../Components/admin/users/CreateUserForm';

export default function CreateUser() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4f378a]">Create User</h1>

        <p className="text-[#494551] mt-1">
          Create a new user account for your store.
        </p>
      </div>

      <CreateUserForm />
    </div>
  );
}

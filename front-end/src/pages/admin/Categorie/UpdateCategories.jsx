import React from 'react';
import UpdateCategoryForm from '../../../Components/admin/categories/UpdateCategoryForm';

export default function UpdateCategories() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4f378a]">update Category</h1>

        <p className="text-[#494551] mt-1">
          update a new product category for your store.
        </p>
      </div>

      <UpdateCategoryForm />
    </div>
  );
}

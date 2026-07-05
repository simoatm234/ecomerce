import CreateCategoryForm from "../../../Components/admin/categories/CreateCategoryForm";

export default function CreateCategorie() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4f378a]">Create Category</h1>

        <p className="text-[#494551] mt-1">
          Create a new product category for your store.
        </p>
      </div>

      <CreateCategoryForm />
    </div>
  );
}

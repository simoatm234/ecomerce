import CategoriesTable from "../../Components/admin/categories/CategoriesTable";
import CategoryStats from "../../Components/admin/categories/CategoryStats";
import CategoryToolbar from "../../Components/admin/categories/CategoryToolbar";
import Pagination from "../../Components/admin/categories/Pagination";


export default function CategoriesPage() {
  return (
    <div className="p-6 space-y-6">
      <CategoryStats />

      <div className="bg-white rounded-xl border border-[#cbc4d2] shadow-sm overflow-hidden">
        <CategoryToolbar />

        <CategoriesTable />

        <Pagination />
      </div>
    </div>
  );
}

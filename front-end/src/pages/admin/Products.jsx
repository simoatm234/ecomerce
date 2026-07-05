import Pagination from "../../Components/admin/products/Pagination";
import ProductsTable from "../../Components/admin/products/ProductsTable";
import ProductStats from "../../Components/admin/products/ProductStats";
import ProductToolbar from "../../Components/admin/products/ProductToolbar";


export default function Products() {
  return (
    <div className="p-6 space-y-6">
      <ProductStats />

      <div className="bg-white rounded-xl border border-[#cbc4d2] overflow-hidden shadow-sm">
        <ProductToolbar />

        <ProductsTable />

        <Pagination />
      </div>
    </div>
  );
}

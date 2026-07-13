// src/Components/admin/products/CreateProductForm.jsx

import { Upload, Save, X, Plus, Trash2 } from 'lucide-react';

export default function CreateProductForm() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1d1b20]">Add New Product</h2>
          <p className="text-[#494551] mt-1">
            Configure product details, media, and inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-[#cbc4d2] text-[#6750A4] text-sm font-medium hover:bg-[#f3edf7] transition">
            Discard
          </button>

          <button className="px-6 py-2.5 rounded-lg bg-[#6750A4] text-white text-sm font-medium hover:bg-[#4f378a] transition flex items-center gap-2 shadow-sm">
            <Save size={18} />
            Save Product
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic Info Card */}
          <div className="bg-white border border-[#cbc4d2] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-[#cbc4d2] pb-3 text-[#1d1b20]">
              Product Information
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Wireless Headphones"
                  className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe the product features and benefits..."
                  className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Cover Image Card (main product photo, no attribute) */}
          <div className="bg-white border border-[#cbc4d2] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-[#cbc4d2] pb-3 text-[#1d1b20]">
              Cover Image
            </h3>

            <div className="aspect-square max-w-[220px] rounded-lg border-2 border-dashed border-[#cbc4d2] bg-[#fdf7ff] flex flex-col items-center justify-center cursor-pointer hover:bg-[#f3edf7] transition group">
              <Upload
                size={28}
                className="text-[#cbc4d2] group-hover:text-[#6750A4] transition mb-2"
              />
              <span className="text-xs text-[#494551]">Add Cover Image</span>
            </div>

            <p className="mt-3 text-xs text-[#494551] italic">
              This is the main image shown in listings. Recommended size:
              1200x1200px. Max file size: 5MB.
            </p>
          </div>

          {/* Attributes & Variants Card — each value has its OWN image */}
          <div className="bg-white border border-[#cbc4d2] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4 border-b border-[#cbc4d2] pb-3">
              <h3 className="text-xl font-semibold text-[#1d1b20]">
                Attributes &amp; Variants
              </h3>

              <button className="text-[#6750A4] text-sm font-medium flex items-center gap-1 hover:underline">
                <Plus size={16} />
                Add Attribute Group
              </button>
            </div>

            <div className="space-y-6">
              {/* ===== Attribute Group 1: Color ===== */}
              <div className="border border-[#cbc4d2] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <select className="p-2.5 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition font-medium text-sm">
                    <option>Color</option>
                    <option>Size</option>
                    <option>Material</option>
                  </select>

                  <button className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Each value row: name + its own picture */}
                <div className="space-y-3">
                  {/* Value row 1 */}
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 shrink-0 rounded-lg border-2 border-dashed border-[#cbc4d2] bg-[#fdf7ff] flex items-center justify-center cursor-pointer hover:bg-[#f3edf7] transition">
                      <Upload size={16} className="text-[#cbc4d2]" />
                    </div>

                    <input
                      type="text"
                      placeholder="e.g. Midnight Black"
                      className="flex-1 p-2.5 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition text-sm"
                    />

                    <button className="text-red-400 hover:text-red-600 p-1.5">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Value row 2 */}
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 shrink-0 rounded-lg border-2 border-dashed border-[#cbc4d2] bg-[#fdf7ff] flex items-center justify-center cursor-pointer hover:bg-[#f3edf7] transition">
                      <Upload size={16} className="text-[#cbc4d2]" />
                    </div>

                    <input
                      type="text"
                      placeholder="e.g. Arctic White"
                      className="flex-1 p-2.5 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition text-sm"
                    />

                    <button className="text-red-400 hover:text-red-600 p-1.5">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Add value button */}
                  <button className="text-[#6750A4] text-sm font-medium flex items-center gap-1 hover:underline pl-1">
                    <Plus size={14} />
                    Add Color Value
                  </button>
                </div>
              </div>

              {/* ===== Attribute Group 2: Size (no image needed) ===== */}
              <div className="border border-[#cbc4d2] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <select className="p-2.5 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition font-medium text-sm">
                    <option>Size</option>
                    <option>Color</option>
                    <option>Material</option>
                  </select>

                  <button className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#494551]">
                    Values (comma separated — no image needed for this type)
                  </label>
                  <input
                    type="text"
                    placeholder="Small, Medium, Large, XL"
                    className="w-full p-2.5 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Organization Card */}
          <div className="bg-white border border-[#cbc4d2] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-[#cbc4d2] pb-3 text-[#1d1b20]">
              Organization
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Category
                </label>
                <select className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition">
                  <option>Electronics</option>
                  <option>Home Decor</option>
                  <option>Fashion</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Brand / Vendor
                </label>
                <input
                  type="text"
                  placeholder="Brand Name"
                  className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="New, Trending, Sale"
                  className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-white border border-[#cbc4d2] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-[#cbc4d2] pb-3 text-[#1d1b20]">
              Pricing &amp; Stock
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Base Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#494551]">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#494551]">
                  Sale Price ($) - Optional
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#494551]">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#cbc4d2] mt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#494551]">
                    Inventory Count
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full p-3 bg-[#fdf7ff] border border-[#cbc4d2] rounded-lg outline-none focus:border-[#6750A4] transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#fdf7ff] rounded-lg mt-4">
                <input type="checkbox" className="w-5 h-5 accent-[#6750A4]" />
                <span className="text-[#1d1b20]">Track Inventory</span>
              </div>
            </div>
          </div>

          {/* Visibility Card */}
          <div className="bg-[#e9ddff]/20 border border-[#e9ddff] rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#6750A4] mb-4">
              Visibility
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#1d1b20]">Published</span>

                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-[#cbc4d2] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6750A4]" />
                </div>
              </label>

              <p className="text-xs text-[#494551]">
                This product will be visible to customers across all sales
                channels when enabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

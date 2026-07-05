// src/components/admin/Header.jsx

import { Menu, Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Header({ setOpen }) {
  const location = useLocation();

  const titles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Products',
    '/admin/categories': 'Categories',
    '/admin/orders': 'Orders',
    '/admin/users': 'Users',
    '/admin/promotions': 'Promotions',
    '/admin/reports': 'Reports',

    // Future pages
    '/admin/products/create': 'Create Product',
    '/admin/products/edit': 'Edit Product',
    '/admin/orders/details': 'Order Details',
    '/admin/profile': 'Profile',
    '/admin/settings': 'Settings',
  };

  // Match nested routes
  const pageTitle = Object.keys(titles).find((route) =>
    location.pathname.startsWith(route)
  )
    ? titles[
        Object.keys(titles).find((route) => location.pathname.startsWith(route))
      ]
    : 'Dashboard';

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 border-b border-[#cbc4d2] bg-[#fdf7ff]">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 transition rounded-full lg:hidden hover:bg-[#f3edf7]"
        >
          <Menu size={22} className="text-[#4f378a]" />
        </button>

        <h1 className="text-2xl font-bold text-[#4f378a]">{pageTitle}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="items-center hidden px-4 py-2 border rounded-full md:flex bg-[#f3edf7] border-[#cbc4d2]">
          <Search size={18} className="mr-2 text-[#494551]" />

          <input
            type="text"
            placeholder="Global search..."
            className="w-48 text-sm bg-transparent outline-none"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 transition rounded-full hover:bg-[#f3edf7]">
          <Bell size={22} className="text-[#494551]" />

          <span className="absolute w-2 h-2 bg-red-600 rounded-full top-2 right-2"></span>
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 overflow-hidden transition border rounded-full cursor-pointer border-[#e9ddff] hover:opacity-80">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK2sFh8BMa7GCd6kKfQI3dZwjjIY_OGtaivukzDhBzwHO_43pnmb3GZ8PC1yWnUUaSMft0qJ0BrXEFnzoWe6bgVDdqaHU8mrs1kgcRyV3GbPps_6WywFEYaI4YhCNDyoas44xIYdl9uHeJwbsggNK-bhumo-FFjFQBuNyt93HCO9r8iYR-_TFPYvuGag3K0cQLwVPm_BhZRVXFNw37AhzQcJjWX7u05IHAn9CO66VgZetrko4wwNryDM49b5Es19QSDR86sxH2qudc"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </header>
  );
}

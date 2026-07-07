// src/components/admin/Header.jsx

import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/services/thunkFunctions/AuthThunk';
// Adjust this import to match your actual auth thunk/action

export default function Header({ setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);

    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/auth');
    }
  };

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
        {/* Notification */}
        <button className="relative p-2 transition rounded-full hover:bg-[#f3edf7]">
          <Bell size={22} className="text-[#494551]" />

          <span className="absolute w-2 h-2 bg-red-600 rounded-full top-2 right-2"></span>
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 pr-2 transition rounded-full hover:bg-[#f3edf7]"
          >
            <div className="w-10 h-10 overflow-hidden border rounded-full border-[#e9ddff]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK2sFh8BMa7GCd6kKfQI3dZwjjIY_OGtaivukzDhBzwHO_43pnmb3GZ8PC1yWnUUaSMft0qJ0BrXEFnzoWe6bgVDdqaHU8mrs1kgcRyV3GbPps_6WywFEYaI4YhCNDyoas44xIYdl9uHeJwbsggNK-bhumo-FFjFQBuNyt93HCO9r8iYR-_TFPYvuGag3K0cQLwVPm_BhZRVXFNw37AhzQcJjWX7u05IHAn9CO66VgZetrko4wwNryDM49b5Es19QSDR86sxH2qudc"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <ChevronDown
              size={16}
              className={`text-[#494551] transition-transform ${
                menuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#cbc4d2] rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/admin/profile');
                }}
                className="flex items-center w-full gap-3 px-4 py-3 text-sm text-left transition hover:bg-[#f3edf7]"
              >
                <User size={18} className="text-[#494551]" />
                Profile
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/admin/settings');
                }}
                className="flex items-center w-full gap-3 px-4 py-3 text-sm text-left transition hover:bg-[#f3edf7]"
              >
                <Settings size={18} className="text-[#494551]" />
                Settings
              </button>

              <div className="border-t border-[#cbc4d2]" />

              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-3 px-4 py-3 text-sm text-left text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

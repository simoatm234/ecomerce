// src/components/Sidebar.jsx

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Megaphone,
  BarChart3,
  User,
  X,
} from 'lucide-react';

const menus = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: Package,
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: Tags,
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: Users,
  },
  {
    title: 'Promotions',
    path: '/admin/promotions',
    icon: Megaphone,
  },
  {
    title: 'Reports',
    path: '/admin/reports',
    icon: BarChart3,
  },
];

export default function Sidebar({ open, setOpen, user }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white border-r border-[#cbc4d2] flex flex-col py-4 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <h1 className="text-[24px] font-black text-[#4f378a]">AdminPanel</h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-[#f3edf7]"
          >
            <X size={22} />
          </button>
        </div>

        {/* User */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f3edf7]">
            <div className="w-12 h-12 rounded-full bg-[#e9ddff] flex items-center justify-center">
              <User size={22} className="text-[#4f378a]" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#1d1b20]">{user.name}</p>

              <p className="text-[10px] uppercase tracking-wider text-[#494551]">
               {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mx-4 flex items-center gap-4 px-4 py-3 rounded-r-full transition-all
                  ${
                    isActive
                      ? 'bg-[#e1d4fd] text-[#4f378a] font-bold'
                      : 'text-[#494551] hover:bg-[#f3edf7]'
                  }`
                }
              >
                <Icon size={20} />

                <span className="text-sm">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

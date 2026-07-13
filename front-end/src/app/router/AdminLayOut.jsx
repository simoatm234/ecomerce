import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';
import { useSelector } from 'react-redux';

export default function AdminLayOut() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} user={user} />

      {/* Main Content */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <Header setOpen={setOpen} user={user} />

        {/* Pages */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';

export default function AdminLayOut() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <Header setOpen={setOpen} />

        {/* Pages */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

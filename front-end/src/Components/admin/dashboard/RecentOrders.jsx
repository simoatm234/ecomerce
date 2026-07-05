// src/components/dashboard/RecentOrders.jsx

const orders = [
  {
    initials: 'JS',
    name: 'John Smith',
    id: '#39420',
    total: '$254.00',
    status: 'Shipped',
  },
  {
    initials: 'MD',
    name: 'Maria Davis',
    id: '#39421',
    total: '$129.99',
    status: 'Processing',
  },
  {
    initials: 'RW',
    name: 'Robert White',
    id: '#39422',
    total: '$840.50',
    status: 'Pending',
  },
];

export default function RecentOrders() {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-green-100 text-green-700';

      case 'Processing':
        return 'bg-[#6750a4] text-white';

      case 'Pending':
        return 'bg-red-100 text-red-600';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#cbc4d2] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#cbc4d2] flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#1d1b20]">Recent Orders</h2>

        <button className="text-[#4f378a] font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="uppercase tracking-widest text-[11px] text-[#494551] border-b border-[#cbc4d2]">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#cbc4d2]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#e6e0e9] flex items-center justify-center text-[12px] font-bold text-[#4f378a]">
                      {order.initials}
                    </div>

                    <div>
                      <p className="font-semibold">{order.name}</p>

                      <p className="text-xs text-[#494551]">{order.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold">{order.total}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-[#cbc4d2]">
        <button className="w-full py-2 border border-[#cbc4d2] rounded-lg bg-white hover:bg-gray-50 transition font-medium">
          Generate Report
        </button>
      </div>
    </div>
  );
}

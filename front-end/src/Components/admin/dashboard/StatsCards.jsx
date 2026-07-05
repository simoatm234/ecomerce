// src/components/dashboard/StatsCards.jsx

import {
  DollarSign,
  ShoppingCart,
  Users,
  TriangleAlert,
  TrendingUp,
  UserPlus,
  Package,
} from 'lucide-react';

const stats = [
  {
    title: 'Revenue',
    value: '$124,592.00',
    description: '+12.5% from last month',
    color: 'text-[#4f378a]',
    bg: 'bg-[#e9ddff]/20',
    icon: DollarSign,
    trend: true,
  },
  {
    title: 'Orders',
    value: '1,482',
    description: '+5.2% from last week',
    color: 'text-[#63597c]',
    bg: 'bg-[#e1d4fd]/30',
    icon: ShoppingCart,
    trend: true,
  },
  {
    title: 'Customers',
    value: '8,291',
    description: '42 new today',
    color: 'text-[#765b00]',
    bg: 'bg-[#c9a74d]/20',
    icon: Users,
    user: true,
  },
  {
    title: 'Low Stock',
    value: '24',
    description: 'Requires attention',
    color: 'text-red-600',
    bg: 'bg-red-100',
    icon: TriangleAlert,
    warning: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-[#cbc4d2] hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase tracking-wider text-sm text-[#494551]">
                {item.title}
              </span>

              <div className={`p-2 rounded-lg ${item.bg}`}>
                <Icon size={20} className={item.color} />
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-[#1d1b20]">
              {item.value}
            </h2>

            <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
              {item.trend && (
                <>
                  <TrendingUp size={14} className="text-green-600" />
                  <span className="text-green-600">{item.description}</span>
                </>
              )}

              {item.user && (
                <>
                  <UserPlus size={14} className="text-[#494551]" />
                  <span className="text-[#494551]">{item.description}</span>
                </>
              )}

              {item.warning && (
                <>
                  <Package size={14} className="text-red-600" />
                  <span className="text-red-600">{item.description}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

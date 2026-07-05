// src/components/dashboard/SalesChart.jsx

import { TrendingUp } from 'lucide-react';

const chartData = [
  { month: 'Jan', value: '40%', price: '$42k', active: false },
  { month: 'Feb', value: '65%', price: '$68k', active: false },
  { month: 'Mar', value: '55%', price: '$58k', active: false },
  { month: 'Apr', value: '80%', price: '$84k', active: false },
  { month: 'May', value: '70%', price: '$74k', active: false },
  { month: 'Jun', value: '95%', price: '$98k', active: true },
  { month: 'Jul', value: '85%', price: '$89k', active: false },
];

export default function SalesChart() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-[#cbc4d2] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1d1b20]">
            Sales Performance
          </h2>

          <p className="text-[#494551] mt-1">Last 30 days overview</p>
        </div>

        <select className="bg-[#f3edf7] rounded-lg px-4 py-2 outline-none font-medium">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      {/* Chart */}
      <div className="relative h-64 flex items-end justify-between gap-2 pt-8">
        {/* Background Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <TrendingUp size={120} />
        </div>

        {chartData.map((item) => (
          <div
            key={item.month}
            className={`group relative flex-1 rounded-t-lg transition-all cursor-pointer
            ${
              item.active ? 'bg-[#4f378a]' : 'bg-[#e9ddff] hover:bg-[#d8c5ff]'
            }`}
            style={{ height: item.value }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold transition">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Months */}
      <div className="flex justify-between mt-4 px-2 text-xs uppercase tracking-widest text-[#494551]">
        {chartData.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

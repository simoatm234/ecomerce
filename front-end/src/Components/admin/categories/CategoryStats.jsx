
import { Tags, CheckCircle2, EyeOff, Package } from 'lucide-react';

const stats = [
  {
    title: 'Total Categories',
    value: '24',
    description: 'All product categories',
    color: 'text-[#4f378a]',
    bg: 'bg-[#e9ddff]/20',
    icon: Tags,
  },
  {
    title: 'Active Categories',
    value: '21',
    description: 'Visible in the store',
    color: 'text-green-600',
    bg: 'bg-green-100',
    icon: CheckCircle2,
  },
  {
    title: 'Hidden Categories',
    value: '3',
    description: 'Not displayed',
    color: 'text-[#765b00]',
    bg: 'bg-[#fff4d6]',
    icon: EyeOff,
  },
  {
    title: 'Products Assigned',
    value: '1,248',
    description: 'Across all categories',
    color: 'text-[#6750A4]',
    bg: 'bg-[#ede7f6]',
    icon: Package,
  },
];

export default function CategoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-[#cbc4d2] hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="uppercase tracking-wider text-sm text-[#494551]">
                {item.title}
              </span>

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <Icon size={22} className={item.color} />
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-[#1d1b20]">
              {item.value}
            </h2>

            <p className="mt-2 text-xs text-[#494551]">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

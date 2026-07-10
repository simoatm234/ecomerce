import { Users, ShieldCheck, UserCircle, Globe } from 'lucide-react';

export default function UserStats({ users = [] }) {
  const totalUsers = users.length;

  const adminUsers = users.filter((user) => user.role === 'admin').length;

  const customerUsers = users.filter((user) => user.role === 'customer').length;

  const googleUsers = users.filter((user) => user.google_id).length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      description: 'All registered users',
      color: 'text-[#4f378a]',
      bg: 'bg-[#e9ddff]/20',
      icon: Users,
    },

    {
      title: 'Admins',
      value: adminUsers,
      description: 'Users with admin role',
      color: 'text-[#6750A4]',
      bg: 'bg-[#ede7f6]',
      icon: ShieldCheck,
    },

    {
      title: 'Customers',
      value: customerUsers,
      description: 'Users with customer role',
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: UserCircle,
    },

    {
      title: 'Google Users',
      value: googleUsers,
      description: 'Users authenticated with Google',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
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

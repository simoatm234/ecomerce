// src/components/dashboard/UpgradeBanner.jsx

export default function UpgradeBanner() {
  return (
    <div className="mt-6 relative rounded-2xl overflow-hidden h-48 group">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#4f378a] opacity-90 z-10"></div>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCufuv0qw3pY6Zv0Y8eaaVOhCJS8NJkOko-73PuuU__2MCQG4WiqVnJaUrBXlzCfNV0Ch0PksE6yIYG4BAquMFwP290ehNmB4UKZfcUA6D65oR6ciZ44nwv_P52j4_wyg_9m_eY3oOjrPXRFCh_kyyeBq6KKfGQN9k_DFJiFtNEFpbsYlhc4_sPGh0TnqwE0bT8oFf9gmZ2EYwKTwwSOLnfAHu0klrPyr44SoYoI5owDLgaCqb3Xq_uyU0Ax2kK2iqLcKeSyo2LsTXi')",
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 text-white">
        <h2 className="text-4xl font-black mb-2">Advanced Insights</h2>

        <p className="max-w-xl text-sm opacity-80 leading-6">
          Leverage our AI-driven predictive analytics to forecast your inventory
          needs and optimize global store logistics.
        </p>

        <button className="mt-5 w-fit px-8 py-2 rounded-lg bg-white text-[#4f378a] font-bold hover:bg-slate-100 transition">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}

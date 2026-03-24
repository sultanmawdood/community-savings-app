import { motion } from 'framer-motion';

export default function StatCard({ label, value, sub, icon: Icon, color = 'blue', trend }) {
  const colors = {
    blue:   { bg: 'bg-blue-50 dark:bg-blue-950/40',   icon: 'text-blue-600 dark:text-blue-400',   bar: 'bg-blue-500',   ring: 'ring-blue-200 dark:ring-blue-800' },
    green:  { bg: 'bg-green-50 dark:bg-green-950/40', icon: 'text-green-600 dark:text-green-400', bar: 'bg-green-500', ring: 'ring-green-200 dark:ring-green-800' },
    red:    { bg: 'bg-red-50 dark:bg-red-950/40',     icon: 'text-red-600 dark:text-red-400',     bar: 'bg-red-500',   ring: 'ring-red-200 dark:ring-red-800' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-950/40', icon: 'text-purple-600 dark:text-purple-400', bar: 'bg-purple-500', ring: 'ring-purple-200 dark:ring-purple-800' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-950/40', icon: 'text-orange-600 dark:text-orange-400', bar: 'bg-orange-500', ring: 'ring-orange-200 dark:ring-orange-800' },
    gray:   { bg: 'bg-slate-50 dark:bg-slate-800/40',  icon: 'text-slate-400 dark:text-slate-500',  bar: 'bg-slate-300', ring: 'ring-slate-200 dark:ring-slate-700' },
  };
  const c = colors[color] || colors.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-200 p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${c.bg} ${c.ring}`}>
          <Icon size={22} className={c.icon} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5 tracking-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

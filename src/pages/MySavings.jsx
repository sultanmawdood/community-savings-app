import { TrendingUp, Wallet, AlertTriangle, Info, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { SHARE_VALUE, PENALTY_RATE } from '../data/mockData';

export default function MySavings({ user }) {
  const totalValue = user.shares * SHARE_VALUE;
  const netValue   = totalValue - user.penalty;
  const penaltyDays = user.penalty > 0 ? Math.round(user.penalty / (SHARE_VALUE * PENALTY_RATE)) : 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Savings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, <span className="font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          label="Total Shares"
          value={user.shares}
          sub={`${user.shares} × ${SHARE_VALUE.toLocaleString()} RWF`}
          icon={TrendingUp}
          color="blue"
          trend={12}
        />
        <StatCard
          label="Total Value"
          value={`${totalValue.toLocaleString()} RWF`}
          sub="Current savings balance"
          icon={Wallet}
          color="green"
        />
        <div className="relative">
          <StatCard
            label="Penalty"
            value={user.penalty > 0 ? `${user.penalty.toLocaleString()} RWF` : 'None'}
            sub={user.penalty > 0 ? `${penaltyDays} day${penaltyDays !== 1 ? 's' : ''} late` : 'No outstanding penalties'}
            icon={AlertTriangle}
            color={user.penalty > 0 ? 'red' : 'gray'}
          />
          {user.penalty > 0 && (
            <div className="absolute top-4 right-4 group">
              <Info size={15} className="text-red-400 cursor-help" />
              <div className="absolute right-0 top-6 w-52 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 leading-relaxed">
                <p className="font-semibold mb-1">Penalty Calculation</p>
                <p>{SHARE_VALUE.toLocaleString()} RWF × {PENALTY_RATE * 100}% = {(SHARE_VALUE * PENALTY_RATE).toLocaleString()} RWF/day</p>
                <p className="mt-1 text-slate-400">{penaltyDays} day{penaltyDays !== 1 ? 's' : ''} × {(SHARE_VALUE * PENALTY_RATE).toLocaleString()} = <span className="text-red-400 font-semibold">{user.penalty.toLocaleString()} RWF</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Penalty alert banner */}
      {user.penalty > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl p-4"
        >
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              Penalty: {user.penalty.toLocaleString()} RWF ({penaltyDays} day{penaltyDays !== 1 ? 's' : ''} late)
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
              {SHARE_VALUE.toLocaleString()} × {PENALTY_RATE * 100}% = {(SHARE_VALUE * PENALTY_RATE).toLocaleString()} RWF per day. Please clear your penalty to avoid further charges.
            </p>
          </div>
        </motion.div>
      )}

      {/* Account summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Account Summary</h2>
          <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
            View history <ArrowUpRight size={13} />
          </span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            { label: 'Member Name',       value: user.name },
            { label: 'Share Value',        value: `${SHARE_VALUE.toLocaleString()} RWF` },
            { label: 'Shares Owned',       value: user.shares },
            { label: 'Gross Value',        value: `${totalValue.toLocaleString()} RWF`, highlight: 'green' },
            { label: 'Outstanding Penalty',value: `${user.penalty.toLocaleString()} RWF`, highlight: user.penalty > 0 ? 'red' : null },
            { label: 'Net Value',          value: `${netValue.toLocaleString()} RWF`, highlight: 'blue', bold: true },
          ].map(({ label, value, highlight, bold }) => (
            <div key={label} className="flex justify-between items-center py-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
              <span className={`text-sm font-${bold ? 'bold' : 'semibold'} ${
                highlight === 'green' ? 'text-green-600 dark:text-green-400' :
                highlight === 'red'   ? 'text-red-600 dark:text-red-400' :
                highlight === 'blue'  ? 'text-blue-600 dark:text-blue-400' :
                'text-slate-900 dark:text-white'
              }`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

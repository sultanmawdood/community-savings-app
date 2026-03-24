import { UsersRound, Wallet, TrendingUp, Trophy, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import { SHARE_VALUE } from '../data/mockData';

export default function Dashboard({ users, giveawayHistory }) {
  const members     = users.filter((u) => u.role === 'member');
  const totalShares = users.reduce((s, u) => s + u.shares, 0);
  const totalValue  = totalShares * SHARE_VALUE;
  const poolAmount  = totalValue * 0.1;
  const winnerAmt   = poolAmount * 0.95;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of the community savings pool</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Members"  value={members.length}                    sub="Active participants"          icon={UsersRound} color="blue"   trend={8}  />
        <StatCard label="Total Shares"   value={totalShares}                       sub={`${SHARE_VALUE.toLocaleString()} RWF each`} icon={TrendingUp} color="green"  trend={15} />
        <StatCard label="Total Value"    value={`${totalValue.toLocaleString()} RWF`}  sub="Combined savings"        icon={Wallet}     color="purple" />
        <StatCard label="Giveaway Pool"  value={`${poolAmount.toLocaleString()} RWF`}  sub={`Winner gets ${winnerAmt.toLocaleString()} RWF`} icon={Trophy} color="orange" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Members table */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Members Overview</h2>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 cursor-pointer hover:underline">
              View all <ArrowUpRight size={13} />
            </span>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-700">
                  {['Member', 'Shares', 'Value', 'Penalty'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {members.map((m, i) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={m.name} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{m.name}</p>
                          {m.hasWonGiveaway && (
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">🏆 Past winner</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{m.shares}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-green-600 dark:text-green-400">{(m.shares * SHARE_VALUE).toLocaleString()} RWF</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-semibold ${m.penalty > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
                        {m.penalty > 0 ? `${m.penalty.toLocaleString()} RWF` : '—'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Giveaway history */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Giveaway History</h2>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {giveawayHistory.slice(0, 5).map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center shrink-0">
                  <Trophy size={15} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{entry.winnerName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{entry.month}</p>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 shrink-0">
                  {entry.amount.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Trophy, Sparkles, Award, Users2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../components/Avatar';
import { SHARE_VALUE } from '../data/mockData';

const GIVEAWAY_POOL_RATE = 0.1;
const WINNER_CUT = 0.95;

export default function Giveaway({ users, giveawayHistory, onRunGiveaway }) {
  const [isSpinning, setIsSpinning]   = useState(false);
  const [winner, setWinner]           = useState(null);
  const [highlighted, setHighlighted] = useState(null);

  const eligible    = users.filter((u) => u.role === 'member' && !u.hasWonGiveaway);
  const totalShares = users.reduce((s, u) => s + u.shares, 0);
  const poolAmount  = totalShares * SHARE_VALUE * GIVEAWAY_POOL_RATE;
  const winnerAmt   = poolAmount * WINNER_CUT;

  const handleSpin = () => {
    if (eligible.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setWinner(null);
    setHighlighted(null);

    // Cycle through members visually
    let count = 0;
    const total = 20;
    const interval = setInterval(() => {
      setHighlighted(eligible[count % eligible.length].id);
      count++;
      if (count >= total) {
        clearInterval(interval);
        const picked = eligible[Math.floor(Math.random() * eligible.length)];
        setHighlighted(picked.id);
        setWinner(picked);
        setIsSpinning(false);
        onRunGiveaway(picked.id, picked.name, winnerAmt);
      }
    }, 120);
  };

  const handleReset = () => { setWinner(null); setHighlighted(null); };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Monthly Giveaway</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Spin to select this month's lucky winner</p>
      </div>

      {/* Pool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg shadow-purple-600/20">
          <Sparkles size={28} className="mb-3 opacity-80" />
          <p className="text-sm font-medium opacity-80">Current Pool</p>
          <p className="text-3xl font-bold mt-1">{poolAmount.toLocaleString()} RWF</p>
          <p className="text-xs mt-2 opacity-70">10% of total savings pool</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg shadow-orange-600/20">
          <Award size={28} className="mb-3 opacity-80" />
          <p className="text-sm font-medium opacity-80">Winner Receives</p>
          <p className="text-3xl font-bold mt-1">{winnerAmt.toLocaleString()} RWF</p>
          <p className="text-xs mt-2 opacity-70 flex items-center gap-1">
            <Users2 size={13} /> {eligible.length} eligible member{eligible.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Spin area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-8 text-center">
        <AnimatePresence mode="wait">
          {winner && !isSpinning ? (
            <motion.div
              key="winner"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="space-y-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl"
              >
                🎉
              </motion.div>
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl p-6 inline-block min-w-64">
                <Trophy size={40} className="mx-auto mb-3" />
                <p className="text-lg font-bold">Congratulations!</p>
                <p className="text-2xl font-extrabold mt-1">{winner.name}</p>
                <p className="text-base mt-2 opacity-90">Won {winnerAmt.toLocaleString()} RWF</p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition mt-2"
              >
                <RotateCcw size={14} /> Run another spin
              </button>
            </motion.div>
          ) : (
            <motion.div key="spin" className="space-y-6">
              {isSpinning && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto"
                >
                  <Sparkles size={64} className="text-purple-500" />
                </motion.div>
              )}
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {isSpinning ? 'Selecting winner...' : eligible.length === 0 ? 'All members have won this cycle' : 'Press SPIN to select a winner'}
              </p>
              <button
                onClick={handleSpin}
                disabled={eligible.length === 0 || isSpinning}
                className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 disabled:cursor-not-allowed text-white px-14 py-4 rounded-2xl text-lg font-extrabold transition shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transform"
              >
                {isSpinning ? 'Spinning...' : '🎰 SPIN NOW'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Eligible members */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
          Eligible Members <span className="text-slate-400 font-normal text-sm">({eligible.length})</span>
        </h2>
        {eligible.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">All members have won this cycle</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {eligible.map((member) => (
              <motion.div
                key={member.id}
                animate={highlighted === member.id ? { scale: 1.08, boxShadow: '0 0 0 3px #7c3aed' } : { scale: 1, boxShadow: '0 0 0 0px transparent' }}
                transition={{ duration: 0.1 }}
                className={`border rounded-xl p-3 text-center transition-colors ${
                  highlighted === member.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40'
                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                }`}
              >
                <Avatar name={member.name} size="md" className="mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{member.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{member.shares} shares</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* History table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Giveaway History</h2>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-700">
                {['Month', 'Winner', 'Amount Won'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {giveawayHistory.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{entry.month}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={entry.winnerName} size="sm" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{entry.winnerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-green-600 dark:text-green-400">
                    {entry.amount.toLocaleString()} RWF
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

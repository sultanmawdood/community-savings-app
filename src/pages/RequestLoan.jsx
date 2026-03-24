import { useState, useMemo } from 'react';
import { AlertTriangle, CheckCircle2, HandCoins, Shield, Search, Wallet, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHARE_VALUE } from '../data/mockData';

const inputCls = 'w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition';

export default function RequestLoan({ user, users, onSubmit }) {
  const [amount, setAmount]         = useState(0);
  const [guarantorId, setGuarantorId] = useState('');
  const [search, setSearch]         = useState('');
  const [dropOpen, setDropOpen]     = useState(false);

  const eligibleGuarantors = useMemo(() =>
    users.filter((u) => u.id !== user.id && u.role === 'member'),
    [users, user.id]
  );

  const filtered = eligibleGuarantors.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const guarantor  = users.find((u) => u.id === parseInt(guarantorId));
  const maxAllowed = guarantor
    ? (user.shares + guarantor.shares) * SHARE_VALUE
    : user.shares * SHARE_VALUE;

  const isExceeded = amount > maxAllowed && !!guarantorId;
  const isValid    = amount > 0 && amount <= maxAllowed && !!guarantorId;

  const rangeProgress = maxAllowed > 0 ? (amount / maxAllowed) * 100 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) onSubmit({ amount, guarantorId: parseInt(guarantorId) });
  };

  const selectGuarantor = (u) => {
    setGuarantorId(String(u.id));
    setSearch(u.name);
    setDropOpen(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Request Loan</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your loan limit is based on your savings + guarantor's savings</p>
      </div>

      {/* Your savings card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
            <Wallet size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your Savings</p>
            <p className="font-bold text-slate-900 dark:text-white">{(user.shares * SHARE_VALUE).toLocaleString()} RWF</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Shares</p>
          <p className="font-bold text-slate-900 dark:text-white">{user.shares}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Guarantor searchable dropdown */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Shield size={14} className="text-slate-400" />
              Select Guarantor
            </label>
            <div className="relative">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setDropOpen(true); setGuarantorId(''); }}
                  onFocus={() => setDropOpen(true)}
                  className={`${inputCls} pl-9 pr-9`}
                  placeholder="Search member..."
                />
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <AnimatePresence>
                {dropOpen && filtered.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto scrollbar-thin"
                  >
                    {filtered.map((u) => (
                      <li
                        key={u.id}
                        onClick={() => selectGuarantor(u)}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition"
                      >
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{u.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{u.shares} shares · {(u.shares * SHARE_VALUE).toLocaleString()} RWF</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Loan amount slider */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <HandCoins size={14} className="text-slate-400" />
              Loan Amount
            </label>
            <input
              type="range"
              min={0}
              max={maxAllowed}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{ '--range-progress': `${rangeProgress}%` }}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-slate-400">0 RWF</span>
              <span className={`text-xl font-bold ${isExceeded ? 'text-red-600' : 'text-blue-600 dark:text-blue-400'}`}>
                {amount.toLocaleString()} RWF
              </span>
              <span className="text-xs text-slate-400">{maxAllowed.toLocaleString()} RWF</span>
            </div>
          </div>

          {/* Calculation breakdown */}
          {guarantor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Loan Calculation</p>
              </div>
              {[
                { label: 'Your Savings',       value: `${(user.shares * SHARE_VALUE).toLocaleString()} RWF` },
                { label: `${guarantor.name}'s Savings`, value: `${(guarantor.shares * SHARE_VALUE).toLocaleString()} RWF` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                <span className="font-bold text-slate-900 dark:text-white">Maximum Allowed</span>
                <span className="font-bold text-green-600 dark:text-green-400">{maxAllowed.toLocaleString()} RWF</span>
              </div>
            </motion.div>
          )}

          {/* Validation messages */}
          <AnimatePresence>
            {isExceeded && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-3 text-sm"
              >
                <AlertTriangle size={16} className="shrink-0" />
                Amount exceeds maximum allowed ({maxAllowed.toLocaleString()} RWF)
              </motion.div>
            )}
            {isValid && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl p-3 text-sm"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                Loan request is valid and ready to submit
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
          >
            <HandCoins size={18} />
            Submit Loan Request
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  CheckCircle2, XCircle, Eye, Inbox, Calendar, Hash,
  User, Banknote, TrendingUp, AlertTriangle, ZoomIn,
  ShieldCheck, Flag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../components/Avatar';
import { SHARE_VALUE, PENALTY_RATE } from '../data/mockData';

/* ─── Fullscreen screenshot modal ─────────────────────────────────────── */
function ScreenshotModal({ payment, onClose, onVerify, onFlag }) {
  if (!payment) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="panel"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left — screenshot */}
          <div className="relative md:w-[55%] bg-slate-950 flex items-center justify-center min-h-64">
            <img
              src={payment.screenshot}
              alt="MoMo receipt"
              className="w-full h-full object-contain max-h-[60vh] md:max-h-[92vh]"
            />
            {/* zoom hint */}
            <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
              <ZoomIn size={12} /> MoMo Receipt
            </div>
          </div>

          {/* Right — details + actions */}
          <div className="md:w-[45%] flex flex-col p-6 gap-5 overflow-y-auto scrollbar-thin">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Details</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Member */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
              <Avatar name={payment.userName} size="lg" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{payment.userName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">MoMo: {payment.momoName}</p>
              </div>
            </div>

            {/* Detail rows */}
            <div className="space-y-3">
              {[
                { icon: Banknote,  label: 'Amount',         value: `${Number(payment.amount).toLocaleString()} RWF`, bold: true, color: 'text-green-600 dark:text-green-400' },
                { icon: TrendingUp,label: 'Shares to Add',  value: `+${payment.amount / SHARE_VALUE} share${payment.amount / SHARE_VALUE !== 1 ? 's' : ''}`, bold: true, color: 'text-blue-600 dark:text-blue-400' },
                { icon: Hash,      label: 'Transaction ID', value: payment.transactionId, mono: true },
                { icon: User,      label: 'MoMo Name',      value: payment.momoName },
                { icon: Calendar,  label: 'Submitted',      value: new Date(payment.date).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
              ].map(({ icon: Icon, label, value, bold, color, mono }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                    <p className={`text-sm mt-0.5 truncate ${bold ? 'font-bold ' + color : 'font-medium text-slate-800 dark:text-slate-200'} ${mono ? 'font-mono' : ''}`}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Penalty note */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Penalty check runs automatically on verify. Rate: {SHARE_VALUE.toLocaleString()} × {PENALTY_RATE * 100}% = <strong>{(SHARE_VALUE * PENALTY_RATE).toLocaleString()} RWF/day</strong>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto pt-2">
              <button
                onClick={() => onVerify(payment)}
                className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25"
              >
                <ShieldCheck size={17} /> Verify
              </button>
              <button
                onClick={() => onFlag(payment)}
                className="flex-1 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 active:scale-95 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Flag size={17} /> Flag
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Verify result modal ──────────────────────────────────────────────── */
function VerifyResultModal({ result, onClose }) {
  if (!result) return null;
  const { userName, sharesAdded, daysLate, penalty } = result;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 size={44} className="text-green-600 dark:text-green-400" />
          </motion.div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Payment Verified!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{userName}'s account has been updated</p>

          {/* Result rows */}
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
                <TrendingUp size={15} /> Shares Added
              </div>
              <span className="font-bold text-green-700 dark:text-green-400">+{sharesAdded}</span>
            </div>

            {daysLate > 0 ? (
              <div className="flex items-center justify-between bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-red-800 dark:text-red-300">
                  <AlertTriangle size={15} /> Penalty Applied
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-700 dark:text-red-400">{penalty.toLocaleString()} RWF</p>
                  <p className="text-xs text-red-500 dark:text-red-500">{daysLate} day{daysLate !== 1 ? 's' : ''} late</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <ShieldCheck size={15} /> Penalty
                </div>
                <span className="font-semibold text-slate-500 dark:text-slate-400">None — on time ✓</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-slate-900 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-semibold text-sm transition"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────── */
export default function VerifyPayments({ payments, onVerify, onFlag }) {
  const [activePayment, setActivePayment] = useState(null); // screenshot modal
  const [verifyResult, setVerifyResult]   = useState(null); // result modal

  const handleVerify = (payment) => {
    const result = onVerify(payment.id, payment.userId, payment.amount);
    setActivePayment(null);
    setVerifyResult({ userName: payment.userName, ...result });
  };

  const handleFlag = (payment) => {
    onFlag(payment.id);
    setActivePayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verify Payments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {payments.length} pending verification{payments.length !== 1 ? 's' : ''}
          </p>
        </div>
        {payments.length > 0 && (
          <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full">
            {payments.length} Pending
          </span>
        )}
      </div>

      {/* Empty state */}
      {payments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-16 text-center"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">All caught up!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">No pending payments to verify</p>
        </motion.div>
      ) : (
        /* Card grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {payments.map((payment, i) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06 }}
              layout
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden flex flex-col group"
            >
              {/* Screenshot thumbnail — click to open fullscreen */}
              <div
                className="relative h-48 bg-slate-100 dark:bg-slate-700 cursor-pointer overflow-hidden"
                onClick={() => setActivePayment(payment)}
              >
                <img
                  src={payment.screenshot}
                  alt="MoMo receipt"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <Eye size={16} /> Click to view full receipt
                  </div>
                </div>
                {/* Top badge */}
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  Pending
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 flex-1 flex flex-col gap-4">
                {/* Member row */}
                <div className="flex items-center gap-3">
                  <Avatar name={payment.userName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{payment.userName}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{payment.momoName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{Number(payment.amount).toLocaleString()} RWF</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">+{payment.amount / SHARE_VALUE} share{payment.amount / SHARE_VALUE !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Hash size={11} className="shrink-0" />
                    <span className="font-mono truncate">{payment.transactionId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar size={11} className="shrink-0" />
                    <span>{new Date(payment.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleVerify(payment)}
                    className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-green-600/20"
                  >
                    <CheckCircle2 size={15} /> Verify
                  </button>
                  <button
                    onClick={() => handleFlag(payment)}
                    className="flex-1 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 active:scale-95 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={15} /> Flag
                  </button>
                </div>

                {/* View receipt link */}
                <button
                  onClick={() => setActivePayment(payment)}
                  className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition -mt-1"
                >
                  <Eye size={12} /> View full receipt
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fullscreen screenshot + detail modal */}
      {activePayment && (
        <ScreenshotModal
          payment={activePayment}
          onClose={() => setActivePayment(null)}
          onVerify={handleVerify}
          onFlag={handleFlag}
        />
      )}

      {/* Verify result modal */}
      <VerifyResultModal
        result={verifyResult}
        onClose={() => setVerifyResult(null)}
      />
    </div>
  );
}

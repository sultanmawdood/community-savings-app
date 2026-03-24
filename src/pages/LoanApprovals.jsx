import { FileCheck, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';

export default function LoanApprovals({ loans }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Loan Approvals</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{loans.length} loan request{loans.length !== 1 ? 's' : ''} on record</p>
      </div>

      {loans.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-16 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">No loan requests</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Loan requests will appear here</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  {['Borrower', 'Amount', 'Guarantor', 'Date', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {loans.map((loan, i) => (
                  <motion.tr
                    key={loan.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={loan.borrowerName} size="sm" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{loan.borrowerName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{loan.amount.toLocaleString()} RWF</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={loan.guarantorName} size="sm" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{loan.guarantorName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">{loan.date}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge status={loan.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

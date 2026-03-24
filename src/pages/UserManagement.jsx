import { useState } from 'react';
import { UserPlus, Search, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import { SHARE_VALUE } from '../data/mockData';

export default function UserManagement({ users }) {
  const [search, setSearch]     = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{users.length} total users</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-blue-600/20 self-start sm:self-auto">
          <UserPlus size={16} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All Roles</option>
          <option value="member">Member</option>
          <option value="accountant">Accountant</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden"
      >
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                {['Member', 'Role', 'Shares', 'Value', 'Penalty', 'Joined'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge status={user.role} /></td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">{user.shares}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                    {(user.shares * SHARE_VALUE).toLocaleString()} RWF
                  </td>
                  <td className="px-5 py-4">
                    {user.penalty > 0 ? (
                      <span className="flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400">
                        <AlertTriangle size={13} />
                        {user.penalty.toLocaleString()} RWF
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{user.joinDate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500 text-sm">
              No users match your search
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
